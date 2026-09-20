/**
 * Runtime environment bindings for Cloudflare Workers/Vinext.
 *
 * Cloudflare secrets are available through `cloudflare:workers`.
 * The process.env fallback keeps local Node-based tooling/dev usable.
 */
import { env as workerEnv } from "cloudflare:workers";

type RuntimeEnv = {
  DATABASE_URL?: string;
  AUTH_SECRET?: string;
  ADMIN_EMAIL?: string;
  ADMIN_PASSWORD?: string;
  ADMIN_NAME?: string;
  OPENROUTER_API_KEY?: string;
  OPENROUTER_BASE_URL?: string;
  OPENROUTER_MODEL?: string;
};

export function runtimeEnv(): RuntimeEnv {
  return {
    DATABASE_URL:
      workerEnv.DATABASE_URL ||
      process.env.DATABASE_URL,
    AUTH_SECRET:
      workerEnv.AUTH_SECRET ||
      process.env.AUTH_SECRET,
    ADMIN_EMAIL:
      workerEnv.ADMIN_EMAIL ||
      process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD:
      workerEnv.ADMIN_PASSWORD ||
      process.env.ADMIN_PASSWORD,
    ADMIN_NAME:
      workerEnv.ADMIN_NAME ||
      process.env.ADMIN_NAME,
    OPENROUTER_API_KEY:
      workerEnv.OPENROUTER_API_KEY ||
      process.env.OPENROUTER_API_KEY,
    OPENROUTER_BASE_URL:
      workerEnv.OPENROUTER_BASE_URL ||
      process.env.OPENROUTER_BASE_URL,
    OPENROUTER_MODEL:
      workerEnv.OPENROUTER_MODEL ||
      process.env.OPENROUTER_MODEL,
  };
}
