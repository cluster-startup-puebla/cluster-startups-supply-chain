import {useTranslations} from 'next-intl';
import Container from '@/components/ui/Container';
import Logo from './Logo';
import {siteConfig} from '@/config/site';

/**
 * Sección 9 — footer.
 *
 * Cierra la página en el punto más oscuro del mundo visual: el campo de
 * nodos se apaga. Los datos de contacto viven en `siteConfig`; mientras
 * estén vacíos se muestra "Por confirmar" en vez de un enlace roto.
 */
const socialLabels = {
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  x: 'X'
} as const;

export default function SiteFooter() {
  const t = useTranslations('footer');

  const socials = (
    Object.keys(socialLabels) as (keyof typeof socialLabels)[]
  ).filter((key) => siteConfig.social[key] !== '');

  return (
    <footer className="border-t border-line bg-deep py-14 text-text sm:py-20">
      <Container>
        <Logo className="h-14 w-auto sm:h-16" />

        <div className="mt-10 grid gap-9 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-dim">
              {t('contactLabel')}
            </h2>
            <p className="text-base">{t('contactName')}</p>
            {siteConfig.contact.email ? (
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-base text-lift underline underline-offset-4"
              >
                {siteConfig.contact.email}
              </a>
            ) : (
              <p className="text-base text-dim/60">{t('pending')}</p>
            )}
            {siteConfig.contact.phone ? (
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                className="text-base text-lift underline underline-offset-4"
              >
                {siteConfig.contact.phone}
              </a>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-dim">
              {t('locationLabel')}
            </h2>
            <p className="max-w-[40ch] text-base leading-relaxed">
              {t('location')}
            </p>
          </div>

          {socials.length > 0 ? (
            <div className="flex flex-col gap-2">
              <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-dim">
                {t('socialLabel')}
              </h2>
              <ul className="flex flex-wrap gap-4">
                {socials.map((key) => (
                  <li key={key}>
                    <a
                      href={siteConfig.social[key]}
                      className="text-base text-lift underline underline-offset-4"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {socialLabels[key]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-7 text-sm">
          {siteConfig.eventBannerEnabled ? (
            <p className="text-dim">{t('eventNote')}</p>
          ) : null}

          {siteConfig.privacyUrl ? (
            <a
              href={siteConfig.privacyUrl}
              className="text-dim underline underline-offset-4 hover:text-text"
            >
              {t('privacy')}
            </a>
          ) : (
            <p className="text-dim/60">
              {t('privacy')} — {t('pending')}
            </p>
          )}
        </div>
      </Container>
    </footer>
  );
}
