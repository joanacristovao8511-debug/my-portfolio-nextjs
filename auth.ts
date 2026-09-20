import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { runtimeEnv } from "@/lib/runtime-env";

import { ensureDatabase, prisma } from "@/lib/db";
import {
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    ADMIN_NAME,
    hasValidBootstrapAdminConfig,
} from "@/lib/admin";

/*
 * ---------------------------------------------------------
 * AUTHENTICATION
 * ---------------------------------------------------------
 *
 * Authentication:
 *   NextAuth Credentials
 *
 * Session:
 *   JWT
 *
 * Password:
 *   bcrypt
 *
 * The environment credentials are used as a bootstrap
 * account when the database does not yet contain the
 * administrator.
 * ---------------------------------------------------------
 */


const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

async function authenticateAdmin(
    admin: Awaited<ReturnType<typeof prisma.adminUser.findUnique>>,
    password: string,
) {
    if (!admin) return null;

    if (admin.role.toLowerCase() !== "admin" || admin.status.toLowerCase() !== "active") {
        return null;
    }

    if (admin.lockedUntil && admin.lockedUntil > new Date()) {
        return null;
    }

    if (admin.lockedUntil && admin.lockedUntil <= new Date()) {
        await prisma.adminUser.update({
            where: { id: admin.id },
            data: { lockedUntil: null, failedLoginCount: 0 },
        });
    }

    const passwordMatches = await bcrypt.compare(password, admin.passwordHash);

    if (!passwordMatches) {
        const nextFailedCount = admin.failedLoginCount + 1;
        const shouldLock = nextFailedCount >= MAX_FAILED_ATTEMPTS;

        await prisma.adminUser.update({
            where: { id: admin.id },
            data: {
                failedLoginCount: nextFailedCount,
                lastFailedLoginAt: new Date(),
                ...(shouldLock
                    ? {
                          lockedUntil: new Date(
                              Date.now() + LOCKOUT_MINUTES * 60 * 1000,
                          ),
                      }
                    : {}),
            },
        });

        return null;
    }

    await prisma.adminUser.update({
        where: { id: admin.id },
        data: {
            failedLoginCount: 0,
            lastFailedLoginAt: null,
            lockedUntil: null,
            lastLoginAt: new Date(),
        },
    });

    return {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
    };
}

export const {
    handlers,
    signIn,
    signOut,
    auth,
} = NextAuth({
    secret: runtimeEnv().AUTH_SECRET,

    session: {
        strategy: "jwt",
        maxAge: 8 * 60 * 60,
        updateAge: 60 * 60,
    },

    pages: {
        signIn: "/admin/login",
    },

    providers: [
        Credentials({
            name: "Admin credentials",

            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "admin@example.com",
                },

                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const email = String(credentials.email).trim().toLowerCase();
                const password = String(credentials.password);

                if (!email || !password || password.length > 1024) {
                    return null;
                }

                try {
                    await ensureDatabase();

                    const existingAdmin = await prisma.adminUser.findUnique({
                        where: { email },
                    });

                    /*
                     * Bootstrap is intentionally allowed only when this email
                     * does not already exist. Once a database account exists,
                     * authentication must use its bcrypt hash and its security
                     * state. This prevents the environment password from
                     * bypassing lockouts, disabled accounts, or password changes.
                     */
                    if (!existingAdmin) {
                        const isBootstrapAdmin =
                            hasValidBootstrapAdminConfig() &&
                            email === ADMIN_EMAIL &&
                            password === ADMIN_PASSWORD;

                        if (!isBootstrapAdmin) {
                            return null;
                        }

                        const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

                        try {
                            const admin = await prisma.adminUser.create({
                                data: {
                                    name: ADMIN_NAME,
                                    email: ADMIN_EMAIL,
                                    passwordHash,
                                    role: "admin",
                                    status: "active",
                                },
                            });

                            return {
                                id: admin.id,
                                name: admin.name,
                                email: admin.email,
                                role: admin.role,
                            };
                        } catch (error) {
                            /*
                             * Two first-login requests can race. If another
                             * request won the unique email constraint, reload
                             * the account and continue through normal auth.
                             */
                            const racedAdmin = await prisma.adminUser.findUnique({
                                where: { email },
                            });

                            if (!racedAdmin) {
                                console.error("Bootstrap admin creation failed:", error);
                                return null;
                            }

                            return await authenticateAdmin(racedAdmin, password);
                        }
                    }

                    return await authenticateAdmin(existingAdmin, password);
                } catch (error) {
                    console.error("Admin authentication error:", error);
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        /*
         * -------------------------------------------------------
         * JWT
         * -------------------------------------------------------
         *
         * Store the administrator role inside the JWT.
         */

        async jwt({ token, user }) {
            if (user) {
                const role =
                    "role" in user &&
                    typeof user.role === "string"
                        ? user.role
                        : undefined;

                if (role) {
                    token.role = role;
                }
            }

            return token;
        },

        /*
         * -------------------------------------------------------
         * SESSION
         * -------------------------------------------------------
         *
         * Expose id + role to the application.
         */

        async session({ session, token }) {
            if (session.user) {
                session.user.id =
                    typeof token.sub === "string"
                        ? token.sub
                        : "";

                const user = session.user as typeof session.user & {
                    role?: string;
                };

                user.role =
                    typeof token.role === "string"
                        ? token.role
                        : "";
            }

            return session;
        },
    },
});