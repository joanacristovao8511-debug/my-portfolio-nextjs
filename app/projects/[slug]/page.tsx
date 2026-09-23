import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  // Github,
  Layers3,
  Target,
  Wrench,
  Lightbulb,
  BarChart3,
} from "lucide-react";

import { ensureDatabase, prisma } from "@/lib/db";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { BreadcrumbSchema } from "@/app/schema";
import { ThemeToggle } from "@/components/theme-toggle";

export const revalidate = 60;

type PageProps = { params: Promise<{ slug: string }> };

type ProjectSkill = { id: number; name: string; category: string | null };

type ProjectData = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  challenge: string | null;
  solution: string | null;
  architecture: string | null;
  role: string | null;
  impact: string | null;
  category: string | null;
  status: string | null;
  featured: boolean;
  url: string | null;
  githubUrl: string | null;
  imageUrl: string | null;
  tags: string;
  projectSkills: { skill: ProjectSkill }[];
};

function normalizeTags(tags: string | null | undefined) {
  return (tags ?? "").split(",").map((tag) => tag.trim()).filter(Boolean);
}

function StorySection({
  id,
  eyebrow,
  title,
  text,
  icon,
  tone = "default",
}: {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  icon: React.ReactNode;
  tone?: "default" | "accent";
}) {
  return (
    <article
      id={id}
      className={`project-card scroll-mt-28 rounded-[28px] border p-7 sm:p-9 ${tone === "accent" ? "project-card--accent" : ""}`}
    >
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 text-sky-300">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-sky-400">{eyebrow}</p>
          <h2 className="project-heading mt-2 text-2xl font-black tracking-[-0.03em] sm:text-3xl">{title}</h2>
        </div>
      </div>
      <p className="project-body mt-6 max-w-3xl text-base leading-8 whitespace-pre-line">{text}</p>
    </article>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  await ensureDatabase();
  const { slug } = await params;
  const project = (await prisma.project.findFirst({ where: { slug, status: "active" } })) as ProjectData | null;
  if (!project) return { title: "Project not found" };
  const canonical = absoluteUrl(`/projects/${project.slug}`);
  const image = project.imageUrl
    ? { url: project.imageUrl, alt: `${project.title} project preview` }
    : { url: "/og-image.png", alt: "Frunco Ruiz portfolio" };

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      url: canonical,
      siteName: siteConfig.name,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [image.url],
    },
    robots: { index: project.status === "active", follow: true },
  };
}

