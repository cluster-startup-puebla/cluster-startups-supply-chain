import type {Metadata} from 'next';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {marked} from 'marked';
import {setRequestLocale} from 'next-intl/server';
import Container from '@/components/ui/Container';
import SiteFooter from '@/components/landing/SiteFooter';
import SiteHeader from '@/components/landing/SiteHeader';
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
  const title = locale === 'es' ? 'Aviso de Privacidad' : 'Privacy Notice';

  return {title};
}

async function getPrivacyContent(locale: string): Promise<string> {
  const file =
    locale === 'es' ? 'privacy.es.md' : 'privacy.en.md';
  const filePath = join(process.cwd(), 'src', 'content', file);
  const raw = await readFile(filePath, 'utf-8');
  return marked.parse(raw) as string;
}

export default async function PrivacyPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const html = await getPrivacyContent(locale);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="py-16 sm:py-24">
          <Container width="narrow">
            <article
              className="privacy-content"
              dangerouslySetInnerHTML={{__html: html}}
            />
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
