import {useTranslations} from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Container from '@/components/ui/Container';
import EventBanner from './EventBanner';
import Logo from './Logo';
import {Link} from '@/i18n/navigation';
import {siteConfig} from '@/config/site';

/**
 * Banner de evento + barra de marca.
 *
 * El banner queda fuera del `<header>` y se va con el scroll: es
 * información de llegada y no debe ocupar viewport de forma permanente
 * en un celular. La barra de marca sí es fija, y por eso `<header>` no
 * la envuelve junto al banner: `sticky` sólo recorre el alto de su
 * padre, así que un contenedor corto la despegaría a los pocos píxeles.
 *
 * Máximo dos logos (regla del doc): el del evento y el del clúster.
 */
export default function SiteHeader() {
  const t = useTranslations('header');
  const tCompanies = useTranslations('companies');

  return (
    <>
      <a
        href={`#${siteConfig.anchors.content}`}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-rosa focus:px-5 focus:py-3 focus:font-bold focus:text-white"
      >
        {t('skipToContent')}
      </a>

      {siteConfig.eventBannerEnabled ? <EventBanner /> : null}

      <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
        <Container width="wide">
          <div className="flex min-h-20 items-center justify-between gap-3">
            <Link href="/" aria-label={t('logoAlt')}>
              <Logo />
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/empresas"
                className="min-h-11 shrink-0 content-center rounded-full px-2 text-sm font-bold text-dim transition-colors hover:text-text sm:px-3 sm:text-base"
              >
                {tCompanies('navLabel')}
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}
