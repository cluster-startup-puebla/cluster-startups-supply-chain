'use client';

import {useEffect, useState} from 'react';
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
 * Al salir del primer pantallazo la barra se recoge en una píldora
 * flotante: se despega de los bordes, se redondea y encoge. La
 * transición anima sólo propiedades baratas del compositor y se anula
 * con `prefers-reduced-motion`.
 *
 * Máximo dos logos (regla del doc): el del evento y el del clúster.
 */
export default function SiteHeader() {
  const t = useTranslations('header');
  const tCompanies = useTranslations('companies');
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const update = () => setCondensed(window.scrollY > 24);

    update();
    window.addEventListener('scroll', update, {passive: true});

    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <>
      <a
        href={`#${siteConfig.anchors.content}`}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-rosa focus:px-5 focus:py-3 focus:font-bold focus:text-white"
      >
        {t('skipToContent')}
      </a>

      {siteConfig.eventBannerEnabled ? <EventBanner /> : null}

      <header
        className={`sticky top-0 z-50 transition-[padding] duration-300 ease-out motion-reduce:transition-none ${
          condensed ? 'px-3 pt-3 sm:px-5 sm:pt-4' : 'px-0 pt-0'
        }`}
      >
        <div
          className={`mx-auto backdrop-blur-md transition-all duration-300 ease-out motion-reduce:transition-none ${
            condensed
              ? 'max-w-4xl rounded-full border border-line bg-ink/80 shadow-[0_18px_40px_-24px_#000] sm:px-2'
              : 'max-w-none rounded-none border-b border-line bg-ink/70'
          }`}
        >
          {/* Mismo ancho que el contenido de la página: con el contenedor
              ancho el logo caía 64px más a la izquierda que todos los
              titulares y se leía pegado al borde. */}
          <Container>
            <div
              className={`flex items-center justify-between gap-3 px-1 transition-[min-height] duration-300 ease-out motion-reduce:transition-none sm:px-2 ${
                condensed ? 'min-h-16' : 'min-h-20'
              }`}
            >
              <Link href="/" aria-label={t('logoAlt')}>
                <Logo
                  className={`w-auto transition-[height] duration-300 ease-out motion-reduce:transition-none ${
                    condensed ? 'h-10 sm:h-11' : 'h-14 sm:h-16'
                  }`}
                />
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
        </div>
      </header>
    </>
  );
}
