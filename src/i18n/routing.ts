import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  pathnames: {
    '/': '/',
    '/empresas': {
      es: '/empresas',
      en: '/companies'
    },
    '/empresas/[slug]': {
      es: '/empresas/[slug]',
      en: '/companies/[slug]'
    },
    '/necesidades': {
      es: '/necesidades',
      en: '/needs'
    }
  }
});

export type Locale = (typeof routing.locales)[number];
