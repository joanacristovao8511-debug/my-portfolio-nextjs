import { ensureDatabase, prisma } from "@/lib/db";
import { PortfolioLanding } from '@/components/portfolio-landing';
import type { PortfolioContent } from "@/components/portfolio-data";

// Public portfolio content can be cached briefly while still reflecting CMS edits quickly.
export const revalidate = 60;

const fallbackSkills: Array<{ id: number; name: string }> = [
  { id: 1, name: "Next.js" },
  { id: 2, name: "TypeScript" },
  { id: 3, name: "React" },
  { id: 4, name: "Prisma" },
  { id: 5, name: "Node.js" },
  { id: 6, name: "Tailwind CSS" },
];

type ProfileData = {
  name: string;
  title: string;
  headline: string;
  bio: string;
  email: string | null;
  location: string | null;
  summary: string;
  availability: string | null;
};

const fallbackProfile: ProfileData = {
  name: "Frunco Ruiz",
  title: "Full-Stack Engineer | AI Product Builder",
  headline: "I build AI-powered products that turn complex ideas into clear, scalable software.",
  bio: "I combine product thinking, full-stack engineering, and practical AI integration to take products from idea to polished, production-ready experiences.",
  email: null,
  location: "United States",
  summary: "I design and build modern web applications with a strong focus on usability, performance, maintainability and real business value.",
  availability: "Available for selected freelance projects",
};

export default async function HomePage() {
  await ensureDatabase();

  const [profile, skills, projects, experiences, content] = await Promise.all([
    prisma.profile.findFirst({ orderBy: { id: "asc" } }).catch(() => null),
    prisma.skill.findMany({
      select: { id: true, name: true, category: true },
      orderBy: { order: "asc" },
    }).catch(() => []),
    prisma.project.findMany({
      where: { status: "active" },
      select: {
        id: true,
        slug: true,
        title: true,
        summary: true,
        description: true,
        challenge: true,
        solution: true,
        architecture: true,
        role: true,
        impact: true,
        category: true,
        status: true,
        featured: true,
        url: true,
        githubUrl: true,
        imageUrl: true,
        tags: true,
        projectSkills: {
          select: {
            skill: { select: { id: true, name: true, category: true } },
          },
        },
      },
      orderBy: [
        { featured: "desc" },
        { createdAt: "desc" },
      ],
    }).catch(() => []),
    prisma.experience.findMany({
      orderBy: [
        { current: "desc" },
        { startDate: "desc" },
      ],
    }).catch(() => []),
    prisma.siteContent.findFirst().catch(() => null),
  ]);

  const portfolioContent: PortfolioContent | null = content
    ? {
        heroBadge: content.heroBadge,
        heroTitle: content.heroTitle,
        heroDescription: content.heroDescription,
        aboutTitle: content.aboutTitle,
        aboutText: content.aboutText,
        services: Array.isArray(content.services)
          ? content.services.filter(
              (item: unknown): item is { title: string; description: string } =>
                typeof item === "object" &&
                item !== null &&
                typeof (item as { title?: unknown }).title === "string" &&
                typeof (item as { description?: unknown }).description === "string",
            )
          : undefined,
        whyTitle: content.whyTitle,
        whyItems: Array.isArray(content.whyItems)
          ? content.whyItems.filter(
              (item: unknown): item is { title: string; description: string } =>
                typeof item === "object" &&
                item !== null &&
                typeof (item as { title?: unknown }).title === "string" &&
                typeof (item as { description?: unknown }).description === "string",
            )
          : undefined,
        ctaTitle: content.ctaTitle,
        ctaDescription: content.ctaDescription,
        ctaPrimaryText: content.ctaPrimaryText,
        ctaSecondaryText: content.ctaSecondaryText,
      }
    : null;

  return (
    <PortfolioLanding
      profile={profile ?? fallbackProfile}
      content={portfolioContent}
      skillList={skills.length
        ? skills.map((skill: typeof skills[number]) => ({
            id: skill.id, 
            name: skill.name,
            category: skill.category,
          }))
        : fallbackSkills}
      experienceList={experiences.map((experience: typeof experiences[number]) => ({
        id: experience.id,
        name: experience.name,
        company: experience.company,
        position: experience.position,
        location: experience.location,
        startDate: experience.startDate,
        endDate: experience.endDate,
        description: experience.description,
        technologies: experience.technologies,
        current: experience.current,
      }))}
      projectList={projects.map((project: typeof projects[number]) => ({
        id: project.id,
        slug: project.slug,
        title: project.title,
        summary: project.summary,
        description: project.description,
        challenge: project.challenge,
        solution: project.solution,
        architecture: project.architecture,
        role: project.role,
        impact: project.impact,
        category: project.category,
        status: project.status,
        featured: project.featured,
        url: project.url,
        githubUrl: project.githubUrl,
        imageUrl: project.imageUrl,
        tags: project.tags,
        skills: project.projectSkills.map(
            ({ skill }: (typeof project.projectSkills)[number]) => ({
              id: skill.id,
              name: skill.name,
              category: skill.category,
            })
          ),
      }))}
    />
  );
}
