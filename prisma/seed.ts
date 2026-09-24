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
                "Full-stack developer & AI product builder",

            headline:
                "I build AI-powered products that turn business workflows into software.",

            bio:
                "Full-stack developer specializing in SaaS, business platforms, automation and AI integrations—from architecture to production.",

            email:
                "joanacristovao8511@gmail.com",

            location:
                "United States",

            summary:
                "I turn ambiguous product requirements into shipped, maintainable software.",

            availability:
                "Available for selected freelance projects",
        },

        create: {
            id: 1,

            name: "Frunco Ruiz",

            title:
                "Full-stack developer & AI product builder",

            headline:
                "I build AI-powered products that turn business workflows into software.",

            bio:
                "Full-stack developer specializing in SaaS, business platforms, automation and AI integrations—from architecture to production.",

            email:
                "joanacristovao8511@gmail.com",

            location:
                "United States",

            summary:
                "I turn ambiguous product requirements into shipped, maintainable software.",

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
        // Frontend
        { name: "React", category: "frontend", order: 1 },
        { name: "Next.js", category: "frontend", order: 2 },
        { name: "TypeScript", category: "frontend", order: 3 },
        { name: "Tailwind CSS", category: "frontend", order: 4 },

        // Backend
        { name: "Node.js", category: "backend", order: 1 },
        { name: "Express", category: "backend", order: 2 },
        { name: "REST APIs", category: "backend", order: 3 },
        { name: "Authentication", category: "backend", order: 4 },
        { name: "NextAuth", category: "backend", order: 5 },

        // Database
        { name: "PostgreSQL", category: "database", order: 1 },
        { name: "MongoDB", category: "database", order: 2 },
        { name: "Prisma", category: "database", order: 3 },
        { name: "Redis", category: "database", order: 4 },

        // AI & Automation
        { name: "RAG", category: "ai", order: 1 },
        { name: "AI Agent", category: "ai", order: 2 },
        { name: "Generative AI", category: "ai", order: 3 },
        { name: "AI Integration", category: "ai", order: 4 },
        { name: "AI Assistants", category: "ai", order: 5 },
        { name: "OpenAI", category: "ai", order: 6 },
        { name: "LLM Integration", category: "ai", order: 7 },
        { name: "AI Automation", category: "ai", order: 8 },

        // DevOps
        { name: "Git", category: "devops", order: 1 },
        { name: "GitHub", category: "devops", order: 2 },
        { name: "Docker", category: "devops", order: 3 },
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
            summary: "AI-assisted workflow application for turning repetitive business tasks into configurable workflows.",
            description: "Built the workflow UI, application logic, data models, authentication, and AI integrations. The system lets users configure workflow steps, provide inputs, and use AI-powered processing as part of the workflow.",
            challenge: "Turn repetitive business tasks into configurable workflows without making the experience feel complex.",
            solution: "A structured workflow builder with configurable steps, inputs, authentication, persistent data and AI-powered processing.",
            architecture: "Next.js application with TypeScript, PostgreSQL, Prisma, authentication and OpenAI integration.",
            role: "I handled the full-stack implementation, including the frontend, backend logic, database design, authentication, workflow functionality, and AI integration.",
            impact: "Creates a reusable foundation for automating repetitive business workflows with AI-assisted processing.",
            category: "AI",
            url: null,
            githubUrl: null,
            imageUrl: "/projects/ai-workflow-automation.png",
            featured: true,
            status: "active",
            tags: "Next.js, TypeScript, PostgreSQL, Prisma, OpenAI",
        },
        {
            title: "Retrieval-Augmented Generation",
            slug: "retrieval-augmented-generation",
            summary: "Document-based question-answering application that uses retrieved context to answer questions about a private knowledge base.",
            description: "Built the application interface, document/knowledge workflow, conversational experience, and LLM integration. Responses are generated from retrieved context rather than relying only on the model's general knowledge.",
            challenge: "Make answers about private documents more grounded and useful than relying only on a model's general knowledge.",
            solution: "A conversational RAG workflow that retrieves relevant knowledge before generating an answer.",
            architecture: "Next.js and TypeScript application with PostgreSQL, OpenAI and retrieval-focused application logic.",
            role: "I built the application end to end, including the frontend, data flow, retrieval workflow, AI integration, conversational UI, and supporting application logic.",
            impact: "Provides a practical interface for asking questions against a private knowledge base with retrieved context.",
            category: "AI",
            url: "https://rag-app.bhaveshg.dev",
            githubUrl: null,
            imageUrl: "/projects/rag2.png",
            featured: false,
            status: "active",
            tags: "Tailwind CSS, TypeScript, Next.js, React, RAG",
        },
        {
            title: "Business Management Platform",
            slug: "business-management-platform",
            summary: "A full-stack business application for managing customers, workflows, records and day-to-day operations.",
            description: "A practical business management platform focused on centralizing operational information and improving day-to-day workflows through structured data, responsive interfaces and production-minded full-stack engineering.",
            challenge: "Centralize operational information and simplify recurring business workflows.",
            solution: "A responsive full-stack business platform built around structured records, workflows and operational interfaces.",
            architecture: "Next.js application with Tailwind CSS, API-driven workflows and Vercel deployment.",
            role: "I handled the product implementation across the interface, application logic and operational workflows.",
            impact: "Brings recurring business operations into a single structured application experience.",
            category: "Full-Stack",
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
            challenge: "Present operational and business metrics clearly enough to support fast decisions.",
            solution: "A responsive analytics interface with reusable dashboard patterns and a clear information hierarchy.",
            architecture: "React and Next.js with TypeScript and Tailwind CSS.",
            role: "I designed and implemented the dashboard interface, reusable UI patterns and data-focused presentation layer.",
            impact: "Turns business metrics into a focused interface for monitoring performance and operational signals.",
            category: "SaaS",
            url: null,
            githubUrl: null,
            imageUrl: "/projects/saas_dashboard.png",
            featured: false,
            status: "active",
            tags: "React, Next.js, TypeScript, Tailwind CSS, SaaS, Dashboard",
        },
	{
            title: "Developer Portfolio CMS",
            slug: "developer-portfolio-cms",
            summary: "Content management system for managing portfolio projects and site content without editing the application directly.",
            description: "Built the CMS interface, content models, CRUD workflows, validation, and integration with the portfolio frontend. The project separates editable content from the presentation layer.",
            challenge: "Separate editable portfolio content from the application presentation layer so the site can be maintained without changing frontend code.",
            solution: "An authenticated CMS with structured content models, CRUD workflows, validation and a database-backed portfolio frontend.",
            architecture: "Next.js, Tailwind CSS, PostgreSQL, Prisma ORM, Neon and Vercel.",
            role: "I designed and implemented the CMS, including the content models, database layer, CRUD functionality, validation, management UI, and connection between the CMS and portfolio frontend.",
            impact: "Makes portfolio content maintainable through a dedicated management workflow instead of direct code edits.",
            category: "CMS",
            url: null,
            githubUrl: null,
            imageUrl: "/projects/portfolio.png",
            featured: false,
            status: "active",
            tags: "Next.js, TailwindCSS, PostgreSQL, Prisma ORM, Neon, Vercel",
        },
        {
            title: "AI-Powered Portfolio Assistant",
            slug: "ai-portfolio-assistant",
            summary: "A conversational AI assistant that helps visitors explore skills, projects, experience and services naturally.",
            description: "An AI assistant integrated into the portfolio with contextual portfolio knowledge, conversation history, suggested questions and an API-driven conversation layer.",
            challenge: "Let visitors explore portfolio information conversationally instead of relying only on static navigation.",
            solution: "A portfolio-aware AI assistant with contextual knowledge, conversation history and an API-driven chat experience.",
            architecture: "Next.js, React, TypeScript and OpenAI integrated into the portfolio application.",
            role: "I implemented the conversational interface, portfolio context layer and API-driven AI experience.",
            impact: "Gives visitors a natural way to discover projects, skills, experience and services.",
            category: "AI",
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
                challenge:
                    project.challenge,
                solution:
                    project.solution,
                architecture:
                    project.architecture,
                role:
                    project.role,
                impact:
                    project.impact,
                category:
                    project.category,
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
                challenge:
                    project.challenge,
                solution:
                    project.solution,
                architecture:
                    project.architecture,
                role:
                    project.role,
                impact:
                    project.impact,
                category:
                    project.category,
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
     * SITE CONTENT
     * =========================================================
     * Mirrors the public portfolio copy and service positioning.
     */

    const siteContent = await prisma.siteContent.upsert({
        where: { id: 1 },
        update: {
            heroBadge: "Full-stack developer & AI product builder",
            heroTitle: "I build AI-powered web products that turn business workflows into software.",
            heroDescription: "Full-stack developer specializing in SaaS, business platforms, automation and AI integrations—from architecture to production.",
            aboutTitle: "Don't just read my portfolio. Ask it.",
            aboutText: "My AI portfolio assistant can help visitors explore my skills, projects, experience and the kind of products I build.",
            services: [
                { title: "Launch a new product", description: "Turn an idea into a polished web application designed around real users, clear workflows and measurable business goals." },
                { title: "Modernize an existing app", description: "Improve performance, UX, architecture and maintainability without throwing away the parts that already work." },
                { title: "Business dashboards", description: "Build focused internal tools, reporting systems and workflow applications that help teams move faster and make better decisions." },
                { title: "AI-powered experiences", description: "Add practical AI assistants, intelligent search, RAG and automation where they create useful product value." },
            ],
            whyTitle: "Good software starts with clarity.",
            whyItems: [
                { title: "Discover the real problem", description: "Align on users, constraints, success criteria and the smallest version worth shipping." },
                { title: "Design the system", description: "Choose the architecture, data model, and UX around the product — not the other way around." },
                { title: "Build in vertical slices", description: "Ship working slices early, validate assumptions, and keep the system easy to change as we learn." },
                { title: "Harden before launch", description: "Test critical paths, improve performance, document key decisions, and leave the product ready to operate and extend." },
            ],
            ctaTitle: "Let's turn it into something remarkable.",
            ctaDescription: "Have an idea worth building? Let's turn it into something remarkable.",
            ctaPrimaryText: "Start a conversation",
            ctaSecondaryText: "See my work",
        },
        create: {
            id: 1,
            heroBadge: "Full-stack developer & AI product builder",
            heroTitle: "I build AI-powered web products that turn business workflows into software.",
            heroDescription: "Full-stack developer specializing in SaaS, business platforms, automation and AI integrations—from architecture to production.",
            aboutTitle: "Don't just read my portfolio. Ask it.",
            aboutText: "My AI portfolio assistant can help visitors explore my skills, projects, experience and the kind of products I build.",
            services: [
                { title: "Launch a new product", description: "Turn an idea into a polished web application designed around real users, clear workflows and measurable business goals." },
                { title: "Modernize an existing app", description: "Improve performance, UX, architecture and maintainability without throwing away the parts that already work." },
                { title: "Business dashboards", description: "Build focused internal tools, reporting systems and workflow applications that help teams move faster and make better decisions." },
                { title: "AI-powered experiences", description: "Add practical AI assistants, intelligent search, RAG and automation where they create useful product value." },
            ],
            whyTitle: "Good software starts with clarity.",
            whyItems: [
                { title: "Discover the real problem", description: "Align on users, constraints, success criteria and the smallest version worth shipping." },
                { title: "Design the system", description: "Choose the architecture, data model, and UX around the product — not the other way around." },
                { title: "Build in vertical slices", description: "Ship working slices early, validate assumptions, and keep the system easy to change as we learn." },
                { title: "Harden before launch", description: "Test critical paths, improve performance, document key decisions, and leave the product ready to operate and extend." },
            ],
            ctaTitle: "Let's turn it into something remarkable.",
            ctaDescription: "Have an idea worth building? Let's turn it into something remarkable.",
            ctaPrimaryText: "Start a conversation",
            ctaSecondaryText: "See my work",
        },
    });

    console.log(`✓ Site content: ${siteContent.id}`);

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
            name: "Full-stack developer & AI product builder",
            company: "Independent / Freelance",
            position: "Full-stack developer & AI product builder",
            location: "Remote",
            startDate: "2023-05",
            endDate: null,
            description: "Leading end-to-end development of AI-powered applications and modern web platforms, spanning frontend architecture, backend services, API design, database systems, authentication, and AI/LLM integrations. Focused on building scalable product foundations, intelligent workflows, and polished user experiences from prototype to production.",
            technologies: "React, Next.js, TypeScript, Node.js, Express, PostgreSQL, Prisma, Tailwind CSS, OpenAI, RAG, AI Agents, AI Automation",
            current: true,
        },
        {
            name: "Senior Full-stack developer",
            company: "Product Development",
            position: "Senior Full-stack developer",
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