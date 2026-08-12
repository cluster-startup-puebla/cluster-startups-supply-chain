import {setRequestLocale} from 'next-intl/server';
import ClosingCta from '@/components/landing/ClosingCta';
import Credibility from '@/components/landing/Credibility';
import EntryRoutes from '@/components/landing/EntryRoutes';
import GapSection from '@/components/landing/GapSection';
import Hero from '@/components/landing/Hero';
import Infrastructure from '@/components/landing/Infrastructure';
import ModelFlow from '@/components/landing/ModelFlow';
import PositioningStrip from '@/components/landing/PositioningStrip';
import SiteFooter from '@/components/landing/SiteFooter';
import SiteHeader from '@/components/landing/SiteHeader';
import StickyCta from '@/components/landing/StickyCta';
import {siteConfig} from '@/config/site';
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

/**
 * Landing del clúster.
 *
 * El levantamiento de necesidades vive en `/necesidades`: la landing
 * argumenta y empuja allí, y cierra con `ClosingCta` para no morir en el
 * footer. El ritmo alterna densidad de luz — un pasaje con cráter y
 * nodos se gana uno callado.
 */
export default async function HomePage({params}: PageProps<'/[locale]'>) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />

      <main id={siteConfig.anchors.content} className="flex-1">
        <Hero />
        {siteConfig.stickyCtaEnabled ? <StickyCta /> : null}
        <PositioningStrip />
        <GapSection />
        <EntryRoutes />
        <ModelFlow />
        <Credibility />
        <Infrastructure />
        <ClosingCta />
      </main>

      <SiteFooter />
    </>
  );
}
