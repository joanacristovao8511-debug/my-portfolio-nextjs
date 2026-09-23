const fallbackSiteUrl = "http://localhost:3000";

function normalizeUrl(value?: string | null) {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  return trimmed.replace(/\/$/, "");
}

export const siteConfig = {
  url: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) || fallbackSiteUrl,
  name: process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "Frunco Ruiz Portfolio",
  title:
    process.env.NEXT_PUBLIC_SITE_TITLE?.trim() ||
    "Frunco Ruiz | Full-Stack Developer & AI Product Builder",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION?.trim() ||
    "Frunco Ruiz builds AI-powered web applications, SaaS platforms, and modern full-stack digital products.",
  locale: "en_US",
  github: normalizeUrl(process.env.NEXT_PUBLIC_GITHUB_URL),
  linkedin: normalizeUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
};

export function absoluteUrl(path = "") {
  return new URL(path.replace(/^\//, ""), `${siteConfig.url}/`).toString();
}
