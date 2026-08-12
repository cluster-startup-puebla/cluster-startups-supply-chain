import Image from 'next/image';
import {useTranslations} from 'next-intl';
import Container from '@/components/ui/Container';

/**
 * Sección 0 — banner temporal del evento.
 *
 * El logo va a color original. Sobre la tinta su texto negro se
 * perdería, así que lleva un filo blanco que lo separa del fondo.
 *
 * El filo viene HORNEADO en `logo-evento-filo.webp`, no de un filtro
 * CSS. La versión anterior encadenaba cuatro `drop-shadow` de 0.75px y
 * en Safari no se veía: WebKit redondea a cero los desplazamientos
 * subpíxel de `drop-shadow`, así que las cuatro sombras caían justo
 * debajo del arte. Hornearlo lo hace idéntico en todos los navegadores y
 * ahorra cuatro filtros por pintado.
 *
 * El asset se regenera dilatando el canal alfa del original:
 *   magick public/logo-evento.webp -alpha set -bordercolor none -border 20 \
 *     \( +clone -alpha extract -morphology Dilate Disk:5 \
 *        -background white -alpha shape \) \
 *     +swap -composite -trim +repage -resize x300 \
 *     public/logo-evento-filo.webp
 *
 * El radio va en escala del original (300px de alto). En pantalla el
 * logo mide ~55px, así que Disk:5 se reduce a un filo de ~0.9px: subir
 * el radio engorda el filo.
 *
 * Se retira con `siteConfig.eventBannerEnabled = false`.
 */
export default function EventBanner() {
  const t = useTranslations('eventBanner');

  return (
    <div className="border-b border-line bg-deep">
      <Container className="py-5">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Image
            src="/logo-evento-filo.webp"
            alt={t('logoAlt')}
            width={1082}
            height={300}
            className="h-[3.3rem] w-auto sm:h-[4.2rem]"
          />
          <p className="text-center text-xs font-bold leading-snug tracking-tight text-dim sm:text-sm">
            {t('stand')}
          </p>
        </div>
      </Container>
    </div>
  );
}
