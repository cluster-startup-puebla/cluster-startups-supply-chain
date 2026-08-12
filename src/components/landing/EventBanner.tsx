import Image from 'next/image';
import {useTranslations} from 'next-intl';
import Container from '@/components/ui/Container';

/**
 * Sección 0 — banner temporal del evento.
 *
 * El logo del evento lleva texto negro, así que va sobre una pastilla
 * blanca: sobre el navy de la barra sería ilegible. El propio logo ya
 * dice fechas y sede, de modo que el texto sólo aporta el stand.
 *
 * Se retira con `siteConfig.eventBannerEnabled = false`.
 */
export default function EventBanner() {
  const t = useTranslations('eventBanner');

  return (
    <div className="bg-navy text-white">
      <Container width="wide" className="py-2">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <span className="inline-flex rounded bg-white px-2 py-1">
            <Image
              src="/logo-evento.webp"
              alt={t('logoAlt')}
              width={1108}
              height={300}
              className="h-8 w-auto sm:h-10"
            />
          </span>
          <p className="text-center text-xs font-bold leading-snug sm:text-sm">
            {t('stand')}
          </p>
        </div>
      </Container>
    </div>
  );
}
