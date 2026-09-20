import { Database, Layers3, Sparkles, Zap } from "lucide-react";

export type SkillItem = {
    id: number;
    name: string;
    category?: string;
};

export type ProfileItem = {
    name: string;
    title: string;
    headline: string;
    bio: string;
    email?: string | null;
    location?: string | null;
    summary: string;
    description?: string | null;
    category?: string | null;
    features?: string | null;
    availability?: string | null;
};

export type ProjectItem = {
    id: number;
    slug: string;
    title: string;
    summary: string;
    status: string;
    featured?: boolean;
    url?: string | null;
    githubUrl?: string | null;
    imageUrl?: string | null;
    tags?: string | null;
    description?: string | null;
    challenge?: string | null;
    solution?: string | null;
    architecture?: string | null;
    role?: string | null;
    impact?: string | null;
    category?: string | null;
    skills?: Array<{ id: number; name: string; category: string }>;
};

export type PortfolioContent = {
    heroBadge?: string | null;
    heroTitle?: string | null;
    heroDescription?: string | null;
    aboutTitle?: string | null;
    aboutText?: string | null;
    services?: Array<{ title: string; description: string }>;
    whyTitle?: string | null;
    whyItems?: Array<{ title: string; description: string }>;
    ctaTitle?: string | null;
    ctaDescription?: string | null;
    ctaPrimaryText?: string | null;
    ctaSecondaryText?: string | null;
};

export type PortfolioLandingProps = {
    profile: ProfileItem;
    content?: PortfolioContent | null;
    skillList: SkillItem[];
    projectList: ProjectItem[];
};

export const navItems = [
    { label: "Work", href: "#work", id: "work" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Stack", href: "#stack", id: "stack" },
    { label: "Contact", href: "#contact", id: "contact" },
];

export const fallbackServices = [
    { number: "01", icon: Layers3, title: "Launch a new product", text: "Turn an idea into a polished, production-ready web application designed around real business goals." },
    { number: "02", icon: Zap, title: "Modernize an existing app", text: "Improve performance, UX, architecture and maintainability without throwing away what already works." },
    { number: "03", icon: Database, title: "Business dashboards", text: "Build powerful internal tools, reporting systems and workflow applications that make teams more productive." },
    { number: "04", icon: Sparkles, title: "AI-powered experiences", text: "Add useful AI assistants, intelligent search, automation and AI-powered workflows to existing products." },
];

export const fallbackSkillGroups = {
    frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Zustand", "HTML5", "CSS3"],
    backend: ["Node.js", "Express", "REST APIs", "Authentication", "NextAuth"],
    database: ["PostgreSQL", "SQLite", "MongoDB", "Prisma", "Redis"],
    ai: ["AI Integration", "AI Assistants", "OpenAI", "LLM Integration", "AI Automation"],
    devops: ["Git", "GitHub", "Docker", "Vitest"],
};

export const sectionReveal = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
};

export const cardReveal = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export function parseTags(tags?: string | null) {
    return (tags ?? "").split(",").map((tag) => tag.trim()).filter(Boolean);
}
