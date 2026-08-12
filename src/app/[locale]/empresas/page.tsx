import {useLocale, useTranslations} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Icon from '@/components/ui/Icon';
import Pill from '@/components/ui/Pill';
import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';
import CompanyLogo from '@/components/landing/CompanyLogo';
import SiteFooter from '@/components/landing/SiteFooter';
import SiteHeader from '@/components/landing/SiteHeader';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {companies, localize} from '@/data/companies';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'companies'});

  return {title: t('title'), description: t('subtitle')};
}

/**
 * Directorio de empresas del clúster.
 *
 * El padrón vive en `data/companies.ts`; esta página no conoce ninguna
 * empresa por su nombre. Las fichas sin información confirmada se
 * marcan como tales en vez de rellenarse con texto inventado.
 */
export default async function CompaniesPage({
  params
}: PageProps<'/[locale]/empresas'>) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <CompaniesContent />
      </main>
      <SiteFooter />
    </>
  );
}

function CompaniesContent() {
  const t = useTranslations('companies');
  const locale = useLocale();

  return (
    <Section tone="crater" nodes="sparse" spacing="roomy">
      <Container>
        <div className="flex flex-col gap-8 sm:gap-14">
          <div className="flex flex-col gap-4">
            <Heading as="h1" size="hero">
              {t('title')}
            </Heading>
            <Text size="lg" dim>
              {t('subtitle')}
            </Text>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {companies.map((company) => (
              <li key={company.slug}>
                <Card className="transition-colors hover:border-[var(--line-strong)]">
                  <CompanyLogo company={company} className="size-14" />

                  <Heading as="h2" size="md" className="mt-5">
                    {company.name}
                  </Heading>

                  <ul
                    aria-label={t('detail.industry')}
                    className="mt-3 flex flex-wrap gap-1.5"
                  >
                    {(company.industries
                      ? localize(company.industries, locale)
                      : [t('pending')]
                    ).map((industry) => (
                      <li key={industry}>
                        <Pill className="px-3 py-1 text-xs">{industry}</Pill>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={{
                      pathname: '/empresas/[slug]',
                      params: {slug: company.slug}
                    }}
                    className="mt-auto inline-flex min-h-12 items-center gap-2 pt-6 font-bold text-lift underline decoration-rosa decoration-2 underline-offset-[6px]"
                  >
                    {t('viewDetail')}
                    <Icon name="arrowRight" className="size-4" />
                    <span className="sr-only">{company.name}</span>
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
