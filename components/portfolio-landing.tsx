"use client";

import { ProcessSection } from "./sections/process";
import { TestimonialsSection } from "./sections/testimonials";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import {
    ArrowRight, BriefcaseBusiness, Check, ChevronRight, ExternalLink, Eye,
    ArrowUpRight, Bot, Download, FileText, Mail, Menu, Moon, Palette, Server,
    GitBranch, Sparkles, SunMedium, X, Zap, Database, Layers3, Code2,
    MessageCircle, Send,
} from "lucide-react";
import dynamic from "next/dynamic";

const PortfolioChatbot = dynamic(() => import("@/components/portfolio-chatbot"), {
    ssr: false,
    loading: () => null,
});

function GithubIcon({ className = "h-5 w-5" }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.342-3.369-1.342-.455-1.157-1.11-1.466-1.11-1.466-.908-.621.069-.609.069-.609 1.004.071 1.532 1.031 1.532 1.031.892 1.529 2.341 1.087 2.91.831.091-.646.349-1.087.635-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.57 9.57 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.579.688.481A10.001 10.001 0 0 0 22 12c0-5.523-4.477-10-10-10Z" />
        </svg>
    );
}
import { ProjectPreview } from "./project-preview";
import { cardReveal, navItems, parseTags, sectionReveal, type PortfolioLandingProps } from "./portfolio-data";
import { usePortfolioLandingState } from "./use-portfolio-landing";
import { siteConfig } from "@/lib/site-config";

