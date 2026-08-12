import {useTranslations} from 'next-intl';
import Container from '@/components/ui/Container';
import {siteConfig} from '@/config/site';

/**
 * Sección 9 — footer.
 *
 * Los datos de contacto y redes viven en `siteConfig`. Mientras estén
 * vacíos se muestra "Por confirmar" en vez de un enlace roto.
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
    <footer className="bg-ink py-12 text-white sm:py-16">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wide opacity-60">
              {t('contactLabel')}
            </h2>
            <p className="text-base">{t('contactName')}</p>
            {siteConfig.contact.email ? (
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-base underline underline-offset-4"
              >
                {siteConfig.contact.email}
              </a>
            ) : (
              <p className="text-base opacity-50">{t('pending')}</p>
            )}
            {siteConfig.contact.phone ? (
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                className="text-base underline underline-offset-4"
              >
                {siteConfig.contact.phone}
              </a>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wide opacity-60">
              {t('locationLabel')}
            </h2>
            <p className="max-w-[40ch] text-base leading-relaxed">
              {t('location')}
            </p>
          </div>

          {socials.length > 0 ? (
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-bold uppercase tracking-wide opacity-60">
                {t('socialLabel')}
              </h2>
              <ul className="flex flex-wrap gap-4">
                {socials.map((key) => (
                  <li key={key}>
                    <a
                      href={siteConfig.social[key]}
                      className="text-base underline underline-offset-4"
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

        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm">
          {siteConfig.eventBannerEnabled ? (
            <p className="opacity-70">{t('eventNote')}</p>
          ) : null}

          {siteConfig.privacyUrl ? (
            <a
              href={siteConfig.privacyUrl}
              className="underline underline-offset-4"
            >
              {t('privacy')}
            </a>
          ) : (
            <p className="opacity-50">
              {t('privacy')} — {t('pending')}
            </p>
          )}
        </div>
      </Container>
    </footer>
  );
}
