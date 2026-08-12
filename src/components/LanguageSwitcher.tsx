'use client';

import {useParams} from 'next/navigation';
import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';

/**
 * Conmutador de idioma para la barra de marca.
 *
 * Muestra el código corto para no robarle ancho al logo en móvil; el
 * nombre completo va en `aria-label` para lectores de pantalla.
 */
const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English'
};

const localeCodes: Record<Locale, string> = {
  es: 'ES',
  en: 'EN'
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function switchLocale(nextLocale: Locale) {
    // Conserva la ruta actual y sus params, y cambia sólo el locale, para
    // que las rutas traducidas resuelvan a su equivalente.
    router.replace(
      // @ts-expect-error -- `params` no está acotado al pathname actual
      {pathname, params},
      {locale: nextLocale}
    );
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-line p-1">
      {routing.locales.map((loc) => {
        const isActive = locale === loc;

        return (
          <button
            key={loc}
            type="button"
            lang={loc}
            aria-label={localeNames[loc]}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => switchLocale(loc)}
            className={`min-h-9 min-w-10 rounded-full px-2 text-sm transition-colors duration-150 ${
              isActive
                ? 'bg-white/10 font-bold text-text'
                : 'font-normal text-dim hover:text-text'
            }`}
          >
            {localeCodes[loc]}
          </button>
        );
      })}
    </div>
  );
}
