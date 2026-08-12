import {useTranslations} from 'next-intl';
import Container from '@/components/ui/Container';

/**
 * Sección 0 — banner temporal del evento.
 *
 * Se retira poniendo `siteConfig.eventBannerEnabled` en `false`; ninguna
 * otra sección depende de él.
 */
export default function EventBanner() {
  const t = useTranslations('eventBanner');

  return (
    <div className="bg-navy text-white">
      <Container width="wide" className="py-2">
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-xs leading-snug sm:text-sm">
          <span className="font-bold">{t('event')}</span>
          <span aria-hidden="true" className="opacity-50">
            ·
          </span>
          <span>{t('stand')}</span>
          <span aria-hidden="true" className="opacity-50">
            ·
          </span>
          <span className="opacity-90">{t('when')}</span>
        </p>
      </Container>
    </div>
  );
}
