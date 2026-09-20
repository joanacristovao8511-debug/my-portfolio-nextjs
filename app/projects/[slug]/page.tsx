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

export const dynamic = "force-dynamic";
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
      className={`scroll-mt-28 rounded-[28px] border p-7 sm:p-9 ${
        tone === "accent"
          ? "border-sky-400/20 bg-sky-400/[0.07]"
          : "border-white/10 bg-white/[0.035]"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 text-sky-300">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-sky-400">{eyebrow}</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">{title}</h2>
        </div>
      </div>
      <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 whitespace-pre-line">{text}</p>
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
    where: { slug, status: "active" },
    include: { projectSkills: { include: { skill: true } } },
  })) as ProjectData | null;

  if (!project) notFound();

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
    <main className="min-h-screen overflow-hidden bg-[#070b12] text-white">
      <BreadcrumbSchema items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_15%_5%,rgba(14,165,233,0.16),transparent_28%),radial-gradient(circle_at_85%_30%,rgba(99,102,241,0.12),transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-10">
        <Link href="/#work" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to selected work
        </Link>

        <header className="mt-12 max-w-5xl sm:mt-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-sky-300">
              {project.category || "Project"}
            </span>
            {project.status && <span className="text-xs font-semibold capitalize text-slate-500">{project.status}</span>}
            {project.featured && <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300">Featured work</span>}
          </div>

          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-7xl">{project.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">{project.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.url ? (
              <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-400">
                Live product <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                {/* <Github className="h-4 w-4" /> */}
                 Source code
              </a>
            ) : null}
          </div>
        </header>

        <div className="mt-12 overflow-hidden rounded-[30px] border border-white/10 bg-slate-950 p-2 shadow-2xl shadow-black/30 sm:mt-14">
          <div className="flex h-10 items-center gap-1.5 border-b border-white/10 px-4">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            <div className="mx-auto h-5 w-2/5 rounded-md border border-white/10 bg-white/[0.04]" />
          </div>
          {project.imageUrl ? (
            <div className="max-h-[720px] overflow-auto">
              <img src={project.imageUrl} alt={`${project.title} product preview`} loading="eager" decoding="async" className="block h-auto min-h-full w-full object-contain" />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-sky-500/20 via-slate-900 to-slate-950 text-sm font-semibold text-sky-300">Project preview not available yet.</div>
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
            <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">Case study map</p>
              <nav className="mt-4 space-y-1">
                <a href="#overview" className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white">Overview</a>
                {sections.map((section) => <a key={section.id} href={`#${section.id}`} className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-white">{section.label}</a>)}
              </nav>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">Technology</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {technologies.map((tech) => <span key={tech.name} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300">{tech.name}</span>)}
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t border-white/10 pt-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div><p className="text-[10px] font-black uppercase tracking-[0.24em] text-sky-400">Continue exploring</p><h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">More selected work</h2></div>
              <Link href="/#work" className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white">View all <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/projects/${item.slug}`} className="group overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.035] transition hover:-translate-y-1 hover:border-sky-400/25">
                  {item.imageUrl ? <img src={item.imageUrl} alt={`${item.title} project preview`} loading="lazy" decoding="async" className="aspect-video w-full object-cover" /> : <div className="aspect-video bg-slate-900" />}
                  <div className="p-5"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-sky-400">{item.category || "Project"}</p><h3 className="mt-2 text-lg font-black">{item.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{item.summary}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-slate-300 group-hover:text-white">Read case study <ArrowUpRight className="h-3.5 w-3.5" /></span></div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-8">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white"><ArrowLeft className="h-4 w-4" /> Explore more work</Link>
          <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 hover:bg-slate-200">Discuss a project <ArrowUpRight className="h-4 w-4" /></Link>
        </footer>
      </div>
    </main>
  );
}
