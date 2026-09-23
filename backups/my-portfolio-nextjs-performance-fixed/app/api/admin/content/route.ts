import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { apiError, apiSuccess } from "@/lib/api-response";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export async function GET() {
  try {
    const authResult = await requireAdmin();
    if (!authResult.authorized) return apiError(authResult.error, authResult.status);

    const content = await prisma.siteContent.findFirst();
    return apiSuccess(content);
  } catch (error) {
    console.error("GET /api/admin/content:", error);
    return apiError("Failed to load homepage content.");
  }
}

const siteContentSchema = z.object({
  heroBadge: z.string().trim().max(120).nullable().optional(),
  heroTitle: z.string().trim().max(300).nullable().optional(),
  heroDescription: z.string().trim().max(2000).nullable().optional(),
  aboutTitle: z.string().trim().max(200).nullable().optional(),
  aboutText: z.string().trim().max(5000).nullable().optional(),
  services: z.json().nullable().optional(),
  whyTitle: z.string().trim().max(200).nullable().optional(),
  whyItems: z.json().nullable().optional(),
  ctaTitle: z.string().trim().max(200).nullable().optional(),
  ctaDescription: z.string().trim().max(1000).nullable().optional(),
  ctaPrimaryText: z.string().trim().max(100).nullable().optional(),
  ctaSecondaryText: z.string().trim().max(100).nullable().optional(),
}).strict();

export async function PUT(request: Request) {
  try {
    const authResult = await requireAdmin();
    if (!authResult.authorized) return apiError(authResult.error, authResult.status);

    const body: unknown = await request.json();
    const parsed = siteContentSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Invalid homepage content.", 400, parsed.error.flatten());
    }

    const allowed = {
      ...parsed.data,
      services:
        parsed.data.services === null
          ? Prisma.JsonNull
          : parsed.data.services,
      whyItems:
        parsed.data.whyItems === null
          ? Prisma.JsonNull
          : parsed.data.whyItems,
    };
    const existing = await prisma.siteContent.findFirst();
    const content = existing
      ? await prisma.siteContent.update({ where: { id: existing.id }, data: allowed })
      : await prisma.siteContent.create({ data: allowed });

    return apiSuccess(content);
  } catch (error) {
    console.error("PUT /api/admin/content:", error);
    return apiError("Failed to save homepage content.");
  }
}
