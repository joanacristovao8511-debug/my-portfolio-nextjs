import type { MetadataRoute } from "next";
import { ensureDatabase, prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await ensureDatabase();

  const [projects, profile] = await Promise.all([
    prisma.project
      .findMany({
        where: { status: "active" },
        select: { slug: true, updatedAt: true },
      })
      .catch(() => []),
    prisma.profile.findFirst({ orderBy: { id: "asc" }, select: { updatedAt: true } }).catch(() => null),
  ]);

  const siteLastModified = profile?.updatedAt ?? new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
