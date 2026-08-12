import Image from 'next/image';
import {useTranslations} from 'next-intl';
import Container from '@/components/ui/Container';

/**
 * Sección 0 — banner temporal del evento.
 *
 * El logo va a color original. Sobre la tinta, su texto negro se
 * perdería, así que lleva un contorno blanco hecho con `drop-shadow`
 * encadenados: cada uno desplaza la silueta y la pinta de blanco, de
 * modo que el filo sigue el recorte real del arte en lugar de encerrarlo
 * en un marco.
 *
 * Se retira con `siteConfig.eventBannerEnabled = false`.
 */
/**
 * El grosor del filo es el desplazamiento de cada sombra. A 1px el
 * contorno competía con el arte; 0.75px lo adelgaza sin dejar de separar
 * el texto negro del fondo. Es la única perilla: subirlo engorda el filo.
 */
const STROKE_WIDTH = '0.75px';

const WHITE_STROKE =
  `drop-shadow(${STROKE_WIDTH} 0 0 #fff) drop-shadow(-${STROKE_WIDTH} 0 0 #fff) ` +
  `drop-shadow(0 ${STROKE_WIDTH} 0 #fff) drop-shadow(0 -${STROKE_WIDTH} 0 #fff)`;

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
