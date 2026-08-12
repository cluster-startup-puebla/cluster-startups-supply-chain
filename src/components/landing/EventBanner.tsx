import Image from 'next/image';
import {useTranslations} from 'next-intl';
import Container from '@/components/ui/Container';

/**
 * Sección 0 — banner temporal del evento.
 *
 * El logo va aplanado a blanco con `brightness(0) invert(1)`: sobre la
 * tinta, su versión a color exigía una pastilla blanca que rompía la
 * barra. En blanco pleno se integra y gana tamaño.
 *
 * `logo-evento-mono.webp` recorta el escudo "Puebla Cinco de Mayo" del
 * original: al aplanarse a blanco quedaba como una silueta lisa sin
 * lectura. El lockup del evento se conserva íntegro.
 *
 * Contrapartida a tener presente: el listón tricolor pierde su color. Si
 * la organización del evento exige la marca a color y con escudo, hay
 * que volver a `logo-evento.webp` sobre pastilla clara.
 *
 * Se retira con `siteConfig.eventBannerEnabled = false`.
 */
export default function EventBanner() {
  const t = useTranslations('eventBanner');

  return (
    <div className="border-b border-line bg-deep">
      <Container width="wide" className="py-3">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Image
            src="/logo-evento-mono.webp"
            alt={t('logoAlt')}
            width={876}
            height={300}
            className="h-11 w-auto [filter:brightness(0)_invert(1)] sm:h-14"
          />
          <p className="text-center text-xs font-bold leading-snug tracking-tight text-dim sm:text-sm">
            {t('stand')}
          </p>
        </div>
      </Container>
    </div>
  );
}
