import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function CompanyDetailPage({
  params
}: PageProps<'/[locale]/empresas/[slug]'>) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  return <CompanyDetailContent slug={slug} />;
}

function CompanyDetailContent({slug}: {slug: string}) {
  const t = useTranslations();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        {t('companyDetail.title')}: {slug}
      </h1>
      <Link className="mt-6 inline-block underline" href="/empresas">
        {t('nav.companies')}
      </Link>
    </main>
  );
}
