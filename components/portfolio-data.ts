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

export type ExperienceItem = {
    id: number;
    name?: string | null;
    company: string;
    position: string;
    location?: string | null;
    startDate: string;
    endDate?: string | null;
    description: string;
    technologies?: string | null;
    current: boolean;
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
    experienceList?: ExperienceItem[];
};

export const navItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Work", href: "#work", id: "work" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Certification", href: "#certification", id: "certification" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Stack", href: "#stack", id: "stack" },
    { label: "Contact", href: "#contact", id: "contact" },
];

export const fallbackServices = [
    { number: "01", icon: Layers3, label: "Product development", title: "Launch a new product", text: "Turn an idea into a polished web application designed around real users, clear workflows and measurable business goals.", tags: ["Strategy", "UX", "Production"], includes: "Architecture, implementation, QA and deployment.", investment: "Illustrative: $4k~$12k", timeline: "Typical scope: 3~8 weeks", target: "Target: launch-ready MVP" },
    { number: "02", icon: Zap, label: "Engineering modernization", title: "Modernize an existing app", text: "Improve performance, UX, architecture and maintainability without throwing away the parts that already work.", tags: ["Performance", "Architecture", "UX"], includes: "Refactoring, performance work, testing and maintainable systems.", investment: "Illustrative: $3k~$10k", timeline: "Typical scope: 2~6 weeks", target: "Target: faster, safer releases" },
    { number: "03", icon: Database, label: "Internal tools", title: "Business dashboards", text: "Build focused internal tools, reporting systems and workflow applications that help teams move faster and make better decisions.", tags: ["Dashboards", "Workflows", "Data"], includes: "Operational interfaces, reporting, permissions and workflow automation.", investment: "Illustrative: $3k~$9k", timeline: "Typical scope: 2~6 weeks", target: "Target: reduce manual work" },
    { number: "04", icon: Sparkles, label: "AI integration", title: "AI-powered experiences", text: "Add practical AI assistants, intelligent search, RAG and automation where they create useful product value.", tags: ["RAG", "Assistants", "Automation"], includes: "AI features, retrieval pipelines, evaluation and product integration.", investment: "Illustrative: $4k~$15k", timeline: "Typical scope: 3~8 weeks", target: "Target: useful AI in production" },
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
