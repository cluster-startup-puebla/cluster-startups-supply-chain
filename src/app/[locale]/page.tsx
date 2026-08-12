import {setRequestLocale} from 'next-intl/server';
import Credibility from '@/components/landing/Credibility';
import EntryRoutes from '@/components/landing/EntryRoutes';
import GapSection from '@/components/landing/GapSection';
import Hero from '@/components/landing/Hero';
import Infrastructure from '@/components/landing/Infrastructure';
import LeadForm from '@/components/landing/LeadForm';
import ModelFlow from '@/components/landing/ModelFlow';
import PositioningStrip from '@/components/landing/PositioningStrip';
import SiteFooter from '@/components/landing/SiteFooter';
import SiteHeader from '@/components/landing/SiteHeader';
import StickyCta from '@/components/landing/StickyCta';
import {LeadFormProvider} from '@/components/landing/lead-form-context';
import {siteConfig} from '@/config/site';
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

/**
 * Landing del clúster. Página única, todo en scroll, una sola conversión.
 *
 * Alternancia de fondo (regla dura del doc):
 * blanco → rosa → blanco → navy → blanco → blanco → navy → blanco → negro.
 * Ningún bloque navy queda pegado a otro navy.
 */
export default async function HomePage({params}: PageProps<'/[locale]'>) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <LeadFormProvider>
      <SiteHeader />

      <main className="flex-1">
        <Hero />
        {siteConfig.stickyCtaEnabled ? <StickyCta /> : null}
        <PositioningStrip />
        <GapSection />
        <EntryRoutes />
        <ModelFlow />
        <Credibility />
        <Infrastructure />
        <LeadForm />
      </main>

      <SiteFooter />
    </LeadFormProvider>
  );
}
