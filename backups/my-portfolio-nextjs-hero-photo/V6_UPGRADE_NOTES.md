# V6.0.0 — Production Foundation Hardening

## Implemented

- Consolidated Prisma access around one canonical client.
- Removed insecure `admin123` authentication fallbacks.
- Removed pre-filled admin credentials from the login UI.
- Removed the misleading "Keep me signed in" control that was not wired to session behavior.
- Made database seeding fail clearly when `ADMIN_EMAIL` or `ADMIN_PASSWORD` is missing.
- Replaced credential-bearing `.env.example` values with safe placeholders.
- Added `NEXT_PUBLIC_SITE_URL` configuration.
- Added canonical metadata, Open Graph metadata, Twitter metadata, and robots directives.
- Added `robots.txt` generation.
- Added dynamic `sitemap.xml` generation for active projects.
- Replaced placeholder structured-data URLs with environment-driven values.
- Removed obsolete local SQLite artifacts from the PostgreSQL baseline.

## Validation

Full dependency installation/build validation was not completed in the packaging environment because `npm ci --ignore-scripts` timed out. No claim of a successful production build is made in this release note.
