/**
 * Lightweight best-effort rate limiter for public API routes.
 *
 * This intentionally has no external dependency. In-memory limits apply per
 * server instance, so production deployments with multiple instances should
 * replace this with a shared store (for example Redis/Upstash).
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function getClientAddress(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function cleanupRateLimitBuckets(maxAgeMs = 10 * 60 * 1000): void {
  const cutoff = Date.now() - maxAgeMs;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < cutoff) buckets.delete(key);
  }
}
