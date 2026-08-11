# Next.js + Tailwind + i18n Template Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize a Next.js 15 project with Tailwind CSS v4 and next-intl i18n support (Spanish/English), with route structure for landing, companies, company detail, and lead form pages.

**Architecture:** Next.js App Router with `[locale]` dynamic segment for i18n. next-intl handles locale detection, routing, and dictionary loading. Each page receives translations as props. Dictionary files (JSON) provide text translations for both languages.

**Tech Stack:** Next.js 15, Tailwind CSS v4, next-intl, TypeScript

---

## Implementation notes (completed 2026-08-11)

The plan was implemented in full. Five deviations were required by the
installed stack — the repo has **Next.js 16.3.0**, not 15:

1. **`src/middleware.ts` → `src/proxy.ts`.** The `middleware` file convention is
   deprecated in Next.js 16 and renamed to `proxy`. The matcher was widened to
   `['/((?!api|_next|_vercel|.*\\..*).*)']` so unprefixed paths also redirect.
2. **Localized pathnames added to `src/i18n/routing.ts`.** Task 10 Step 5 expects
   `/en/companies` and `/en/needs`, which the Task 2 routing config could not
   serve. A `pathnames` map now routes `/es/empresas` ↔ `/en/companies` and
   `/es/necesidades` ↔ `/en/needs` onto the same page files.
3. **`src/i18n/navigation.ts` added.** Localized pathnames require next-intl's
   `createNavigation` helpers; pages use its `Link`, not `next/link`, so hrefs
   resolve per locale. The language switcher likewise uses its `usePathname` /
   `useRouter` — the plan's `pathname.replace(/^\/(es|en)/, '')` regex would
   produce non-existent URLs such as `/es/companies`.
4. **Next.js 16 typed route helpers** (`PageProps<'/[locale]'>`,
   `LayoutProps<'/[locale]'>`) replace the hand-written
   `params: Promise<{locale: string}>` annotations.
5. **`getDictionary` takes the `Locale` union from `@/i18n/routing`**, not
   `Locale` from `next-intl` (which is `string` and fails to index the
   dictionaries map under `strict`).

Minor: pages use Tailwind utility classes instead of the plan's inline `style`
objects, and the locale layout keeps the Geist fonts wired up by
`create-next-app` because `globals.css` references those CSS variables.

Verified: `npm run build` and `npm run lint` pass; all six localized routes
return 200, `/` redirects to `/es` (and to `/en` under `Accept-Language: en`),
and the switcher was exercised in-browser on static and dynamic routes
(`/en/companies/acme` → `/es/empresas/acme`, slug preserved).

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `.gitignore`, `src/app/layout.tsx`, `src/app/globals.css`

- [x] **Step 1: Create Next.js project with create-next-app**

Run in project root directory:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Select options:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: Yes
- App Router: Yes
- Import alias: `@/*`

- [x] **Step 2: Verify project runs**

```bash
npm run dev
```

Expected: Server starts on http://localhost:3000

- [x] **Step 3: Commit**

```bash
git add .
git commit -m "feat: initialize Next.js 15 with Tailwind CSS"
```

---

## Task 2: Install and Configure next-intl

**Files:**
- Create: `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/middleware.ts`
- Modify: `next.config.ts`

- [x] **Step 1: Install next-intl**

```bash
npm install next-intl
```

- [x] **Step 2: Create i18n routing config**

Create `src/i18n/routing.ts`:
```typescript
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es'
});
```

- [x] **Step 3: Create request config**

Create `src/i18n/request.ts`:
```typescript
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
```

- [x] **Step 4: Update next.config.ts**

Replace `next.config.ts` content:
```typescript
import createNextIntlPlugin from 'next-intl/plugin';
import type {NextConfig} from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
```

- [x] **Step 5: Create middleware**

Create `src/middleware.ts`:
```typescript
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(es|en)/:path*']
};
```

- [x] **Step 6: Commit**

```bash
git add src/i18n/ src/middleware.ts next.config.ts
git commit -m "feat: configure next-intl with es/en locales"
```

---

## Task 3: Create Dictionary Files

**Files:**
- Create: `src/messages/es.json`, `src/messages/en.json`

- [x] **Step 1: Create Spanish dictionary**

