"use client";

import { useEffect, useMemo, useState } from "react";
import { Layers3, Database, Sparkles, Zap } from "lucide-react";
import { useChatbotStore } from "@/lib/chatbot-store";
import { fallbackServices, fallbackSkillGroups, navItems, type PortfolioContent, type ProjectItem, type SkillItem } from "./portfolio-data";

export function usePortfolioLandingState({
    skillList,
    projectList,
    content,
}: {
    skillList: SkillItem[];
    projectList: ProjectItem[];
    content?: PortfolioContent | null;
}) {

    const [theme, setTheme] =
        useState<"light" | "dark">("light");

    const [mobileMenu, setMobileMenu] =
        useState(false);

    const [showAllProjects, setShowAllProjects] =
        useState(false);

    const [projectCategory, setProjectCategory] =
        useState("all");

    const [scrolled, setScrolled] =
        useState(false);

    const [activeSection, setActiveSection] =
        useState("work");

    const openChat = useChatbotStore((state) => state.openChat);

    const serviceMeta = [
        {
            label: "Product development",
            tags: ["Strategy", "UX", "Production"],
            includes: "Architecture, implementation and deployment.",
        },
        {
            label: "Engineering modernization",
            tags: ["Performance", "Architecture", "UX"],
            includes: "Refactoring, performance work and maintainable systems.",
        },
        {
            label: "Internal tools",
            tags: ["Dashboards", "Workflows", "Data"],
            includes: "Operational interfaces, reporting and workflow automation.",
        },
        {
            label: "AI integration",
            tags: ["RAG", "Assistants", "Automation"],
            includes: "Practical AI features integrated into real products.",
        },
    ];

    const services = content?.services?.length
        ? content.services.map((service, index) => ({
              number: String(index + 1).padStart(2, "0"),
              icon:
                  index % 4 === 0
                      ? Layers3
                      : index % 4 === 1
                          ? Zap
                          : index % 4 === 2
                              ? Database
                              : Sparkles,
              title: service.title,
              text: service.description,
              ...(serviceMeta[index] ?? serviceMeta[0]),
          }))
        : fallbackServices;

    /* ============================================================
       THEME
    ============================================================ */

    useEffect(() => {
        const savedTheme =
            localStorage.getItem("portfolio-theme");

        const nextTheme =
            savedTheme === "dark"
                ? "dark"
                : "light";

        setTheme(nextTheme);

        document.documentElement.dataset.theme =
            nextTheme;
    }, []);

    useEffect(() => {
        document.documentElement.dataset.theme =
            theme;

        localStorage.setItem(
            "portfolio-theme",
            theme,
        );
    }, [theme]);

    /* ============================================================
       SCROLL STATE
    ============================================================ */

    useEffect(() => {
        let frame = 0;

        const update = () => {
            frame = 0;
            setScrolled(window.scrollY > 24);
        };

        const handleScroll = () => {
            if (frame === 0) {
                frame = window.requestAnimationFrame(update);
            }
        };

        update();

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, []);

    /* ============================================================
       ACTIVE NAVIGATION SECTION
    ============================================================ */

    useEffect(() => {
        const sections = navItems
            .map((item) =>
                document.getElementById(item.id),
            )
            .filter(
                (
                    section,
                ): section is HTMLElement =>
                    Boolean(section),
            );

        if (!sections.length) {
            return;
        }

        const observer =
            new IntersectionObserver(
                (entries) => {
                    const visibleEntries =
                        entries
                            .filter(
                                (entry) =>
                                    entry.isIntersecting,
                            )
                            .sort(
                                (a, b) =>
                                    b.intersectionRatio -
                                    a.intersectionRatio,
                            );

                    const first =
                        visibleEntries[0];

                    if (first) {
                        setActiveSection(
                            first.target.id,
                        );
                    }
                },
                {
                    rootMargin:
                        "-25% 0px -55% 0px",
                    threshold: [0.05, 0.15, 0.3],
                },
            );

        sections.forEach((section) =>
            observer.observe(section),
        );

        return () => observer.disconnect();
    }, []);

    /* ============================================================
       CLOSE MOBILE MENU ON ESCAPE
    ============================================================ */

    useEffect(() => {
        const handleKeyDown = (
            event: KeyboardEvent,
        ) => {
            if (event.key === "Escape") {
                setMobileMenu(false);
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown,
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown,
            );
        };
    }, []);

    /* ============================================================
       PROJECTS
    ============================================================ */

    const projects = useMemo(() => {
        return [...projectList].sort((a, b) => {
            // `featured` is the source of truth for the public featured build.
            // Do not derive featured state from the lifecycle `status` field.
            const aFeatured = a.featured ? 1 : 0;
            const bFeatured = b.featured ? 1 : 0;

            if (aFeatured !== bFeatured) {
                return bFeatured - aFeatured;
            }

            return 0;
        });
    }, [projectList]);

    const projectCategories = useMemo(() => {
        const categories = projects
            .map((project) => project.category?.trim())
            .filter((category): category is string => Boolean(category));

        return Array.from(new Set(categories));
    }, [projects]);

    const filteredProjects = useMemo(() => {
        if (projectCategory === "all") return projects;
        return projects.filter((project) => project.category?.trim() === projectCategory);
    }, [projectCategory, projects]);

    const featuredProject = filteredProjects.find((project) => project.featured) ?? filteredProjects[0] ?? null;

    const visibleProjects = showAllProjects
        ? filteredProjects
        : filteredProjects.slice(0, 6);

    const featuredCount = filteredProjects.filter((project) => project.featured).length;

    const remainingProjects =
        visibleProjects.slice(1);

    const hasMoreProjects =
        filteredProjects.length > 6;

    /* ============================================================
       SKILLS
    ============================================================ */

    const groupedSkills = useMemo(() => {
        if (!skillList.length) {
            return fallbackSkillGroups;
        }

        const groups = {
            frontend: [] as string[],
            backend: [] as string[],
            database: [] as string[],
            ai: [] as string[],
            devops: [] as string[],
        };

        skillList.forEach((skill) => {
            const category = (skill.category ?? "")
                .trim()
                .toLowerCase()
                .replace(/[&_\s-]+/g, "");

            // Categories come from the database. Normalize common legacy names
            // so old records cannot accidentally appear in the wrong group.
            if (category === "frontend" || category === "front") {
                groups.frontend.push(skill.name);
            } else if (category === "backend" || category === "back") {
                groups.backend.push(skill.name);
            } else if (category === "data" || category === "database" || category === "databases") {
                groups.database.push(skill.name);
            } else if (category === "ai" || category === "aiautomation" || category === "aiandautomation") {
                groups.ai.push(skill.name);
            } else if (category === "devops" || category === "engineering") {
                groups.devops.push(skill.name);
            } else {
                // Never hide an unknown skill. Put it in DevOps as the safest
                // visible fallback rather than mislabeling it as Frontend.
                groups.devops.push(skill.name);
            }
        });

        return groups;
    }, [skillList]);

    /* ============================================================
       THEME CLASSES
    ============================================================ */

    const isLight = theme === "light";

    const pageClass = isLight
        ? "bg-[#f5f8fc] text-slate-950"
        : "bg-[#070b12] text-white";

    const muted = isLight
        ? "text-slate-600"
        : "text-slate-400";

    const heading = isLight
        ? "text-slate-950"
        : "text-white";

    const panel = isLight
        ? "border-slate-200/80 bg-white"
        : "border-slate-800 bg-slate-900/70";

    const softPanel = isLight
        ? "border-slate-200/80 bg-white/70"
        : "border-slate-800/80 bg-slate-900/40";

    const secondaryButton = isLight
        ? "border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50"
        : "border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-500 hover:bg-slate-800";

    const tagClass = isLight
        ? "border-slate-200 bg-slate-50 text-slate-600"
        : "border-slate-700 bg-slate-950 text-slate-300";


    return {
        theme,
        setTheme,
        mobileMenu,
        setMobileMenu,
        showAllProjects,
        setShowAllProjects,
        projectCategory,
        setProjectCategory,
        projectCategories,
        scrolled,
        activeSection,
        openChat,
        services,
        projects,
        filteredProjects,
        featuredProject,
        visibleProjects,
        featuredCount,
        remainingProjects,
        hasMoreProjects,
        groupedSkills,
        isLight,
        pageClass,
        muted,
        heading,
        panel,
        softPanel,
        secondaryButton,
        tagClass,
    };
}
