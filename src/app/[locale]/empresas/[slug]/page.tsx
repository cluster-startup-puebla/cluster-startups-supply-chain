import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {useLocale, useTranslations} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
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
import {companies, getCompany, localize, type Company} from '@/data/companies';

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
    description: company.solution
      ? localize(company.solution, locale)
      : t('pendingNote')
  };
}

/**
 * Ficha de empresa.
 *
 * Las industrias van como píldoras pegadas al titular —son etiquetas,
 * se escanean— y debajo los dos párrafos largos, problema y solución, a
 * media página cada uno. El contacto cierra a todo lo ancho.
 *
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
  const locale = useLocale();

  const industries = company.industries
    ? localize(company.industries, locale)
    : null;

  const blocks = [
    {key: 'problem', value: company.problem},
    {key: 'solution', value: company.solution}
  ] as const;

  // `external` en vez de comparar contra la clave al pintar: al añadir el
  // demo, un `key === 'website'` habría dejado el segundo enlace abriendo
  // en la misma pestaña y sin `rel`, sin que nada lo delatara.
  const contactEntries = [
    {
      key: 'website',
      value: company.contact?.website,
      href: (v: string) => v,
      external: true
    },
    {
      key: 'demo',
      value: company.contact?.demo,
      href: (v: string) => v,
      external: true
    },
    {
      key: 'email',
      value: company.contact?.email,
      href: (v: string) => `mailto:${v}`,
      external: false
    },
    {
      key: 'phone',
      value: company.contact?.phone,
      href: (v: string) => `tel:${v.replace(/\s/g, '')}`,
      external: false
    }
  ] as const;

  const person = company.contact?.person;
  const hasLinks = contactEntries.some((entry) => entry.value);
  const hasContact = Boolean(person) || hasLinks;
  const isPending = !industries && !company.problem && !company.solution;

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

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
              <CompanyLogo company={company} className="size-20" />
              <Heading as="h1" size="hero">
                {company.name}
              </Heading>
            </div>

            {/* Las industrias van pegadas al titular, como etiquetas de la
                empresa. Cuando falta el dato se marca pendiente, salvo si
                la ficha entera lo está: ahí el aviso de abajo ya lo dice y
                repetirlo tres veces es ruido. */}
            <ul
              aria-label={t('detail.industry')}
              className="flex flex-wrap gap-2"
            >
              {(industries ?? (isPending ? [] : [t('pending')])).map(
                (industry) => (
                  <li key={industry}>
                    <Pill>{industry}</Pill>
                  </li>
                )
              )}
            </ul>
          </div>

          {isPending ? (
            <p className="rounded-2xl border border-line bg-white/[0.03] p-6 text-base text-dim">
              {t('pendingNote')}
            </p>
          ) : null}

          {/* Dos columnas, no tres: problema y solución son párrafos
              largos y a un tercio de ancho caen en columnas de seis
              palabras que nadie lee. */}
          <dl className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {blocks.map(({key, value}) => (
              <Card key={key}>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-dim">
                  {t(`detail.${key}`)}
                </dt>
                <dd className="mt-3">
                  {value ? (
                    <Text full>{localize(value, locale)}</Text>
                  ) : (
                    <Text className="text-dim/60" full>
                      {t('pending')}
                    </Text>
                  )}
                </dd>
              </Card>
            ))}
          </dl>

          <Card lit>
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-dim">
              {t('detail.contact')}
            </h2>

            {/* La persona encabeza la tarjeta y no entra en la lista de
                abajo: es con quien se habla, no un dato más que copiar. */}
            {person ? (
              <p className="mt-4 text-lg font-bold">
                {person}
                {company.contact?.role ? (
                  <span className="font-normal text-dim">
                    {' · '}
                    {company.contact.role}
                  </span>
                ) : null}
              </p>
            ) : null}

            {hasLinks ? (
              // A todo lo ancho la lista se tumba en fila: apilada dejaría
              // una tarjeta larguísima con tres renglones y medio metro de
              // vacío a la derecha.
              <dl className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-14 sm:gap-y-4">
                {contactEntries.map(({key, value, href, external}) =>
                  value ? (
                    <div key={key} className="flex flex-col gap-0.5">
                      <dt className="text-sm text-dim">{t(`detail.${key}`)}</dt>
                      <dd>
                        <a
                          href={href(value)}
                          className="text-base text-lift underline underline-offset-4"
                          {...(external
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
            ) : null}

            {/* "Pendiente" sólo si no hay nada: con una persona dada pero
                sin correo ni teléfono, colgarlo bajo su nombre sugeriría
                que el contacto no sirve. */}
            {hasContact ? null : (
              <p className="mt-4 text-base text-dim/60">{t('pending')}</p>
            )}
          </Card>
        </div>
      </Container>
    </Section>
  );
}