Create `src/messages/es.json`:
```json
{
  "nav": {
    "home": "Inicio",
    "companies": "Empresas",
    "needs": "Necesidades"
  },
  "home": {
    "title": "Capim Mexico Supply Chain",
    "description": "Plataforma de cadena de suministro para empresas mexicanas"
  },
  "companies": {
    "title": "Empresas",
    "list": "Listado de empresas",
    "viewDetail": "Ver detalle"
  },
  "companyDetail": {
    "title": "Detalle de Empresa"
  },
  "needs": {
    "title": "Necesidades",
    "description": "Cuéntanos sobre tus necesidades",
    "form": {
      "name": "Nombre",
      "email": "Correo electrónico",
      "message": "Mensaje",
      "submit": "Enviar"
    }
  }
}
```

- [x] **Step 2: Create English dictionary**

Create `src/messages/en.json`:
```json
{
  "nav": {
    "home": "Home",
    "companies": "Companies",
    "needs": "Needs"
  },
  "home": {
    "title": "Capim Mexico Supply Chain",
    "description": "Supply chain platform for Mexican companies"
  },
  "companies": {
    "title": "Companies",
    "list": "Companies list",
    "viewDetail": "View detail"
  },
  "companyDetail": {
    "title": "Company Detail"
  },
  "needs": {
    "title": "Needs",
    "description": "Tell us about your needs",
    "form": {
      "name": "Name",
      "email": "Email",
      "message": "Message",
      "submit": "Submit"
    }
  }
}
```

- [x] **Step 3: Commit**

```bash
git add src/messages/
git commit -m "feat: add es/en translation dictionaries"
```

---

## Task 4: Create Dictionary Loading Utility

**Files:**
- Create: `src/lib/dictionaries.ts`

- [x] **Step 1: Create dictionary loader**

Create `src/lib/dictionaries.ts`:
```typescript
import type {Locale} from 'next-intl';

const dictionaries = {
  es: () => import('../messages/es.json').then((module) => module.default),
  en: () => import('../messages/en.json').then((module) => module.default)
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
```

- [x] **Step 2: Commit**

```bash
git add src/lib/dictionaries.ts
git commit -m "feat: add dictionary loading utility"
```

---

## Task 5: Create Root Layout with i18n

**Files:**
- Modify: `src/app/[locale]/layout.tsx`

- [x] **Step 1: Create locale layout**

Create `src/app/[locale]/layout.tsx`:
```typescript
import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Capim Mexico Supply Chain',
  description: 'Supply chain platform'
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [x] **Step 2: Remove default layout**

Delete `src/app/layout.tsx` (or move to `[locale]` folder if needed)

- [x] **Step 3: Commit**

```bash
git add src/app/
git commit -m "feat: create locale-aware root layout"
```

---

## Task 6: Create Landing Page

**Files:**
- Create: `src/app/[locale]/page.tsx`

- [x] **Step 1: Create landing page**

Create `src/app/[locale]/page.tsx`:
```typescript
import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import Link from 'next/link';
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <HomePageContent />;
}

function HomePageContent() {
  const t = useTranslations();

  return (
    <main style={{padding: '2rem'}}>
      <h1>{t('home.title')}</h1>
      <p>{t('home.description')}</p>
      <nav>
        <Link href="/empresas">{t('nav.companies')}</Link>
        {' | '}
        <Link href="/necesidades">{t('nav.needs')}</Link>
      </nav>
    </main>
  );
}
```

- [x] **Step 2: Commit**

```bash
git add src/app/\[locale\]/page.tsx
git commit -m "feat: create landing page with i18n"
```

---

## Task 7: Create Companies Pages

**Files:**
- Create: `src/app/[locale]/empresas/page.tsx`, `src/app/[locale]/empresas/[slug]/page.tsx`

- [x] **Step 1: Create companies list page**

Create `src/app/[locale]/empresas/page.tsx`:
```typescript
import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import Link from 'next/link';
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function CompaniesPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <CompaniesContent />;
}

