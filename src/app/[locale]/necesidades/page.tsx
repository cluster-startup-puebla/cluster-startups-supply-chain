import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function NeedsPage({
  params
}: PageProps<'/[locale]/necesidades'>) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <NeedsContent />;
}

function NeedsContent() {
  const t = useTranslations();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        {t('needs.title')}
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        {t('needs.description')}
      </p>
      <form className="mt-6 flex max-w-md flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">{t('needs.form.name')}</label>
          <input
            className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700"
            id="name"
            name="name"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">{t('needs.form.email')}</label>
          <input
            className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700"
            id="email"
            name="email"
            type="email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="message">{t('needs.form.message')}</label>
          <textarea
            className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700"
            id="message"
            name="message"
            rows={4}
          />
        </div>
        <button
          className="rounded bg-foreground px-4 py-2 text-background"
          type="submit"
        >
          {t('needs.form.submit')}
        </button>
      </form>
      <Link className="mt-6 inline-block underline" href="/">
        {t('nav.home')}
      </Link>
    </main>
  );
}
