import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {Archivo} from 'next/font/google';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale
} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import '../globals.css';

/**
 * Archivo (Omnibus-Type): grotesca latinoamericana dibujada para
 * señalética y texto de alto rendimiento. Aguanta tracking muy cerrado
 * en display sin perder legibilidad a 16px en pantalla pequeña, que es
 * exactamente el reparto que pide esta página. Una familia, dos pesos.
 */
const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  display: 'swap'
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'meta'});

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function LocaleLayout({
  children,
  params
}: LayoutProps<'/[locale]'>) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${archivo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-ink text-text">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
