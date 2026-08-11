# Next.js + Tailwind + i18n Template Design

**Date:** 2026-08-11
**Project:** capim-mexico-supply-chain

## Overview

Initialize a basic Next.js template with Tailwind CSS and multilanguage support (Spanish/English). The template should be extensible and include route structure for future features.

## Stack

- **Next.js 15** (App Router, latest stable)
- **Tailwind CSS v4** (latest)
- **next-intl** (i18n library for Next.js)

## Languages

- `es` (Spanish) — default locale
- `en` (English)

## Route Structure

All routes are under `[locale]` prefix:

```
/[locale]/
  ├── page.tsx                    ← Landing page
  ├── empresas/page.tsx           ← Companies list (/empresas)
  ├── empresas/[slug]/page.tsx    ← Company detail (/empresas/[slug])
  └── necesidades/page.tsx        ← Lead form (/necesidades)
```

## URL Mapping

| Spanish | English |
|---------|---------|
| `/es/empresas` | `/en/companies` |
| `/es/empresas/acme` | `/en/companies/acme` |
| `/es/necesidades` | `/en/needs` |

## Dictionaries

```
dictionaries/
  ├── es.json    ← Spanish translations
  └── en.json    ← English translations
```

Each page receives its dictionary as a prop. Dictionary structure:

```json
{
  "nav": { "home": "...", "companies": "...", "needs": "..." },
  "home": { "title": "...", "description": "..." },
  "companies": { "title": "...", "list": "..." },
  "companyDetail": { "title": "..." },
  "needs": { "title": "...", "form": { "name": "...", "email": "...", "submit": "..." } }
}
```

## Configuration

- `i18n.ts` — next-intl config with locales and default locale
- Middleware to detect locale and redirect
- `next.config.ts` with next-intl plugin

## File Structure

```
src/
  ├── i18n/
  │   ├── routing.ts      ← locale routing config
  │   └── request.ts      ← request config for next-intl
  ├── messages/
  │   ├── es.json
  │   └── en.json
  ├── app/
  │   └── [locale]/
  │       ├── layout.tsx
  │       ├── page.tsx
  │       ├── empresas/
  │       │   ├── page.tsx
  │       │   └── [slug]/page.tsx
  │       └── necesidades/page.tsx
  ├── components/          ← empty, for future use
  └── lib/                 ← empty, for future use
middleware.ts
next.config.ts
tailwind.config.ts
```

## Implementation Steps

1. Initialize Next.js project with `npx create-next-app@latest`
2. Install and configure `next-intl`
3. Create i18n routing config
4. Create middleware for locale detection
5. Set up `[locale]` layout and pages
6. Create dictionary files (es.json, en.json)
7. Create dictionary loading utility
8. Configure each page to use translations
9. Add language switcher component
10. Test both languages work correctly

## Notes

- No UI design or styling — basic Tailwind only
- Pages contain placeholder content with translations
- Template is extensible for adding new routes and features
- Follows next-intl best practices for App Router
