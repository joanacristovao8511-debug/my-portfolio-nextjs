/**
 * Server-only administrator bootstrap configuration.
 *
 * Production must provide an explicit ADMIN_PASSWORD. There is
 * intentionally no insecure fallback credential.
 */
export const ADMIN_NAME =
  process.env.ADMIN_NAME?.trim() || "Portfolio Admin";

export const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL?.trim().toLowerCase() || "";

export const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD || "";

export function hasValidBootstrapAdminConfig(): boolean {
  // Require a non-trivial bootstrap secret so an accidentally weak
  // production environment cannot create the first administrator.
  return Boolean(ADMIN_EMAIL && ADMIN_PASSWORD.length >= 12);
}
