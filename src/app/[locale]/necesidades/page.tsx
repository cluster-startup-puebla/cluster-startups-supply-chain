import type {Metadata} from 'next';
import {useTranslations} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';
import LeadForm from '@/components/landing/LeadForm';
import SiteFooter from '@/components/landing/SiteFooter';
import SiteHeader from '@/components/landing/SiteHeader';
import {profileKeys, type ProfileKey} from '@/config/site';
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'form'});

  return {title: t('title'), description: t('subtitle')};
}

/**
 * Página de levantamiento de necesidades.
 *
 * Toda la landing empuja aquí. Los CTA de las cuatro rutas añaden
 * `?perfil=<clave>` para que el lead llegue ya clasificado; esa
 * clasificación es lo que hace útil la base después.
 */
export default async function NeedsPage({
  params,
  searchParams
}: PageProps<'/[locale]/necesidades'>) {
  const {locale} = await params;
  setRequestLocale(locale);

  const {perfil} = await searchParams;
  const requested = Array.isArray(perfil) ? perfil[0] : perfil;
  const initialProfile: ProfileKey | '' = (
    profileKeys as readonly string[]
  ).includes(requested ?? '')
    ? (requested as ProfileKey)
    : '';

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Section tone="crater" nodes="sparse" spacing="roomy">
          <div className="flex flex-col gap-10">
            <NeedsIntro />
            <LeadForm initialProfile={initialProfile} />
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}

function NeedsIntro() {
  const t = useTranslations('form');

  return (
    <Container width="narrow">
      <div className="flex flex-col gap-4">
        <Heading as="h1" size="hero">
          {t('title')}
        </Heading>
        <Text size="lg" dim>
          {t('subtitle')}
        </Text>
      </div>
    </Container>
  );
}