export function PortfolioLanding({
    profile,
    skillList,
    projectList,
    content,
    experienceList = [],
    educationList = [],
}: PortfolioLandingProps) {
    const {
        theme, setTheme, mobileMenu, setMobileMenu, showAllProjects, setShowAllProjects,
        projectCategory, setProjectCategory, projectCategories,
        scrolled, activeSection, openChat, services, projects, filteredProjects, featuredProject, visibleProjects,
        featuredCount, remainingProjects, hasMoreProjects, groupedSkills, isLight, pageClass,
        muted, heading, panel, softPanel, secondaryButton, tagClass,
    } = usePortfolioLandingState({ skillList, projectList, content });

    /* ============================================================
       RENDER
    ============================================================ */

    return (
        <LazyMotion features={domAnimation}>
        <>
            <a href="#main-content" className="skip-link">Skip to main content</a>
        <main
            id="main-content"
            className={`
                senior-shell
                min-h-screen
                overflow-hidden
                transition-colors
                duration-500
                ${pageClass}
            `}
        >
            {/* =====================================================
                ATMOSPHERIC BACKGROUND
            ====================================================== */}

            <div
                className="
                    pointer-events-none
                    fixed
                    inset-0
                    -z-10
                    overflow-hidden
                "
            >
                <m.div
                    animate={{
                        x: [0, 25, 0],
                        y: [0, 20, 0],
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className={`
                        absolute
                        left-[-15%]
                        top-[-10%]
                        h-[500px]
                        w-[500px]
                        rounded-full
                        blur-3xl
                        ${
                            isLight
                                ? "bg-sky-200/40"
                                : "bg-sky-950/30"
                        }
                    `}
                />

                <m.div
                    animate={{
                        x: [0, -20, 0],
                        y: [0, 25, 0],
                    }}
                    transition={{
                        duration: 17,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className={`
                        absolute
                        right-[-10%]
                        top-[25%]
                        h-[450px]
                        w-[450px]
                        rounded-full
                        blur-3xl
                        ${
                            isLight
                                ? "bg-blue-100/40"
                                : "bg-blue-950/20"
                        }
                    `}
                />

                <div
                    className={`
                        absolute
                        inset-0
                        ${
                            isLight
                                ? "opacity-[0.22]"
                                : "opacity-[0.1]"
                        }
                    `}
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(100,116,139,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.12) 1px, transparent 1px)",
                        backgroundSize:
                            "48px 48px",
                        maskImage:
                            "linear-gradient(to bottom, black, transparent 75%)",
                    }}
                />
            </div>

            {/* =====================================================
                NAVIGATION
            ====================================================== */}

            <header className="sticky top-0 z-50">
                <m.div
                    animate={{
                        boxShadow: scrolled
                            ? isLight
                                ? "0 10px 35px rgba(15,23,42,0.07)"
                                : "0 10px 35px rgba(0,0,0,0.22)"
                            : "0 0 0 rgba(0,0,0,0)",
                    }}
                    className={`
                        senior-header
                        border-b
                        backdrop-blur-2xl
                        transition-colors
                        duration-300
                        shadow-[0_8px_24px_rgba(15,23,42,0.04)]
                        ${
                            isLight
                                ? "border-slate-200/80 bg-white/80"
                                : "border-slate-800/70 bg-slate-950/80"
                        }
                    `}
                >
                    <div
                        className={`
                            mx-auto
                            flex
                            max-w-7xl
                            items-center
                            justify-between
                            px-4
                            transition-all
                            duration-300
                            sm:px-6
                            ${
                                scrolled
                                    ? "h-16"
                                    : "h-20"
                            }
                        `}
                    >
                        {/* Logo */}

                        <a
                            href="#main-content"
                            onClick={() =>
                                setMobileMenu(false)
                            }
                            className="group flex items-center gap-2 sm:gap-3"
                        >
                            <m.div
                                whileHover={{
                                    rotate: -4,
                                    scale: 1.05,
                                }}
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-sky-500
                                    text-white
                                    shadow-lg
                                    shadow-sky-500/20
                                    sm:h-11
                                    sm:w-11
                                "
                            >
                                <Code2 className="h-4 w-4 sm:h-5 sm:w-5" />
                            </m.div>

                            <div className="min-w-0">
                                <p
                                    className={`
                                        truncate
                                        text-xs
                                        font-black
                                        tracking-tight
                                        sm:text-sm
                                        ${heading}
                                    `}
                                >
                                    {profile.name}
                                </p>

                                <p
                                    className={`
                                        text-[9px]
                                        uppercase
                                        tracking-[0.18em]
                                        sm:text-[10px]
                                        ${muted}
                                    `}
                                >
                                    {profile.title}
                                </p>
                            </div>
                        </a>

                        {/* Desktop navigation */}

                        <nav aria-label="Primary navigation" className="hidden items-center gap-2 md:flex">
                            {navItems.map((item) => {
                                const active =
                                    activeSection ===
                                    item.id;

                                return (
                                    <a
                                        key={item.id}
                                        href={
                                            item.href
                                        }
                                        className={`
                                            relative
                                            rounded-full
                                            px-4
                                            py-2
                                            text-sm
                                            font-medium
                                            transition
                                            ${
                                                active
                                                    ? isLight
                                                        ? "text-slate-950"
                                                        : "text-white"
                                                    : muted
                                            }
                                        `}
                                    >
                                        {active && (
                                            <m.span
                                                layoutId="active-nav"
                                                className={`
                                                    absolute
                                                    inset-0
                                                    -z-10
                                                    rounded-full
                                                    ${
                                                        isLight
                                                            ? "bg-slate-100"
                                                            : "bg-white/10"
                                                    }
                                                `}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 30,
                                                }}
                                            />
                                        )}

                                        <span className="transition-colors hover:text-sky-500">
                                            {item.label}
                                        </span>
                                    </a>
                                );
                            })}
                        </nav>

                        {/* Actions */}

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() =>
                                    setTheme(
                                        isLight
                                            ? "dark"
                                            : "light",
                                    )
                                }
                                className={`
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    transition
                                    ${secondaryButton}
                                `}
                                aria-label="Toggle color theme"
                            >
                                <AnimatePresence
                                    mode="wait"
                                    initial={false}
                                >
                                    <m.span
                                        key={theme}
                                        initial={{
                                            opacity: 0,
                                            rotate: -30,
                                            scale: 0.7,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            rotate: 0,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            rotate: 30,
                                            scale: 0.7,
                                        }}
                                    >
                                        {isLight ? (
                                            <Moon className="h-4 w-4" />
                                        ) : (
                                            <SunMedium className="h-4 w-4 text-amber-400" />
                                        )}
                                    </m.span>
                                </AnimatePresence>
                            </button>

                            <a
                                href="/admin"
                                className="
                                    hidden
                                    rounded-full
                                    bg-sky-500
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-slate-950
                                    transition
                                    hover:-translate-y-0.5
                                    hover:bg-sky-400
                                    sm:block
                                "
                            >
                                Admin
                            </a>

                            <button
                                type="button"
                                onClick={() =>
                                    setMobileMenu(
                                        (current) =>
                                            !current,
                                    )
                                }
                                className={`
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    md:hidden
                                    ${secondaryButton}
                                `}
                                aria-label={mobileMenu ? "Close navigation menu" : "Open navigation menu"}
                                aria-controls="mobile-navigation"
                                aria-expanded={mobileMenu}
                            >
                                <AnimatePresence
                                    mode="wait"
                                    initial={false}
                                >
                                    <m.span
                                        key={
                                            mobileMenu
                                                ? "close"
                                                : "menu"
                                        }
                                        initial={{
                                            opacity: 0,
                                            rotate: -45,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            rotate: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            rotate: 45,
                                        }}
                                    >
                                        {mobileMenu ? (
                                            <X className="h-5 w-5" />
                                        ) : (
                                            <Menu className="h-5 w-5" />
                                        )}
                                    </m.span>
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}

                    <AnimatePresence>
                        {mobileMenu && (
                            <m.div
                                initial={{
                                    opacity: 0,
                                    height: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    height: "auto",
                                }}
                                exit={{
                                    opacity: 0,
                                    height: 0,
                                }}
                                id="mobile-navigation"
                                role="region"
                                aria-label="Mobile navigation"
                                className={`
                                    overflow-hidden
                                    border-t
                                    md:hidden
                                    ${
                                        isLight
                                            ? "border-slate-200 bg-white"
                                            : "border-slate-800 bg-slate-950"
                                    }
                                `}
                            >
                                <m.div
                                    initial={{
                                        y: -8,
                                    }}
                                    animate={{
                                        y: 0,
                                    }}
                                    className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4"
                                >
                                    <nav aria-label="Mobile primary navigation">
                                    {navItems.map(
                                        (
                                            item,
                                            index,
                                        ) => (
                                            <m.a
                                                key={
                                                    item.id
                                                }
                                                href={
                                                    item.href
                                                }
                                                initial={{
                                                    opacity: 0,
                                                    x: -8,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                                transition={{
                                                    delay:
                                                        index *
                                                        0.04,
                                                }}
                                                onClick={() =>
                                                    setMobileMenu(
                                                        false,
                                                    )
                                                }
                                                className={`
                                                    flex
                                                    items-center
                                                    justify-between
                                                    rounded-2xl
                                                    px-4
                                                    py-3
                                                    text-sm
                                                    font-medium
                                                    transition
                                                    ${
                                                        activeSection ===
                                                        item.id
                                                            ? "bg-sky-50 text-sky-600"
                                                            : muted
                                                    }
                                                `}
                                            >
                                                {
                                                    item.label
                                                }

                                                <ChevronRight className="h-4 w-4" />
                                            </m.a>
                                        ),
                                    )}

                                    </nav>

                                    <a
                                        href="/admin"
                                        onClick={() =>
                                            setMobileMenu(
                                                false,
                                            )
                                        }
                                        className="
                                            mt-2
                                            rounded-2xl
                                            bg-sky-500
                                            px-4
                                            py-3
                                            text-center
                                            text-sm
                                            font-bold
                                            text-slate-950
                                        "
                                    >
                                        Admin
                                    </a>
                                </m.div>
                            </m.div>
                        )}
                    </AnimatePresence>
                </m.div>
            </header>

            {/* =====================================================
                HERO
            ====================================================== */}

            <section
                id="top"
                className="relative"
            >
                <div className="senior-hero mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20 lg:pb-32 lg:pt-28">
                    <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
                        {/* Hero copy */}

                        <m.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.09,
                                    },
                                },
                            }}
                        >
                            <m.p
                                variants={{
                                    hidden: { opacity: 0, y: 14 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.5 },
                                    },
                                }}
                                className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-sky-500"
                            >
                                {content?.heroBadge || "Full-Stack AI Developer · Product Builder"}
                            </m.p>

                            <m.div
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 18,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.55,
                                            ease: [
                                                0.16,
                                                1,
                                                0.3,
                                                1,
                                            ] as const,
                                        },
                                    },
                                }}
                                className={`
                                    mb-7
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-semibold
                                    shadow-[0_8px_20px_rgba(14,165,233,0.08)]
                                    ${
                                        isLight
                                            ? "border-sky-200 bg-sky-50 text-sky-700"
                                            : "border-sky-400/30 bg-sky-500/10 text-sky-200"
                                    }
                                `}
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                </span>

                                {profile.availability || "Open to selected projects"}
                            </m.div>

                            <m.h1
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 24,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.7,
                                            ease: [
                                                0.16,
                                                1,
                                                0.3,
                                                1,
                                            ] as const,
                                        },
                                    },
                                }}
                                className={`
                                    max-w-5xl
                                    text-4xl
                                    font-black
                                    leading-[0.92]
                                    tracking-[-0.055em]
                                    drop-shadow-[0_8px_18px_rgba(14,165,233,0.05)]
                                    sm:text-5xl
                                    md:text-6xl
                                    lg:text-[82px]
                                    ${heading}
                                `}
                            >
                                {content?.heroTitle || profile.headline || "Building intelligent digital products with Full-Stack + AI."}
                            </m.h1>

                            <m.p
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 18,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.6,
                                            ease: [
                                                0.16,
                                                1,
                                                0.3,
                                                1,
                                            ] as const,
                                        },
                                    },
                                }}
                                className={`
                                    mt-6
                                    max-w-2xl
                                    text-sm
                                    leading-7
                                    sm:mt-8
                                    sm:text-base
                                    lg:text-lg
                                    ${muted}
                                `}
                            >
                                {content?.heroDescription || profile.bio || profile.summary}
                            </m.p>

                            <m.div
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 18,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.55,
                                            ease: [
                                                0.16,
                                                1,
                                                0.3,
                                                1,
                                            ] as const,
                                        },
                                    },
                                }}
                                className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap"
                            >
                                <a
                                    href="#work"
                                    className="
                                        group
                                        inline-flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-full
                                        bg-gradient-to-r
                                        from-sky-400
                                        via-sky-500
                                        to-blue-500
                                        px-6
                                        py-3.5
                                        text-sm
                                        font-bold
                                        text-slate-950
                                        shadow-[0_12px_30px_rgba(14,165,233,0.22)]
                                        transition
                                        duration-300
                                        hover:-translate-y-0.5
                                        hover:shadow-[0_16px_34px_rgba(14,165,233,0.28)]
                                        sm:w-auto
                                    "
                                >
                                    Explore my work
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </a>

                                <button
                                    type="button"
                                    onClick={openChat}
                                    className={`
                                        inline-flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-full
                                        border
                                        bg-white/5
                                        px-6
                                        py-3.5
                                        text-sm
                                        font-semibold
                                        shadow-[0_10px_28px_rgba(15,23,42,0.06)]
                                        transition
                                        duration-300
                                        hover:-translate-y-0.5
                                        sm:w-auto
                                        ${secondaryButton}
                                    `}
                                >
                                    <Bot className="h-4 w-4" />
                                    Ask my AI assistant
                                </button>

                                <a
                                    href="/documents/Frunco_Ruiz_Resume.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`inline-flex w-full items-center justify-center gap-2 rounded-full border px-5 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 sm:w-auto ${secondaryButton}`}
                                >
                                    <FileText className="h-4 w-4" aria-hidden="true" />
                                    Resume
                                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                                </a>
                            </m.div>

                            <m.div
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                    },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            duration: 0.5,
                                        },
                                    },
                                }}
                                className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
                            >
                                {[
                                    "Full-stack development",
                                    "Product design",
                                    "AI integration",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className={`
                                            flex
                                            items-center
                                            gap-2
                                            text-xs
                                            ${muted}
                                        `}
                                    >
                                        <Check className="h-3.5 w-3.5 text-emerald-500" />

                                        {item}
                                    </div>
                                ))}
                            </m.div>
                        </m.div>

                        {/* Hero visual */}

                        <m.div
                            initial={{
                                opacity: 0,
                                scale: 0.94,
                                y: 18,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.75,
                                delay: 0.2,
                                ease: [
                                    0.16,
                                    1,
                                    0.3,
                                    1,
                                ] as const,
                            }}
                            className="relative"
                        >
                            <m.div
                                animate={{
                                    y: [0, -8, 0],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="relative"
                            >
                                <div className="absolute -inset-6 rounded-[40px] bg-sky-500/10 blur-3xl" />

                                <div
                                    className={`
                                        senior-hero-card
                                        relative
                                        overflow-hidden
                                        rounded-[32px]
                                        border
                                        p-2
                                        shadow-[0_25px_60px_rgba(15,23,42,0.12)]
                                        ring-1
                                        ring-slate-200/50
                                        ${
                                            isLight
                                                ? "border-slate-200 bg-white/90"
                                                : "border-slate-800 bg-slate-900"
                                        }
                                    `}
                                >
                                    <div
                                        className="
                                            relative
                                            overflow-hidden
                                            rounded-[26px]
                                            bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),transparent_28%),linear-gradient(135deg,_#020817_0%,_#0f172a_45%,_#111827_100%)]
                                            p-8
                                            text-white
                                            sm:p-10
                                        "
                                    >
                                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />

                                        <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

                                        <div className="relative">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                                                        Digital product
                                                        builder
                                                    </p>

                                                    <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                                                        Frunco
                                                        <span className="text-sky-400">
                                                            .
                                                        </span>
                                                    </h2>
                                                </div>

                                                <m.div
                                                    whileHover={{
                                                        rotate: 6,
                                                        scale: 1.05,
                                                    }}
                                                    className="
                                                        flex
                                                        h-12
                                                        w-12
                                                        items-center
                                                        justify-center
                                                        rounded-2xl
                                                        bg-sky-500
                                                        shadow-lg
                                                        shadow-sky-500/20
                                                    "
                                                >
                                                    <Code2 className="h-5 w-5 text-white" />
                                                </m.div>
                                            </div>

                                            <div className="mt-12">
                                                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                                    Focus
                                                </p>

                                                <p className="mt-3 text-2xl font-bold leading-tight">
                                                    Products
                                                    <br />
                                                    SaaS
                                                    <br />
                                                    Dashboards
                                                </p>
                                            </div>

                                            <div className="mt-10 grid grid-cols-2 gap-3">
                                                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                    <Code2 className="h-4 w-4 text-sky-400" />

                                                    <p className="mt-3 text-xs text-slate-400">
                                                        Engineering
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold">
                                                        Full Stack
                                                    </p>
                                                </div>

                                                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                    <Palette className="h-4 w-4 text-sky-400" />

                                                    <p className="mt-3 text-xs text-slate-400">
                                                        Experience
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold">
                                                        Product Design
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-3 flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-xs text-emerald-300">
                                                <m.span
                                                    animate={{
                                                        opacity: [
                                                            0.5,
                                                            1,
                                                            0.5,
                                                        ],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                    }}
                                                    className="h-2 w-2 rounded-full bg-emerald-400"
                                                />

                                                Available for selected projects
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </m.div>
                        </m.div>
                    </div>

                    {/* Hero stats */}

                    <div className="mt-20 grid gap-4 sm:grid-cols-3">
                        {[
                            {
                                value: `${featuredCount || projectList.length}`,
                                label: featuredCount ? "Featured projects" : "Projects",
                            },
                            {
                                value: `${skillList.length}+`,
                                label: "Technical skills",
                            },
                            {
                                value: profile.title.includes("Product") ? "Full stack + AI" : "Full-stack delivery",
                                label: "Primary focus",
                            },
                        ].map(
                            (
                                stat,
                                index,
                            ) => (
                                <m.div
                                    key={
                                        stat.label
                                    }
                                    initial={{
                                        opacity: 0,
                                        y: 15,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        delay:
                                            0.45 +
                                            index *
                                                0.1,
                                        duration:
                                            0.5,
                                        ease: [
                                            0.16,
                                            1,
                                            0.3,
                                            1,
                                        ] as const,
                                    }}
                                    whileHover={{
                                        y: -3,
                                    }}
                                    className={`
                                        senior-stat
                                        rounded-2xl
                                        border
                                        border-slate-200/70
                                        bg-white/40
                                        p-6
                                        transition
                                        shadow-[0_10px_24px_rgba(15,23,42,0.03)]
                                        ${panel}
                                    `}
                                >
                                    <p
                                        className={`
                                            text-3xl
                                            font-black
                                            tracking-tight
                                            ${heading}
                                        `}
                                    >
                                        {
                                            stat.value
                                        }
                                    </p>

                                    <p
                                        className={`
                                            mt-2
                                            text-xs
                                            uppercase
                                            tracking-[0.15em]
                                            ${muted}
                                        `}
                                    >
                                        {
                                            stat.label
                                        }
                                    </p>
                                </m.div>
                            ),
                        )}
                    </div>
                </div>
            </section>

            {/* =====================================================
                WORK
            ====================================================== */}

            <section
                id="work"
                className="relative scroll-mt-24 overflow-hidden border-t border-slate-200/60 dark:border-slate-800/60"
            >
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-sky-500/[0.07] to-transparent" />

                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-32">
                    <m.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={sectionReveal}
                        className="relative mb-10 grid gap-8 sm:mb-14 lg:grid-cols-[1fr_0.55fr] lg:items-end"
                    >
                        <div>
                            <div className="mb-5 flex items-center gap-3">
                                <span className="h-px w-10 bg-sky-500" />
                                <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-500">
                                    Selected work
                                </p>
                            </div>

                            <h2 className={`max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.04em] sm:text-6xl ${heading}`}>
                                Built to look sharp.
                                <br />
                                <span className="text-sky-500">Engineered to matter.</span>
                            </h2>
                        </div>

                        <div className="lg:pb-1">
                            <p className={`max-w-lg text-sm leading-7 ${muted}`}>
                                A curated set of product concepts and full-stack builds focused on real workflows, thoughtful interfaces and production-minded engineering.
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2">
                                <span className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] ${tagClass}`}>
                                    {projects.length} published {projects.length === 1 ? "build" : "builds"}
                                </span>
                                <span className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] ${tagClass}`}>
                                    Full-stack
                                </span>
                                <span className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] ${tagClass}`}>
                                    AI + product
                                </span>
                            </div>
                        </div>
                    </m.div>

                    {projects.length > 0 && (
                        <div className="mb-8 flex flex-wrap items-center gap-2" aria-label="Filter projects by category">
                            <span className={`mr-1 text-xs font-semibold ${muted}`}>Browse by:</span>
                            {["all", ...projectCategories].map((category) => {
                                const active = projectCategory === category;
                                const label = category === "all" ? "All work" : category;
                                return (
                                    <button
                                        key={category}
                                        type="button"
                                        aria-pressed={active}
                                        onClick={() => {
                                            setProjectCategory(category);
                                            setShowAllProjects(false);
                                        }}
                                        className={`min-h-10 rounded-full border px-4 py-2 text-xs font-bold transition ${active ? "border-sky-500 bg-sky-500 text-slate-950" : secondaryButton}`}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {!projects.length ? (
                        <m.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={sectionReveal}
                            className={`rounded-[32px] border border-dashed p-12 text-center ${softPanel}`}
                        >
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-500/20 bg-sky-500/10">
                                <Code2 className="h-7 w-7 text-sky-500" aria-hidden="true" />
                            </div>
                            <p className="mt-5 text-[10px] font-black uppercase tracking-[0.22em] text-sky-500">Selected work</p>
                            <h3 className={`mt-2 text-xl font-bold ${heading}`}>Published work is being updated.</h3>
                            <p className={`mx-auto mt-2 max-w-md text-sm leading-6 ${muted}`}>
                                No project case studies are currently published. Check back as new work is added, or start a conversation about what you are building.
                            </p>
                            <button
                                type="button"
                                onClick={openChat}
                                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-500/30"
                            >
                                Ask about my work
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </button>
                        </m.div>
                    ) : filteredProjects.length === 0 ? (
                        <div className={`rounded-[32px] border border-dashed p-12 text-center ${softPanel}`}>
                            <Code2 className="mx-auto h-8 w-8 text-sky-500" aria-hidden="true" />
                            <h3 className={`mt-4 text-xl font-bold ${heading}`}>No projects in this category yet.</h3>
                            <p className={`mx-auto mt-2 max-w-md text-sm leading-6 ${muted}`}>Try another category or browse all published work.</p>
                            <button type="button" onClick={() => setProjectCategory("all")} className="mt-6 min-h-11 rounded-full bg-sky-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-500/30">
                                View all work
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-7">
                            {visibleProjects.map((project, index) => {
                                const tags = parseTags(project.tags);
                                const skillNames = (project.skills ?? []).map((skill) => skill.name);
                                const displayTags = Array.from(new Set([...skillNames, ...tags]));
                                const isFeatured = project.featured === true;
                                const hasLiveUrl = Boolean(project.url);
                                const hasGithub = Boolean(project.githubUrl);

                                return (
                                    <m.article
                                        key={project.id}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.12 }}
                                        variants={cardReveal}
                                        transition={{ delay: Math.min(index * 0.06, 0.25) }}
                                        className={`senior-card group relative overflow-hidden rounded-[32px] border ${panel} ${isFeatured ? "shadow-2xl shadow-sky-950/10" : ""}`}
                                    >
                                        {isFeatured && (
                                            <div className="absolute right-6 top-6 z-20 rounded-full border border-sky-300/20 bg-sky-500 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-slate-950 shadow-lg shadow-sky-500/20">
                                                Featured build
                                            </div>
                                        )}

                                        <div className={`grid ${isFeatured ? "lg:grid-cols-[1.35fr_0.65fr]" : "lg:grid-cols-[0.95fr_1.05fr]"}`}>
                                            <div className={`relative overflow-hidden ${isFeatured ? "min-h-[390px] lg:min-h-[500px]" : "min-h-[280px]"}`}>
                                                <div className="absolute inset-0 bg-slate-950" />
                                                <div className="absolute -inset-16 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.28),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(56,189,248,0.16),transparent_30%)]" />

                                                <m.div
                                                    whileHover={{ scale: 1.025, y: -3 }}
                                                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                                    className="absolute inset-2.5 overflow-hidden rounded-[18px] border border-white/10 bg-slate-900 shadow-2xl sm:inset-3.5"
                                                >
                                                    <div className="flex h-9 items-center gap-1.5 border-b border-white/10 bg-slate-950/90 px-4">
                                                        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                                                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                                                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                                                        <div className="mx-auto h-5 w-2/5 rounded-md border border-white/10 bg-white/[0.04]" />
                                                    </div>

                                                    <ProjectPreview project={project} />
                                                </m.div>

                                                <div className="absolute bottom-7 left-7 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-xl">
                                                    <Eye className="h-3 w-3" />
                                                    Product preview
                                                </div>
                                            </div>

                                            <div className={`flex flex-col justify-between ${isFeatured ? "p-7 sm:p-10" : "p-7 sm:p-9"}`}>
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[10px] font-black uppercase tracking-[0.22em] text-sky-500">
                                                            {String(index + 1).padStart(2, "0")}
                                                        </span>
                                                        <span className={`h-px w-8 ${isLight ? "bg-slate-200" : "bg-slate-700"}`} />
                                                        <span className={`rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] ${tagClass}`}>
                                                            {project.status || "Build"}
                                                        </span>
                                                    </div>

                                                    <h3 className={`mt-7 text-3xl font-black leading-tight tracking-[-0.03em] ${heading} ${isFeatured ? "sm:text-4xl" : "sm:text-3xl"}`}>
                                                        {project.title}
                                                    </h3>

                                                    <p className={`mt-4 max-w-xl text-sm leading-7 ${muted}`}>
                                                        {project.summary}
                                                    </p>

                                                    {displayTags.length > 0 && (
                                                        <div className="mt-6 flex flex-wrap gap-2">
                                                            {displayTags.slice(0, isFeatured ? 7 : 5).map((tag) => (
                                                                <span key={tag} className={`rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] ${tagClass}`}>
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-9 flex flex-wrap items-center gap-3 border-t border-slate-200/60 pt-6 dark:border-slate-800/70">
                                                    <a
                                                        href={`/projects/${project.slug}`}
                                                        className="group/link inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                                                    >
                                                        Case study
                                                        <ArrowUpRight className="h-3.5 w-3.5 transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                                    </a>

                                                    {hasLiveUrl ? (
                                                        <a
                                                            href={project.url!}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="group/link inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-sky-400"
                                                        >
                                                            Live demo
                                                            <ExternalLink className="h-3.5 w-3.5 transition group-hover/link:translate-x-0.5" />
                                                        </a>
                                                    ) : (
                                                        <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold ${tagClass}`}>
                                                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                                                            Not deployed yet
                                                        </span>
                                                    )}

                                                    {hasGithub && (
                                                        <a
                                                            href={project.githubUrl!}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition hover:-translate-y-0.5 ${secondaryButton}`}
                                                        >
                                                            <GithubIcon className="h-3.5 w-3.5" />
                                                            Source code
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </m.article>
                                );
                            })}
                        </div>
                    )}

                    {hasMoreProjects && (
                        <div className="mt-10 flex justify-center">
                            <m.button
                                type="button"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowAllProjects((current) => !current)}
                                className={`rounded-full border px-6 py-3 text-sm font-semibold transition ${secondaryButton}`}
                            >
                                {showAllProjects ? "Show less" : `Show all ${projects.length} projects`}
                            </m.button>
                        </div>
                    )}
                </div>
            </section>

            {/* =====================================================
                EXPERIENCE
            ====================================================== */}

            <section
                id="experience"
                className="scroll-mt-24 portfolio-deferred-section border-t border-slate-200/60 dark:border-slate-800/60"
            >
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
                    <m.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={sectionReveal}
                        className="max-w-3xl"
                    >
                        <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-500">Career</p>
                        <h2 className={`mt-3 text-3xl font-black tracking-[-0.04em] sm:text-5xl ${heading}`}>Experience</h2>
                        <p className={`mt-4 max-w-2xl text-sm leading-7 sm:text-base ${muted}`}>
                            A snapshot of the roles, products and engineering work that shaped my approach to building software.
                        </p>
                    </m.div>

                    {experienceList.length > 0 ? (
                        <div className="relative mt-12">
                            <div className="absolute bottom-4 left-[11px] top-4 hidden w-px bg-slate-200 dark:bg-slate-800 sm:block" />
                            <div className="space-y-6">
                                {experienceList.map((experience, index) => {
                                    const tags = parseTags(experience.technologies);
                                    return (
                                        <m.article
                                            key={experience.id}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, amount: 0.12 }}
                                            variants={cardReveal}
                                            transition={{ delay: index * 0.06 }}
                                            className={`relative rounded-[28px] border p-6 sm:ml-10 sm:p-8 ${softPanel}`}
                                        >
                                            <span className="absolute -left-[39px] top-8 hidden h-3 w-3 rounded-full border-4 border-sky-500 bg-white shadow-sm dark:bg-slate-950 sm:block" />
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-sky-500">
                                                        {experience.startDate} — {experience.current ? "Present" : experience.endDate || ""}
                                                    </p>
                                                    <h3 className={`mt-2 text-xl font-black tracking-[-0.025em] ${heading}`}>
                                                        {experience.position}
                                                    </h3>
                                                    <p className={`mt-1 text-sm font-semibold ${muted}`}>
                                                        {experience.company}{experience.location ? ` · ${experience.location}` : ""}
                                                    </p>
                                                </div>
                                                {experience.current && (
                                                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-300">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                            <p className={`mt-5 max-w-3xl text-sm leading-7 ${muted}`}>{experience.description}</p>
                                            {tags.length > 0 && (
                                                <div className="mt-6 flex flex-wrap gap-2">
                                                    {tags.map((tag) => (
                                                        <span key={tag} className={`rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] ${tagClass}`}>
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </m.article>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className={`mt-12 rounded-[28px] border p-8 ${softPanel}`}>
                            <p className={`text-sm ${muted}`}>Experience details are ready to be added from the portfolio admin.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* =====================================================
                EDUCATION
            ====================================================== */}

            <section
                id="education"
                className="scroll-mt-24 portfolio-deferred-section"
            >
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
                    <m.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={sectionReveal}
                        className="max-w-3xl"
                    >
                        <p className="text-xs font-black uppercase tracking-[0.24em] text-sky-500">Learning</p>
                        <h2 className={`mt-3 text-3xl font-black tracking-[-0.04em] sm:text-5xl ${heading}`}>Education</h2>
                        <p className={`mt-4 max-w-2xl text-sm leading-7 sm:text-base ${muted}`}>
                            Academic background and focused learning that support the way I design, engineer and ship digital products.
                        </p>
                    </m.div>

                    {educationList.length > 0 ? (
                        <div className="mt-12 grid gap-5 md:grid-cols-2">
                            {educationList.map((education, index) => (
                                <m.article
                                    key={education.id}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.12 }}
                                    variants={cardReveal}
                                    transition={{ delay: index * 0.06 }}
                                    className={`rounded-[28px] border p-7 sm:p-8 ${softPanel}`}
                                >
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-sky-500">
                                        {education.startDate || "Education"}{education.endDate ? ` — ${education.endDate}` : ""}
                                    </p>
                                    <h3 className={`mt-3 text-2xl font-black tracking-[-0.03em] ${heading}`}>{education.degree}</h3>
                                    <p className={`mt-2 text-sm font-semibold ${muted}`}>
                                        {education.institution}{education.field ? ` · ${education.field}` : ""}
                                    </p>
                                    {education.description && (
                                        <p className={`mt-5 text-sm leading-7 ${muted}`}>{education.description}</p>
                                    )}
                                </m.article>
                            ))}
                        </div>
                    ) : (
                        <div className={`mt-12 grid gap-5 md:grid-cols-[1.2fr_0.8fr]`}>
                            <div className={`rounded-[28px] border p-8 sm:p-10 ${softPanel}`}>
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-500/20">
                                    <BriefcaseBusiness className="h-5 w-5" />
                                </div>
                                <h3 className={`mt-6 text-2xl font-black tracking-[-0.03em] ${heading}`}>Education history</h3>
                                <p className={`mt-3 max-w-xl text-sm leading-7 ${muted}`}>
                                    Add degrees, certifications or formal training here when you are ready. The section is already wired into the landing page layout.
                                </p>
                            </div>
                            <div className={`rounded-[28px] border p-8 sm:p-10 ${isLight ? "border-sky-100 bg-sky-50/70" : "border-sky-400/20 bg-sky-500/5"}`}>
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-500">Continuous learning</p>
                                <p className={`mt-4 text-sm leading-7 ${muted}`}>
                                    Current learning is reflected throughout the portfolio through the technical stack, projects and AI product work.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* =====================================================
                AI ASSISTANT SHOWCASE
            ====================================================== */}

            <section className="portfolio-deferred-section relative overflow-hidden border-y border-slate-200/60 dark:border-slate-800/60">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(14,165,233,0.12),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(99,102,241,0.10),transparent_28%)]" />

                <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-24">
                    <m.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={sectionReveal}
                    >
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-10 bg-sky-500" />
                            <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-500">
                                Built into the portfolio
                            </p>
                        </div>

                        <h2 className={`max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.04em] sm:text-5xl ${heading}`}>
                            Don't just read my portfolio.
                            <br />
                            <span className="text-sky-500">Ask it.</span>
                        </h2>

                        <p className={`mt-5 max-w-2xl text-sm leading-7 sm:text-base ${muted}`}>
                            My AI portfolio assistant can help visitors explore my skills, projects, experience and the kind of products I build.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={openChat}
                                className="group inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-sky-500/15 transition hover:-translate-y-0.5 hover:bg-sky-400"
                            >
                                <Bot className="h-4 w-4" />
                                Start a conversation
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                            </button>
                        </div>
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, y: 24, rotate: 1 }}
                        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                        className={`senior-card relative overflow-hidden rounded-[28px] border p-5 shadow-2xl ${panel}`}
                    >
                        <div className="flex items-center gap-3 border-b border-slate-200/70 pb-4 dark:border-slate-800/70">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-500/20">
                                <Bot className="h-5 w-5" />
                            </div>
                            <div>
                                <p className={`text-sm font-black ${heading}`}>Portfolio AI</p>
                                <p className="text-xs text-emerald-500">Online · Ready to answer</p>
                            </div>
                        </div>

                        <div className="space-y-3 py-5">
                            <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-sky-500 px-4 py-3 text-sm font-medium text-slate-950">
                                What kind of products can you build?
                            </div>
                            <div className={`max-w-[88%] rounded-2xl rounded-bl-md border px-4 py-3 text-sm leading-6 ${softPanel}`}>
                                Full-stack web apps, SaaS dashboards, business platforms and AI-powered experiences — with a focus on usability, performance and maintainable architecture.
                            </div>
                        </div>

                        <div className={`rounded-2xl border px-4 py-3 text-xs ${tagClass}`}>
                            Try asking about projects, skills, architecture or experience →
                        </div>
                    </m.div>
                </div>
            </section>

            {/* =====================================================
                SERVICES
            ====================================================== */}

            <section
                id="services"
                className="scroll-mt-24 portfolio-deferred-section"
            >
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
                    <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                        <m.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                            variants={sectionReveal}
                        >
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-500">
                                What I can build
                            </p>

                            <h2
                                className={`
                                    mt-4
                                    text-4xl
                                    font-black
                                    tracking-tight
                                    sm:text-5xl
                                    ${heading}
                                `}
                            >
                                From idea
                                <br />
                                to production.
                            </h2>

                            <p
                                className={`
                                    mt-5
                                    max-w-md
                                    text-sm
                                    leading-7
                                    ${muted}
                                `}
                            >
                                I help businesses design,
                                build and improve digital
                                products that are useful,
                                fast and easy to maintain.
                            </p>

                            <a
                                href="#contact"
                                className="
                                    mt-7
                                    inline-flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-bold
                                    text-sky-500
                                    hover:text-sky-400
                                "
                            >
                                Discuss your project

                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </m.div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {services.map(
                                (
                                    service,
                                    index,
                                ) => {
                                    const Icon =
                                        service.icon;

                                    return (
                                        <m.article
                                            key={
                                                service.number
                                            }
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{
                                                once: true,
                                                amount: 0.15,
                                            }}
                                            variants={{
                                                ...cardReveal,
                                                visible:
                                                    {
                                                        opacity: 1,
                                                        y: 0,
                                                        transition:
                                                            {
                                                                duration:
                                                                    0.5,
                                                                delay:
                                                                    index *
                                                                    0.08,
                                                                ease: [
                                                                    0.16,
                                                                    1,
                                                                    0.3,
                                                                    1,
                                                                ] as const,
                                                            },
                                                    },
                                            }}
                                            whileHover={{
                                                y: -4,
                                            }}
                                            className={`
                                                group
                                                rounded-[26px]
                                                border
                                                p-6
                                                transition
                                                duration-300
                                                ${softPanel}
                                            `}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-black text-sky-500">
                                                    {
                                                        service.number
                                                    }
                                                </span>

                                                <m.div
                                                    whileHover={{
                                                        rotate: 5,
                                                        scale: 1.06,
                                                    }}
                                                    className={`
                                                        flex
                                                        h-10
                                                        w-10
                                                        items-center
                                                        justify-center
                                                        rounded-xl
                                                        ${
                                                            isLight
                                                                ? "bg-sky-50 text-sky-600"
                                                                : "bg-sky-500/10 text-sky-400"
                                                        }
                                                    `}
                                                >
                                                    <Icon className="h-4 w-4" />
                                                </m.div>
                                            </div>

                                            <h3
                                                className={`
                                                    mt-8
                                                    text-xl
                                                    font-bold
                                                    ${heading}
                                                `}
                                            >
                                                {
                                                    service.title
                                                }
                                            </h3>

                                            <p
                                                className={`
                                                    mt-3
                                                    text-sm
                                                    leading-6
                                                    ${muted}
                                                `}
                                            >
                                                {
                                                    service.text
                                                }
                                            </p>
                                        </m.article>
                                    );
                                },
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                STACK
            ====================================================== */}

            <section
                id="stack"
                className="scroll-mt-24 portfolio-deferred-section"
            >
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
                    <m.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.15,
                        }}
                        variants={sectionReveal}
                        className={`
                            overflow-hidden
                            rounded-[32px]
                            border
                            p-6
                            sm:p-8
                            sm:p-10
                            lg:p-12
                            ${panel}
                        `}
                    >
                        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-500">
                                    Engineering stack
                                </p>

                                <h2
                                    className={`
                                        mt-4
                                        text-3xl
                                        font-black
                                        tracking-tight
                                        sm:text-4xl
                                        ${heading}
                                    `}
                                >
                                    Tools that turn
                                    <br />
                                    ideas into products.
                                </h2>

                                <p
                                    className={`
                                        mt-4
                                        max-w-md
                                        text-sm
                                        leading-7
                                        ${muted}
                                    `}
                                >
                                    A modern, practical
                                    stack focused on
                                    maintainability,
                                    performance and great
                                    user experiences.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    {
                                        title: "Frontend",
                                        icon: Code2,
                                        items:
                                            groupedSkills.frontend,
                                    },
                                    {
                                        title: "Backend",
                                        icon: Server,
                                        items:
                                            groupedSkills.backend,
                                    },
                                    {
                                        title: "DataBase",
                                        icon: Database,
                                        items:
                                            groupedSkills.database,
                                    },
                                    {
                                        title: "AI & Automation",
                                        icon: Sparkles,
                                        items:
                                            groupedSkills.ai,
                                    },
                                    {
                                        title: "DevOps",
                                        icon: GitBranch,
                                        items:
                                            groupedSkills.devops,
                                    },
                                ].map(
                                    (
                                        group,
                                    ) => {
                                        const Icon =
                                            group.icon;

                                        return (
                                            <m.div
                                                key={
                                                    group.title
                                                }
                                                whileHover={{
                                                    y: -3,
                                                }}
                                                className={`
                                                    rounded-2xl
                                                    border
                                                    p-5
                                                    transition
                                                    ${softPanel}
                                                `}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Icon className="h-4 w-4 text-sky-500" />

                                                    <h3
                                                        className={`
                                                            text-sm
                                                            font-bold
                                                            ${heading}
                                                        `}
                                                    >
                                                        {
                                                            group.title
                                                        }
                                                    </h3>
                                                </div>

                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {group.items.map(
                                                        (
                                                            skill,
                                                        ) => (
                                                            <m.span
                                                                key={
                                                                    skill
                                                                }
                                                                whileHover={{
                                                                    y: -1,
                                                                }}
                                                                className={`
                                                                    rounded-full
                                                                    border
                                                                    px-3
                                                                    py-1.5
                                                                    text-[10px]
                                                                    font-medium
                                                                    ${tagClass}
                                                                `}
                                                            >
                                                                {
                                                                    skill
                                                                }
                                                            </m.span>
                                                        ),
                                                    )}
                                                </div>
                                            </m.div>
                                        );
                                    },
                                )}
                            </div>
                        </div>
                    </m.div>
                </div>
            </section>

            {/* =====================================================
                PHILOSOPHY
            ====================================================== */}

            <section>
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
                    <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:items-center">
                        <m.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                            variants={sectionReveal}
                        >
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-500">
                                How I work
                            </p>

                            <h2
                                className={`
                                    mt-4
                                    text-4xl
                                    font-black
                                    tracking-tight
                                    sm:text-5xl
                                    ${heading}
                                `}
                            >
                                Good software
                                <br />
                                starts with clarity.
                            </h2>

                            <p
                                className={`
                                    mt-5
                                    max-w-xl
                                    text-base
                                    leading-7
                                    ${muted}
                                `}
                            >
                                The goal isn't to write the
                                most code. It's to understand
                                the problem, design the right
                                solution and ship software
                                that creates lasting value.
                            </p>
                        </m.div>

                        <div className="space-y-3">
                            {[
                                {
                                    number: "01",
                                    title: "Business first",
                                    text:
                                        "Understand the goal before choosing the technology.",
                                },
                                {
                                    number: "02",
                                    title: "Clean engineering",
                                    text:
                                        "Build software that is reliable, maintainable and ready to grow.",
                                },
                                {
                                    number: "03",
                                    title: "Long-term thinking",
                                    text:
                                        "Create systems that continue working after launch.",
                                },
                            ].map(
                                (
                                    item,
                                    index,
                                ) => (
                                    <m.div
                                        key={
                                            item.number
                                        }
                                        initial={{
                                            opacity: 0,
                                            x: 20,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            x: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                            amount: 0.15,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            delay:
                                                index *
                                                0.08,
                                            ease: [
                                                0.16,
                                                1,
                                                0.3,
                                                1,
                                            ] as const,
                                        }}
                                        whileHover={{
                                            x: 4,
                                        }}
                                        className={`
                                            senior-card
                                            group
                                            flex
                                            gap-5
                                            rounded-2xl
                                            border
                                            p-5
                                            transition
                                            ${softPanel}
                                        `}
                                    >
                                        <span className="pt-1 text-xs font-black text-sky-500">
                                            {
                                                item.number
                                            }
                                        </span>

                                        <div>
                                            <h3
                                                className={`
                                                    font-bold
                                                    ${heading}
                                                `}
                                            >
                                                {
                                                    item.title
                                                }
                                            </h3>

                                            <p
                                                className={`
                                                    mt-1
                                                    text-sm
                                                    leading-6
                                                    ${muted}
                                                `}
                                            >
                                                {
                                                    item.text
                                                }
                                            </p>
                                        </div>
                                    </m.div>
                                ),
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                CONTACT
            ====================================================== */}

            <section
                id="contact"
                className="scroll-mt-24"
            >
                <div className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-12">
                    <m.div
                        initial={{
                            opacity: 0,
                            y: 24,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                        transition={{
                            duration: 0.7,
                            ease: [
                                0.16,
                                1,
                                0.3,
                                1,
                            ] as const,
                        }}
                        className="
                            relative
                            overflow-hidden
                            rounded-[36px]
                            border
                            border-sky-300/30
                            bg-gradient-to-br
                            from-sky-400
                            via-sky-500
                            to-blue-500
                            p-8
                            text-center
                            shadow-2xl
                            shadow-sky-500/10
                            sm:p-12
                            lg:p-16
                        "
                    >
                        {/* Atmospheric lights */}

                        <m.div
                            animate={{
                                x: [0, 20, 0],
                                y: [0, -15, 0],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                                absolute
                                -left-24
                                -top-24
                                h-72
                                w-72
                                rounded-full
                                bg-white/15
                                blur-3xl
                            "
                        />

                        <m.div
                            animate={{
                                x: [0, -20, 0],
                                y: [0, 15, 0],
                            }}
                            transition={{
                                duration: 9,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                                absolute
                                -bottom-24
                                -right-24
                                h-72
                                w-72
                                rounded-full
                                bg-blue-950/10
                                blur-3xl
                            "
                        />

                        {/* Fine grid */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                inset-0
                                opacity-[0.08]
                            "
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                                backgroundSize:
                                    "40px 40px",
                                maskImage:
                                    "linear-gradient(to bottom, black, transparent)",
                            }}
                        />

                        <div className="relative">
                            <m.div
                                whileHover={{
                                    scale: 1.05,
                                    rotate: -3,
                                }}
                                className="
                                    mx-auto
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-slate-950
                                    text-white
                                    shadow-xl
                                "
                            >
                                <Mail className="h-5 w-5" />
                            </m.div>

                            <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-slate-950/60">
                                {content?.ctaTitle || "Have an idea worth building?"}
                            </p>

                            <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                                {content?.ctaTitle || "Let's turn it into something remarkable."}
                            </h2>

                            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-950/70">
                            </p>

                            <m.a
                                href={profile.email ? `mailto:${profile.email}` : "#contact"}
                                whileHover={{
                                    y: -2,
                                    scale: 1.01,
                                }}
                                whileTap={{
                                    scale: 0.98,
                                }}
                                className="
                                    mt-8
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    bg-slate-950
                                    px-6
                                    py-3.5
                                    text-sm
                                    font-bold
                                    text-white
                                    shadow-xl
                                    transition
                                    hover:bg-slate-800
                                "
                            >
                                <Mail className="h-4 w-4" />

                                {content?.ctaPrimaryText || "Start a conversation"}

                                <ArrowRight className="h-4 w-4" />
                            </m.a>
                        </div>
                    </m.div>
                </div>
            </section>

            {/* =====================================================
                FOOTER
            ====================================================== */}

            <footer>
                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p
                            className={`
                                text-sm
                                font-bold
                                ${heading}
                            `}
                        >
                            {profile.name}
                        </p>

                        <p
                            className={`
                                mt-1
                                text-xs
                                ${muted}
                            `}
                        >
                            {profile.title}.
                        </p>
                    </div>

                    <div className="flex items-center gap-5">
                        {[
                            [
                                "Work",
                                "#work",
                            ],
                            [
                                "Services",
                                "#services",
                            ],
                            [
                                "Contact",
                                "#contact",
                            ],
                        ].map(
                            ([
                                label,
                                href,
                            ]) => (
                                <a
                                    key={
                                        href
                                    }
                                    href={
                                        href
                                    }
                                    className={`
                                        text-xs
                                        font-medium
                                        transition
                                        hover:text-sky-500
                                        ${muted}
                                    `}
                                >
                                    {
                                        label
                                    }
                                </a>
                            ),
                        )}

                        <a
                            href="/admin"
                            className={`
                                text-xs
                                font-medium
                                transition
                                hover:text-sky-500
                                ${muted}
                            `}
                        >
                            Admin
                        </a>
                    </div>
                </div>
            </footer>

            {/* =====================================================
                FLOATING CONTACT BUTTONS
            ====================================================== */}

            <div
                aria-label="Contact links"
                className="fixed bottom-24 left-2 top-auto z-[60] translate-y-0 sm:left-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2"
            >
                <m.div
                    aria-hidden="true"
                    animate={{ opacity: [0.35, 0.7, 0.35] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-sky-400/80 to-transparent ${isLight ? "" : "shadow-[0_0_18px_rgba(56,189,248,0.8)]"}`}
                />

                <div className="relative flex flex-col gap-3">
                    {profile.email && (
                        <a
                            href={`mailto:${profile.email}`}
                            aria-label="Email me on Gmail"
                            title="Gmail"
                            className="group flex h-14 w-14 items-center overflow-hidden rounded-full border border-white/20 bg-white/90 px-3 text-slate-800 shadow-[0_12px_35px_rgba(15,23,42,0.22)] backdrop-blur-xl transition-all duration-300 hover:w-44 hover:-translate-y-0.5 hover:border-red-300/70 hover:bg-white hover:shadow-[0_16px_40px_rgba(239,68,68,0.22)] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                        >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500/15 via-white to-red-500/10 text-red-500 ring-1 ring-red-200/70">
                                <Mail className="h-5 w-5" />
                            </span>
                            <span className="ml-3 min-w-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                <span className="block text-sm font-bold">Gmail</span>
                                <span className="block text-[10px] font-medium text-slate-500">Send me an email</span>
                            </span>
                        </a>
                    )}

                    {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER && (
                        <a
                            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Contact me on WhatsApp"
                            title="WhatsApp"
                            className="group flex h-14 w-14 items-center overflow-hidden rounded-full border border-emerald-300/40 bg-emerald-500 px-3 text-white shadow-[0_12px_35px_rgba(16,185,129,0.28)] transition-all duration-300 hover:w-44 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-[0_16px_40px_rgba(16,185,129,0.35)] focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                        >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
                                <MessageCircle className="h-5 w-5" />
                            </span>
                            <span className="ml-3 min-w-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                <span className="block text-sm font-bold">WhatsApp</span>
                                <span className="block text-[10px] font-medium text-emerald-50/90">Chat with me</span>
                            </span>
                        </a>
                    )}

                    {process.env.NEXT_PUBLIC_TELEGRAM_USERNAME && (
                        <a
                            href={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_USERNAME.replace(/^@/, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Message me on Telegram"
                            title="Telegram"
                            className="group flex h-14 w-14 items-center overflow-hidden rounded-full border border-sky-300/40 bg-sky-500 px-3 text-white shadow-[0_12px_35px_rgba(14,165,233,0.28)] transition-all duration-300 hover:w-44 hover:-translate-y-0.5 hover:bg-sky-400 hover:shadow-[0_16px_40px_rgba(14,165,233,0.35)] focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                        >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
                                <Send className="h-5 w-5 -translate-x-px" />
                            </span>
                            <span className="ml-3 min-w-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                <span className="block text-sm font-bold">Telegram</span>
                                <span className="block text-[10px] font-medium text-sky-50/90">Message me</span>
                            </span>
                        </a>
                    )}

                    {siteConfig.github && (
                        <a
                            href={siteConfig.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Visit my GitHub"
                            title="GitHub"
                            className="group flex h-14 w-14 items-center overflow-hidden rounded-full border border-slate-600/70 bg-slate-950/95 px-3 text-white shadow-[0_12px_35px_rgba(0,0,0,0.38)] backdrop-blur-xl transition-all duration-300 hover:w-44 hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                        >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                                <GithubIcon className="h-5 w-5" />
                            </span>
                            <span className="ml-3 min-w-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                <span className="block text-sm font-bold">GitHub</span>
                                <span className="block text-[10px] font-medium text-slate-400">View my code</span>
                            </span>
                        </a>
                    )}
                </div>
            </div>

            {/* =====================================================
                CHATBOT
            ====================================================== */}

            <PortfolioChatbot />
        </main>
        </>
        </LazyMotion>
    );
}

export default PortfolioLanding;