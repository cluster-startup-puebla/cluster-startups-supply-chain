import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function HomePage({params}: PageProps<'/[locale]'>) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <HomePageContent />;
}

function HomePageContent() {
  const t = useTranslations();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-semibold tracking-tight">{t('home.title')}</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        {t('home.description')}
      </p>
      <nav className="mt-6 flex gap-4">
        <Link className="underline" href="/empresas">
          {t('nav.companies')}
        </Link>
        <Link className="underline" href="/necesidades">
          {t('nav.needs')}
        </Link>
      </nav>
    </main>
  );
}
