import type {Locale} from '@/i18n/routing';

const dictionaries = {
  es: () => import('../messages/es.json').then((module) => module.default),
  en: () => import('../messages/en.json').then((module) => module.default)
} satisfies Record<Locale, () => Promise<unknown>>;

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
