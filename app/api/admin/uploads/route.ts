import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin-auth";
import { getPortfolioAssetsBucket } from "@/lib/r2";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

function safeFileName(name: string): string {
  const cleaned = name
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "")
    .toLowerCase();

  return cleaned || "upload";
}

export async function POST(request: Request) {
  const authResult = await requireAdmin();

  if (!authResult.authorized) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status },
    );
  }

  const bucket = getPortfolioAssetsBucket();

  if (!bucket) {
    return NextResponse.json(
      {
        success: false,
        error: "R2 is not configured. Bind PORTFOLIO_ASSETS to your R2 bucket.",
      },
      { status: 503 },
    );
  }

  try {
    const formData = await request.formData();
    const value = formData.get("file");

    if (!(value instanceof File)) {
      return NextResponse.json(
        { success: false, error: "An image file is required." },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.has(value.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported image type. Use JPG, PNG, WebP, or AVIF.",
        },
        { status: 415 },
      );
    }

    if (value.size <= 0 || value.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "Images must be between 1 byte and 10 MB." },
        { status: 413 },
      );
    }

    const key = `projects/${crypto.randomUUID()}-${safeFileName(value.name)}`;

    await bucket.put(key, value.stream(), {
      httpMetadata: {
        contentType: value.type,
        cacheControl: "public, max-age=31536000, immutable",
      },
    });

    const origin = new URL(request.url).origin;
    const url = `${origin}/api/media/${key}`;

    return NextResponse.json({
      success: true,
      data: { key, url, size: value.size, contentType: value.type },
    });
  } catch (error) {
    console.error("POST /api/admin/uploads:", error);

    return NextResponse.json(
      { success: false, error: "Failed to upload image." },
      { status: 500 },
    );
  }
}
