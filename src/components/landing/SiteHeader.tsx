import {useTranslations} from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Container from '@/components/ui/Container';
import EventBanner from './EventBanner';
import Logo from './Logo';
import {siteConfig} from '@/config/site';

/**
 * Banner de evento + barra de marca. Fijos arriba: el visitante llega de
 * un QR y necesita saber dónde está sin hacer scroll.
 *
 * Máximo dos elementos de marca en la barra (regla del doc: la sopa de
 * logos no se lee).
 */
export default function SiteHeader() {
  const t = useTranslations('header');

  return (
    <header className="sticky top-0 z-50">
      <a
        href={`#${siteConfig.anchors.form}`}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-pink focus:px-4 focus:py-2 focus:text-white"
      >
        {t('skipToContent')}
      </a>

      {siteConfig.eventBannerEnabled ? <EventBanner /> : null}

      <div className="border-b border-hairline bg-paper/95 backdrop-blur">
        <Container width="wide">
          <div className="flex min-h-14 items-center justify-between gap-4">
            <Logo />
            <LanguageSwitcher />
          </div>
        </Container>
      </div>
    </header>
  );
}
