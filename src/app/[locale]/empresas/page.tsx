import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';

const companies = ['acme', 'globex'];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function CompaniesPage({
  params
}: PageProps<'/[locale]/empresas'>) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <CompaniesContent />;
}

function CompaniesContent() {
  const t = useTranslations();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        {t('companies.title')}
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        {t('companies.list')}
      </p>
      <ul className="mt-6 space-y-2">
        {companies.map((slug) => (
          <li key={slug}>
            <Link
              className="underline"
              href={{pathname: '/empresas/[slug]', params: {slug}}}
            >
              {t('companies.viewDetail')} - {slug}
            </Link>
          </li>
        ))}
      </ul>
      <Link className="mt-6 inline-block underline" href="/">
        {t('nav.home')}
      </Link>
    </main>
  );
}
