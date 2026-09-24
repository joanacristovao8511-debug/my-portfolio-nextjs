import { siteConfig, absoluteUrl } from "@/lib/site-config";

type PersonSchemaProps = {
  name?: string;
  jobTitle?: string;
  description?: string;
  website?: string | null;
  github?: string | null;
  linkedin?: string | null;
  avatarUrl?: string | null;
};

export function PersonSchema({
  name = "Frunco Ruiz",
  jobTitle = "Full-stack developer & AI product builder",
  description = siteConfig.description,
  website,
  github = siteConfig.github,
  linkedin = siteConfig.linkedin,
  avatarUrl,
}: PersonSchemaProps) {
  const sameAs = [github, linkedin, website].filter(Boolean);

  const graph = [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name,
      jobTitle,
      description,
      url: website || siteConfig.url,
      ...(avatarUrl ? { image: absoluteUrl(avatarUrl) } : {}),
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "en-US",
      publisher: { "@id": `${siteConfig.url}/#person` },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; path: string }>;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.path),
          })),
        }),
      }}
    />
  );
}
