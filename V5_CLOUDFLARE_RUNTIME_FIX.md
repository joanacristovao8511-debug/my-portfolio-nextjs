# Cloudflare runtime fix

The public portfolio, project detail pages, and sitemap query Neon through Prisma. They are explicitly marked `force-dynamic` so Vinext/Cloudflare does not try to execute those database queries during the build/deployment phase, when Worker secrets are not available.

The database connection is created lazily at request time and reads `DATABASE_URL` from the Cloudflare Worker environment.

After deploying, verify:

```text
/api/health
```

Expected when the secret is correctly bound and Neon is reachable:

```json
{
  "ok": true,
  "database": "ok",
  "ai": "configured"
}
```
