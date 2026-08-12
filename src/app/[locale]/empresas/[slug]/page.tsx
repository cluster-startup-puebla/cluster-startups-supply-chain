import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {useTranslations} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';
import CompanyLogo from '@/components/landing/CompanyLogo';
import SiteFooter from '@/components/landing/SiteFooter';
import SiteHeader from '@/components/landing/SiteHeader';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {companies, getCompany, type Company} from '@/data/companies';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    companies.map((company) => ({locale, slug: company.slug}))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const company = getCompany(slug);

  if (!company) return {};

  const t = await getTranslations({locale, namespace: 'companies'});

  return {
    title: company.name,
    description: company.solution ?? t('pendingNote')
  };
}

/**
 * Ficha de empresa.
 *
 * Tres bloques —industria, problema, solución— más la ficha de contacto.
 * Los campos que la empresa aún no ha confirmado se muestran como
 * pendientes: son afirmaciones sobre un negocio real y no se rellenan
 * con texto de relleno.
 */
export default async function CompanyDetailPage({
  params
}: PageProps<'/[locale]/empresas/[slug]'>) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const company = getCompany(slug);

  if (!company) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <CompanyDetail company={company} />
      </main>
      <SiteFooter />
    </>
  );
}

function CompanyDetail({company}: {company: Company}) {
  const t = useTranslations('companies');

  const blocks = [
    {key: 'industry', value: company.industry},
    {key: 'problem', value: company.problem},
    {key: 'solution', value: company.solution}
  ] as const;

  const contactEntries = [
    {key: 'website', value: company.contact?.website, href: (v: string) => v},
    {
      key: 'email',
      value: company.contact?.email,
      href: (v: string) => `mailto:${v}`
    },
    {
      key: 'phone',
      value: company.contact?.phone,
      href: (v: string) => `tel:${v.replace(/\s/g, '')}`
    }
  ] as const;

  const hasContact = contactEntries.some((entry) => entry.value);
  const isPending = !company.industry && !company.problem && !company.solution;

  return (
    <Section tone="crater" nodes="sparse" spacing="roomy">
      <Container>
        <div className="flex flex-col gap-9 sm:gap-12">
          <Link
            href="/empresas"
            className="inline-flex min-h-11 items-center gap-2 self-start font-bold text-dim hover:text-text"
          >
            <Icon name="arrowRight" className="size-4 rotate-180" />
            {t('backToList')}
          </Link>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
            <CompanyLogo company={company} className="size-20" />
            <Heading as="h1" size="hero">
              {company.name}
            </Heading>
          </div>

          {isPending ? (
            <p className="rounded-2xl border border-line bg-white/[0.03] p-6 text-base text-dim">
              {t('pendingNote')}
            </p>
          ) : null}

          <dl className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {blocks.map(({key, value}) => (
              <Card key={key}>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-dim">
                  {t(`detail.${key}`)}
                </dt>
                <dd className="mt-3">
                  {value ? (
                    <Text full>{value}</Text>
                  ) : (
                    <Text className="text-dim/60" full>
                      {t('pending')}
                    </Text>
                  )}
                </dd>
              </Card>
            ))}
          </dl>

          <Card lit className="sm:max-w-lg">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-dim">
              {t('detail.contact')}
            </h2>

            {hasContact ? (
              <dl className="mt-4 flex flex-col gap-3">
                {contactEntries.map(({key, value, href}) =>
                  value ? (
                    <div key={key} className="flex flex-col gap-0.5">
                      <dt className="text-sm text-dim">{t(`detail.${key}`)}</dt>
                      <dd>
                        <a
                          href={href(value)}
                          className="text-base text-lift underline underline-offset-4"
                          {...(key === 'website'
                            ? {target: '_blank', rel: 'noopener noreferrer'}
                            : null)}
                        >
                          {value}
                        </a>
                      </dd>
                    </div>
                  ) : null
                )}
              </dl>
            ) : (
              <p className="mt-4 text-base text-dim/60">{t('pending')}</p>
            )}
          </Card>
        </div>
      </Container>
    </Section>
  );
}
