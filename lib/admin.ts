/**
 * Server-only administrator bootstrap configuration.
 */
import { runtimeEnv } from "@/lib/runtime-env";

export const ADMIN_NAME =
  runtimeEnv().ADMIN_NAME?.trim() || "Portfolio Admin";

export const ADMIN_EMAIL =
  runtimeEnv().ADMIN_EMAIL?.trim().toLowerCase() || "";

export const ADMIN_PASSWORD =
  runtimeEnv().ADMIN_PASSWORD || "";

export function hasValidBootstrapAdminConfig(): boolean {
  return Boolean(ADMIN_EMAIL && ADMIN_PASSWORD.length >= 12);
}
