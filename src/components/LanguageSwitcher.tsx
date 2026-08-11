'use client';

import {useParams} from 'next/navigation';
import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';

const localeLabels: Record<Locale, string> = {
  es: 'Español',
  en: 'English'
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function switchLocale(nextLocale: Locale) {
    // Keep the current route (including its params) and swap only the locale,
    // so localized pathnames resolve to their counterpart.
    router.replace(
      // @ts-expect-error -- `params` is not narrowed to the current pathname
      {pathname, params},
      {locale: nextLocale}
    );
  }

  return (
    <div className="flex gap-3 p-4">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchLocale(loc)}
          className={locale === loc ? 'font-bold underline' : 'underline'}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  );
}