export default async function ProjectCaseStudy({ params }: PageProps) {
  await ensureDatabase();
  const { slug } = await params;

  const project = (await prisma.project.findUnique({
    where: { slug },
    include: {
      projectSkills: {
        include: {
          skill: true,
        },
      },
    },
  })) as ProjectData | null;

  if (!project) {
    throw new Error(`Project not found for slug: ${slug}`);
  }

  if (project.status !== "active") {
    throw new Error(
      `Project "${project.slug}" exists but status is "${project.status}"`
    );
  }

  const tags = normalizeTags(project.tags);
  const skills = project.projectSkills.map(({ skill }) => skill);
  const technologies = Array.from(
    new Map([...skills, ...tags.map((name) => ({ id: -name.length, name, category: null }))].map((item) => [item.name.toLowerCase(), item])).values(),
  );

  const sections = [
    project.challenge && { id: "challenge", label: "Challenge" },
    project.solution && { id: "solution", label: "Solution" },
    project.architecture && { id: "architecture", label: "Architecture" },
    project.role && { id: "role", label: "My role" },
    project.impact && { id: "impact", label: "Impact" },
  ].filter(Boolean) as Array<{ id: string; label: string }>;

  const related = await prisma.project.findMany({
    where: { status: "active", slug: { not: project.slug } },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    take: 3,
    select: { slug: true, title: true, summary: true, category: true, imageUrl: true },
  }).catch(() => []);

  const canonical = absoluteUrl(`/projects/${project.slug}`);
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Selected work", path: "/#work" },
    { name: project.title, path: `/projects/${project.slug}` },
  ];

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${canonical}#project`,
    name: project.title,
    description: project.summary,
    url: canonical,
    ...(project.imageUrl ? { image: [absoluteUrl(project.imageUrl)] } : {}),
    ...(project.category ? { genre: project.category } : {}),
    ...(project.url ? { sameAs: [project.url, ...(project.githubUrl ? [project.githubUrl] : [])] } : project.githubUrl ? { sameAs: [project.githubUrl] } : {}),
    creator: { "@id": `${new URL(absoluteUrl("/")).origin}/#person` },
    keywords: technologies.map((technology) => technology.name).join(", "),
  };

  return (
    <main className="project-page min-h-screen overflow-hidden">
      <BreadcrumbSchema items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <div className="project-page__glow pointer-events-none fixed inset-0 -z-0" />
      <div className="relative mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-10">
        <div className="flex items-center justify-between gap-4">
          <Link href="/#work" className="project-muted inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[var(--foreground)]">
            <ArrowLeft className="h-4 w-4" /> Back to selected work
          </Link>
          <ThemeToggle className="project-theme-toggle h-10 w-10 !justify-center !px-0 !py-0" />
        </div>

        <header className="mt-12 max-w-5xl sm:mt-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-sky-300">
              {project.category || "Project"}
            </span>
            {project.status && <span className="project-muted text-xs font-semibold capitalize">{project.status}</span>}
            {project.featured && <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300">Featured work</span>}
          </div>

          <h1 className="project-heading mt-6 max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-7xl">{project.title}</h1>
          <p className="project-body mt-7 max-w-3xl text-lg leading-8 sm:text-xl">{project.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.url ? (
              <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-400">
                Live product <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-secondary-button inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold transition">
                {/* <Github className="h-4 w-4" /> */}
                Source code
              </a>
            ) : null}
          </div>
        </header>

        <div className="project-preview-frame mt-12 overflow-hidden rounded-[30px] border p-2 shadow-2xl sm:mt-14">
          <div className="project-browser-bar flex h-10 items-center gap-1.5 border-b px-4">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            <div className="project-browser-address mx-auto h-5 w-2/5 rounded-md border" />
          </div>
          {project.imageUrl ? (
            <div className="max-h-[720px] overflow-auto">
              <img src={project.imageUrl} alt={`${project.title} product preview`} loading="eager" decoding="async" className="block h-auto min-h-full w-full object-contain" />
            </div>
          ) : (
            <div className="project-empty-preview flex aspect-video items-center justify-center text-sm font-semibold">Project preview not available yet.</div>
          )}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
          <div className="space-y-6">
            <StorySection id="overview" eyebrow="01 · Context" title="What this project is" text={project.description} icon={<Layers3 className="h-5 w-5" />} />
            {project.challenge && <StorySection id="challenge" eyebrow="02 · Problem" title="The challenge" text={project.challenge} icon={<Target className="h-5 w-5" />} />}
            {project.solution && <StorySection id="solution" eyebrow="03 · Approach" title="The solution" text={project.solution} icon={<Lightbulb className="h-5 w-5" />} />}
            {project.architecture && <StorySection id="architecture" eyebrow="04 · Systems" title="Architecture & engineering" text={project.architecture} icon={<Layers3 className="h-5 w-5" />} />}
            {project.role && <StorySection id="role" eyebrow="05 · Ownership" title="My role" text={project.role} icon={<Wrench className="h-5 w-5" />} />}
            {project.impact && <StorySection id="impact" eyebrow="06 · Outcome" title="Impact" text={project.impact} icon={<BarChart3 className="h-5 w-5" />} tone="accent" />}
          </div>

          <aside className="lg:sticky lg:top-24 lg:space-y-5">
            <div className="project-card rounded-[24px] border p-6">
              <p className="project-muted text-[10px] font-black uppercase tracking-[0.22em]">Case study map</p>
              <nav className="mt-4 space-y-1">
                <a href="#overview" className="project-nav-link block rounded-lg px-3 py-2 text-sm font-semibold">Overview</a>
                {sections.map((section) => <a key={section.id} href={`#${section.id}`} className="project-nav-link block rounded-lg px-3 py-2 text-sm font-semibold">{section.label}</a>)}
              </nav>
            </div>

            <div className="project-card rounded-[24px] border p-6">
              <p className="project-muted text-[10px] font-black uppercase tracking-[0.22em]">Technology</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {technologies.map((tech) => <span key={tech.name} className="project-tech rounded-full border px-3 py-1.5 text-xs font-semibold">{tech.name}</span>)}
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="project-related mt-20 border-t pt-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div><p className="text-[10px] font-black uppercase tracking-[0.24em] text-sky-400">Continue exploring</p><h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">More selected work</h2></div>
              <Link href="/#work" className="project-muted inline-flex items-center gap-2 text-sm font-bold hover:text-[var(--foreground)]">View all <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/projects/${item.slug}`} className="project-card group overflow-hidden rounded-[24px] border transition hover:-translate-y-1 hover:border-sky-400/25">
                  {item.imageUrl ? <img src={item.imageUrl} alt={`${item.title} project preview`} loading="lazy" decoding="async" className="aspect-video w-full object-cover" /> : <div className="project-image-placeholder aspect-video" />}
                  <div className="p-5"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-sky-500">{item.category || "Project"}</p><h3 className="project-heading mt-2 text-lg font-black">{item.title}</h3><p className="project-muted mt-2 line-clamp-2 text-sm leading-6">{item.summary}</p><span className="project-muted mt-4 inline-flex items-center gap-1 text-xs font-bold group-hover:text-[var(--foreground)]">Read case study <ArrowUpRight className="h-3.5 w-3.5" /></span></div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t pt-8">
          <Link href="/#work" className="project-muted inline-flex items-center gap-2 text-sm font-bold hover:text-[var(--foreground)]"><ArrowLeft className="h-4 w-4" /> Explore more work</Link>
          <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-bold text-[var(--background)] transition hover:opacity-85">Discuss a project <ArrowUpRight className="h-4 w-4" /></Link>
        </footer>
      </div>
    </main>
  );
}
