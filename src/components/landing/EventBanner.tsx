import Image from 'next/image';
import {useTranslations} from 'next-intl';
import Container from '@/components/ui/Container';

/**
 * Sección 0 — banner temporal del evento.
 *
 * El logo va a color original. Sobre la tinta, su texto negro se
 * perdería, así que lleva un contorno blanco hecho con `drop-shadow`
 * encadenados: cada uno desplaza la silueta un píxel y la pinta de
 * blanco, de modo que el filo sigue el recorte real del arte en lugar de
 * encerrarlo en un marco.
 *
 * Se retira con `siteConfig.eventBannerEnabled = false`.
 */
const WHITE_STROKE =
  'drop-shadow(1px 0 0 #fff) drop-shadow(-1px 0 0 #fff) ' +
  'drop-shadow(0 1px 0 #fff) drop-shadow(0 -1px 0 #fff)';

export default function EventBanner() {
  const t = useTranslations('eventBanner');

  return (
    <div className="border-b border-line bg-deep">
      <Container className="py-5">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Image
            src="/logo-evento.webp"
            alt={t('logoAlt')}
            width={1108}
            height={300}
            className="h-[3.3rem] w-auto sm:h-[4.2rem]"
            style={{filter: WHITE_STROKE}}
          />
          <p className="text-center text-xs font-bold leading-snug tracking-tight text-dim sm:text-sm">
            {t('stand')}
          </p>
        </div>
      </Container>
    </div>
  );
}
