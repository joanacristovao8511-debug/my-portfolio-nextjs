/**
 * Canonical Prisma entry point for the application.
 *
 * Keeping this compatibility module means existing imports can migrate
 * without creating a second PrismaClient instance.
 */
export { prisma } from "@/lib/prisma";

/**
 * Database readiness is managed by Prisma migrations/db push, not by
 * application requests. Kept as a no-op compatibility hook for callers.
 */
export async function ensureDatabase(): Promise<void> {
  return;
}
