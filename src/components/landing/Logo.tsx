import Image from 'next/image';
import {useTranslations} from 'next-intl';

/**
 * Logo del clúster, en blanco sólido.
 *
 * El archivo original combina magenta con gris medio; ese gris se hunde
 * sobre la tinta. En vez de mantener una segunda copia recoloreada, se
 * aplana con `brightness(0) invert(1)`, que lleva a blanco cualquier
 * píxel opaco y respeta el canal alfa. Un solo archivo, cero deriva
 * entre variantes.
 *
 * Ningún otro componente conoce la ruta ni el filtro: se cambia aquí.
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
      className={`[filter:brightness(0)_invert(1)] ${className || 'h-14 w-auto sm:h-16'}`}
    />
  );
}