function CompaniesContent() {
  const t = useTranslations();

  return (
    <main style={{padding: '2rem'}}>
      <h1>{t('companies.title')}</h1>
      <p>{t('companies.list')}</p>
      <ul>
        <li>
          <Link href="/empresas/acme">{t('companies.viewDetail')} - Acme</Link>
        </li>
        <li>
          <Link href="/empresas/globex">{t('companies.viewDetail')} - Globex</Link>
        </li>
      </ul>
      <Link href="/">{t('nav.home')}</Link>
    </main>
  );
}
```

- [x] **Step 2: Create company detail page**

Create `src/app/[locale]/empresas/[slug]/page.tsx`:
```typescript
import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import Link from 'next/link';
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function CompanyDetailPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  return <CompanyDetailContent slug={slug} />;
}

function CompanyDetailContent({slug}: {slug: string}) {
  const t = useTranslations();

  return (
    <main style={{padding: '2rem'}}>
      <h1>{t('companyDetail.title')}: {slug}</h1>
      <Link href="/empresas">{t('nav.companies')}</Link>
    </main>
  );
}
```

- [x] **Step 3: Commit**

```bash
git add src/app/\[locale\]/empresas/
git commit -m "feat: create companies list and detail pages"
```

---

## Task 8: Create Needs Page (Lead Form)

**Files:**
- Create: `src/app/[locale]/necesidades/page.tsx`

- [x] **Step 1: Create needs page**

Create `src/app/[locale]/necesidades/page.tsx`:
```typescript
import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import Link from 'next/link';
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function NeedsPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <NeedsContent />;
}

function NeedsContent() {
  const t = useTranslations();

  return (
    <main style={{padding: '2rem'}}>
      <h1>{t('needs.title')}</h1>
      <p>{t('needs.description')}</p>
      <form>
        <div>
          <label>{t('needs.form.name')}</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label>{t('needs.form.email')}</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label>{t('needs.form.message')}</label>
          <textarea name="message" />
        </div>
        <button type="submit">{t('needs.form.submit')}</button>
      </form>
      <Link href="/">{t('nav.home')}</Link>
    </main>
  );
}
```

- [x] **Step 2: Commit**

```bash
git add src/app/\[locale\]/necesidades/
git commit -m "feat: create needs page with lead form"
```

---

## Task 9: Create Language Switcher Component

**Files:**
- Create: `src/components/LanguageSwitcher.tsx`

- [x] **Step 1: Create language switcher**

Create `src/components/LanguageSwitcher.tsx`:
```typescript
'use client';

import {useRouter, usePathname} from 'next/navigation';
import {useLocale, useTranslations} from 'next-intl';
import {routing} from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const switchLocale = (newLocale: string) => {
    router.push(`/${newLocale}${pathname.replace(/^\/(es|en)/, '')}`);
  };

  return (
    <div>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          style={{
            fontWeight: locale === loc ? 'bold' : 'normal',
            marginRight: '0.5rem'
          }}
        >
          {loc === 'es' ? 'Español' : 'English'}
        </button>
      ))}
    </div>
  );
}
```

- [x] **Step 2: Add to layout**

Update `src/app/[locale]/layout.tsx` to include:
```typescript
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Add inside <body> before {children}
<LanguageSwitcher />
```

- [x] **Step 3: Commit**

```bash
git add src/components/LanguageSwitcher.tsx src/app/\[locale\]/layout.tsx
git commit -m "feat: add language switcher component"
```

---

## Task 10: Verify and Test

**Files:**
- None (verification only)

- [x] **Step 1: Run dev server**

```bash
npm run dev
```

- [x] **Step 2: Test default locale**

Visit http://localhost:3000
Expected: Redirects to /es, shows Spanish content

- [x] **Step 3: Test English locale**

Visit http://localhost:3000/en
Expected: Shows English content

- [x] **Step 4: Test language switching**

Click language switcher buttons
Expected: URL and content change between es/en

- [x] **Step 5: Test all routes**

- `/es/empresas` → Spanish companies list
- `/en/companies` → English companies list
- `/es/empresas/acme` → Spanish company detail
- `/en/companies/acme` → English company detail
- `/es/necesidades` → Spanish needs form
- `/en/needs` → English needs form

- [x] **Step 6: Run build**

```bash
npm run build
```

Expected: Build succeeds without errors

- [x] **Step 7: Final commit**

```bash
git add .
git commit -m "chore: verify i18n setup works correctly"
```
