import Image from 'next/image';
import {useTranslations} from 'next-intl';

/**
 * Logo del clúster.
 *
 * `public/logo-cluster.webp` sale del PNG original recortado y con el
 * blanco hecho transparente, así que también sirve sobre fondo de color.
 * Ningún otro componente conoce la ruta: se cambia sólo aquí.
 */
export default function Logo({className = ''}: {className?: string}) {
  const t = useTranslations('header');

  return (
    <Image
      src="/logo-cluster.webp"
      alt={t('logoAlt')}
      width={972}
      height={400}
      priority
      className={`h-10 w-auto sm:h-12 ${className}`}
    />
  );
}
