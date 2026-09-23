import {
    PrismaClient,
} from "@prisma/client";

import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting portfolio database seed...");

    /*
     * =========================================================
     * ADMIN
     * =========================================================
     */

    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        throw new Error(
            "ADMIN_EMAIL and ADMIN_PASSWORD must be set before running the database seed.",
        );
    }

    if (adminPassword.length < 12) {
        throw new Error(
            "ADMIN_PASSWORD must be at least 12 characters long.",
        );
    }

    const adminName =
        process.env.ADMIN_NAME?.trim() || "Portfolio Admin";

    const passwordHash = await bcrypt.hash(
        adminPassword,
        12,
    );

    const admin = await prisma.adminUser.upsert({
        where: {
            email: adminEmail,
        },

        update: {
            name: adminName,
            passwordHash,
            role: "admin",
        },

        create: {
            name: adminName,
            email: adminEmail,
            passwordHash,
            role: "admin",
        },
    });

    console.log(
        `✓ Admin: ${admin.email}`,
    );

    /*
     * =========================================================
     * PROFILE
     * =========================================================
     *
     * Profile has no unique business field other than id.
     * We intentionally use id = 1 so the seed remains
     * deterministic and SQLite-safe.
     */

    const profile = await prisma.profile.upsert({
        where: {
            id: 1,
        },

        update: {
            name: "Frunco Ruiz",

            title:
                "Full-Stack Developer & AI Product Builder",

            headline:
                "Building intelligent digital products with Full-Stack + AI.",

            bio:
                "Full-stack developer and product builder creating polished web applications, business platforms and AI-powered experiences with a strong focus on usability, performance and maintainable engineering.",

            email:
                "azulrio906top@gmail.com",

            location:
                "United States",

            summary:
                "I build intelligent digital products with Full-Stack + AI, combining frontend architecture, backend systems, APIs, databases, authentication, AI integrations and product-focused UX.",

            availability:
                "Available for selected freelance projects",
        },

        create: {
            id: 1,

            name: "Frunco Ruiz",

            title:
                "Full-Stack Developer & AI Product Builder",

            headline:
                "Building intelligent digital products with Full-Stack + AI.",

            bio:
                "Full-stack developer and product builder creating polished web applications, business platforms and AI-powered experiences with a strong focus on usability, performance and maintainable engineering.",

            email:
                "azulrio906top@gmail.com",

            location:
                "United States",

            summary:
                "I build intelligent digital products with Full-Stack + AI, combining frontend architecture, backend systems, APIs, databases, authentication, AI integrations and product-focused UX.",

            availability:
                "Available for selected freelance projects",
        },
    });

    console.log(
        `✓ Profile: ${profile.name}`,
    );

    /*
     * =========================================================
     * SKILLS
     * =========================================================
     */

    const skills = [
        /*
         * Frontend
         */
        {
            name: "React",
            category: "frontend",
            order: 1,
        },
        {
            name: "Next.js",
            category: "frontend",
            order: 2,
        },
        {
            name: "TypeScript",
            category: "frontend",
            order: 3,
        },
        {
            name: "JavaScript",
            category: "frontend",
            order: 4,
        },
        {
            name: "Tailwind CSS",
            category: "frontend",
            order: 5,
        },
        {
            name: "Zustand",
            category: "frontend",
            order: 6,
        },
        {
            name: "HTML5",
            category: "frontend",
            order: 7,
        },
        {
            name: "CSS3",
            category: "frontend",
            order: 8,
        },

        /*
         * Backend
         */
        {
            name: "Node.js",
            category: "backend",
            order: 1,
        },
        {
            name: "Express",
            category: "backend",
            order: 2,
        },
        {
            name: "REST APIs",
            category: "backend",
            order: 3,
        },
        {
            name: "Authentication",
            category: "backend",
            order: 4,
        },
        {
            name: "NextAuth",
            category: "backend",
            order: 5,
        },

        /*
         * Data
         */
        {
            name: "PostgreSQL",
            category: "database",
            order: 1,
        },
        {
            name: "SQLite",
            category: "database",
            order: 2,
        },
        {
            name: "MongoDB",
            category: "database",
            order: 3,
        },
        {
            name: "Prisma",
            category: "database",
            order: 4,
        },
        {
            name: "Redis",
            category: "database",
            order: 5,
        },

        /*
         * AI
         */
        {
            name: "Generative AI",
            category: "ai",
            order: 1,
        },
        {
            name: "RAG",
            category: "ai",
            order: 2,
        },
        {
            name: "AI Agent",
            category: "ai",
            order: 3,
        },
        {
            name: "AI Integration",
            category: "ai",
            order: 4,
        },
        {
            name: "AI Assistants",
            category: "ai",
            order: 5,
        },
        {
            name: "OpenAI",
            category: "ai",
            order: 6,
        },
        {
            name: "LLM Integration",
            category: "ai",
            order: 7,
        },
        {
            name: "AI Automation",
            category: "ai",
            order: 8,
        },

        /*
         * DevOps
         */
        {
            name: "Git",
            category: "devops",
            order: 1,
        },
        {
            name: "GitHub",
            category: "devops",
            order: 2,
        },
        {
            name: "Docker",
            category: "devops",
            order: 3,
        },
        {
            name: "Vitest",
            category: "devops",
            order: 4,
        },
    ];

    for (const skill of skills) {
        await prisma.skill.upsert({
            where: {
                name: skill.name,
            },

            update: {
                category: skill.category,
                order: skill.order,
            },

            create: {
                name: skill.name,
                category: skill.category,
                order: skill.order,
            },
        });
    }

    console.log(
        `✓ Skills: ${skills.length}`,
    );

    /*
     * =========================================================
     * PROJECTS
     * =========================================================
     *
     * slug is unique, so it is the ideal SQLite-safe
     * upsert key.
     */

    const projects = [
        {
            title: "AI Workflow Automation",
            slug: "ai-workflow-automation",
            summary: "An automation system that combines AI capabilities with structured business workflows.",
            description: "An AI-assisted workflow application designed to reduce repetitive manual tasks by connecting structured application data with intelligent processing and automation flows while keeping the user experience simple.",
            url: null,
            githubUrl: null,
            imageUrl: "/projects/ai-workflow-automation.png",
            featured: true,
            status: "active",
            tags: "AI, Automation, Node.js, APIs, TypeScript",
        },
        {
            title: "Retrieval-Augmented Generation",
            slug: "retrieval-augmented-generation",
            summary: "Production-ready RAG system with enterprise-grade architecture.",
            description: "A retrieval-augmented generation application focused on grounding AI responses with relevant source context and a production-minded architecture.",
            url: "https://rag-app.bhaveshg.dev",
            githubUrl: null,
            imageUrl: "/projects/rag2.png",
            featured: true,
            status: "active",
            tags: "Tailwind CSS, TypeScript, Next.js, React, RAG",
        },
        {
            title: "Developer Portfolio CMS",
            slug: "developer-portfolio-cms",
            summary: "A content-driven developer portfolio with project management, skills, experience and an admin dashboard.",
            description: "A database-driven portfolio platform with project, skill, experience and profile management, backed by an authenticated admin dashboard and modern full-stack architecture.",
            url: null,
            githubUrl: null,
            imageUrl: "/projects/portfolio.png",
            featured: true,
            status: "active",
            tags: "Next.js, Prisma, PostgreSQL, OpenAI, Vercel",
        },
        {
            title: "Business Management Platform",
            slug: "business-management-platform",
            summary: "A full-stack business application for managing customers, workflows, records and day-to-day operations.",
            description: "A practical business management platform focused on centralizing operational information and improving day-to-day workflows through structured data, responsive interfaces and production-minded full-stack engineering.",
            url: "https://nellavio.com",
            githubUrl: null,
            imageUrl: "/projects/business-management-platform.png",
            featured: false,
            status: "active",
            tags: "Next.js, TailwindCSS, OpenGraph, Tubopack, Vercel",
        },
        {
            title: "SaaS Analytics Dashboard",
            slug: "saas-analytics-dashboard",
            summary: "A modern analytics dashboard for monitoring business performance, users, revenue and operational metrics.",
            description: "A responsive SaaS dashboard designed around information hierarchy, reusable data visualization patterns and fast decision-making.",
            url: null,
            githubUrl: null,
            imageUrl: "/projects/saas_dashboard.png",
            featured: false,
            status: "active",
            tags: "React, Next.js, TypeScript, Tailwind CSS, SaaS, Dashboard",
        },
        {
            title: "AI-Powered Portfolio Assistant",
            slug: "ai-portfolio-assistant",
            summary: "A conversational AI assistant that helps visitors explore skills, projects, experience and services naturally.",
            description: "An AI assistant integrated into the portfolio with contextual portfolio knowledge, conversation history, suggested questions and an API-driven conversation layer.",
            url: null,
            githubUrl: null,
            imageUrl: "/ai-assistant.svg",
            featured: false,
            status: "active",
            tags: "Next.js, React, TypeScript, OpenAI, AI, Tailwind CSS",
        },
    ];

    for (const project of projects) {
        await prisma.project.upsert({
            where: {
                slug: project.slug,
            },

            update: {
                title: project.title,
                summary: project.summary,
                description:
                    project.description,
                url: project.url,
                githubUrl:
                    project.githubUrl,
                imageUrl:
                    project.imageUrl,
                featured:
                    project.featured,
                status:
                    project.status,
                tags:
                    project.tags,
            },

            create: {
                title: project.title,
                slug: project.slug,
                summary: project.summary,
                description:
                    project.description,
                url: project.url,
                githubUrl:
                    project.githubUrl,
                imageUrl:
                    project.imageUrl,
                featured:
                    project.featured,
                status:
                    project.status,
                tags:
                    project.tags,
            },
        });
    }

    console.log(
        `✓ Projects: ${projects.length}`,
    );

    /*
     * =========================================================
     * EXPERIENCE
     * =========================================================
     *
     * IMPORTANT:
     *
     * startDate and endDate are Strings in your schema.
     *
     * Therefore:
     *
     *     "2023-01"
     *
     * NOT:
     *
     *     new Date(...)
     *
     * This avoids the Date -> String TypeScript error.
     */

    const experiences = [
        {
            name: "Full-Stack Developer & AI Product Engineer",
            company: "Independent / Freelance",
            position: "Full-Stack Developer & AI Product Engineer",
            location: "Remote",
            startDate: "2023-05",
            endDate: null,
            description: "Leading end-to-end development of AI-powered applications and modern web platforms, spanning frontend architecture, backend services, API design, database systems, authentication, and AI/LLM integrations. Focused on building scalable product foundations, intelligent workflows, and polished user experiences from prototype to production.",
            technologies: "React, Next.js, TypeScript, Node.js, Express, PostgreSQL, Prisma, Tailwind CSS, OpenAI, RAG, AI Agents, AI Automation",
            current: true,
        },
        {
            name: "Senior Full-Stack Developer",
            company: "Product Development",
            position: "Senior Full-Stack Developer",
            location: "Remote",
            startDate: "2021-01",
            endDate: "2022-04",
            description: "Led development of modern web platforms and internal business applications across frontend and backend systems. Built reusable component architectures, REST APIs, database-driven workflows, authentication systems, and responsive interfaces while collaborating closely with product and design requirements.",
            technologies: "React, Next.js, TypeScript, Node.js, Express, REST APIs, PostgreSQL, Git",
            current: false,
        },
        {
            name: "Frontend Developer",
            company: "Software Development",
            position: "Frontend Developer",
            location: "Remote",
            startDate: "2019-01",
            endDate: "2020-12",
            description: "Developed and maintained responsive, production-grade web interfaces using modern JavaScript frameworks and component-based architectures. Focused on reusable UI systems, performance, accessibility, responsive design, and translating product requirements into polished user experiences.",
            technologies: "React, JavaScript, HTML5, CSS3, Git",
            current: false,
        },
    ];

    /*
     * Experience does not have a unique field in the
     * current schema.
     *
     * We therefore use a deterministic lookup before
     * creating records rather than relying on an unsafe
     * generated id.
     */

    for (const experience of experiences) {
        const existing =
            await prisma.experience.findFirst({
                where: {
                    company:
                        experience.company,

                    position:
                        experience.position,

                    startDate:
                        experience.startDate,
                },
            });

        if (existing) {
            await prisma.experience.update({
                where: {
                    id: existing.id,
                },

                data: {
                    name:
                        experience.name,

                    location:
                        experience.location ?? null,

                    endDate:
                        experience.endDate,

                    description:
                        experience.description,

                    technologies:
                        experience.technologies,

                    current:
                        experience.current,
                },
            });
        } else {
            await prisma.experience.create({
                data: {
                    name:
                        experience.name,

                    company:
                        experience.company,

                    location:
                        experience.location ?? null,

                    position:
                        experience.position,

                    startDate:
                        experience.startDate,

                    endDate:
                        experience.endDate,

                    description:
                        experience.description,

                    technologies:
                        experience.technologies,

                    current:
                        experience.current,
                },
            });
        }
    }

    console.log(
        `✓ Experience: ${experiences.length}`,
    );

    /*
     * =========================================================
     * FINAL SUMMARY
     * =========================================================
     */

    const [
        skillCount,
        projectCount,
        experienceCount,
        adminCount,
        profileCount,
    ] = await Promise.all([
        prisma.skill.count(),
        prisma.project.count(),
        prisma.experience.count(),
        prisma.adminUser.count(),
        prisma.profile.count(),
    ]);

    console.log("");
    console.log(
        "========================================",
    );
    console.log(
        "🌱 Portfolio seed completed successfully",
    );
    console.log(
        "========================================",
    );
    console.log(
        `Profile:     ${profileCount}`,
    );
    console.log(
        `Skills:      ${skillCount}`,
    );
    console.log(
        `Projects:    ${projectCount}`,
    );
    console.log(
        `Experience:  ${experienceCount}`,
    );
    console.log(
        `Admins:      ${adminCount}`,
    );
    console.log(
        "========================================",
    );
}

main()
    .catch((error) => {
        console.error(
            "❌ Portfolio seed failed:",
            error,
        );

        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });