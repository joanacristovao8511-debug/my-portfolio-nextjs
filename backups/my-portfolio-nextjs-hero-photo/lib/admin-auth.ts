import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export type AdminSession = {
    user: {
        id?: string;
        name?: string | null;
        email?: string | null;
        role?: string;
    };
};

/**
 * Authoritative server-side admin authorization.
 *
 * The JWT is used for the fast route gate, but privileged server
 * actions re-check the current database record so a disabled,
 * locked, or demoted administrator cannot keep access solely
 * because an older token still contains role=admin.
 */
export async function requireAdmin(): Promise<
    | {
          authorized: true;
          session: AdminSession;
      }
    | {
          authorized: false;
          status: 401 | 403;
          error: string;
      }
> {
    const session = await auth();

    if (!session?.user) {
        return {
            authorized: false,
            status: 401,
            error: "Authentication required.",
        };
    }

    const userId =
        typeof session.user.id === "string"
            ? session.user.id
            : typeof session.user.email === "string"
              ? session.user.email
              : "";

    if (!userId) {
        return {
            authorized: false,
            status: 401,
            error: "Authentication required.",
        };
    }

    try {
        const admin = await prisma.adminUser.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                lockedUntil: true,
            },
        });

        if (!admin) {
            return {
                authorized: false,
                status: 401,
                error: "Authentication required.",
            };
        }

        if (admin.role.toLowerCase() !== "admin") {
            return {
                authorized: false,
                status: 403,
                error: "Administrator access required.",
            };
        }

        if (admin.status.toLowerCase() !== "active") {
            return {
                authorized: false,
                status: 403,
                error: "Administrator account is not active.",
            };
        }

        if (admin.lockedUntil && admin.lockedUntil > new Date()) {
            return {
                authorized: false,
                status: 403,
                error: "Administrator account is temporarily locked.",
            };
        }

        return {
            authorized: true,
            session: {
                user: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                    role: admin.role,
                },
            },
        };
    } catch (error) {
        console.error("Admin authorization error:", error);
        return {
            authorized: false,
            status: 401,
            error: "Authentication service unavailable.",
        };
    }
}
