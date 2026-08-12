import {useTranslations} from 'next-intl';

/**
 * Ranura del logo.
 *
 * PENDIENTE: sustituir el wordmark por el archivo real. Cuando llegue,
 * dejarlo en `public/logo.svg` y cambiar el cuerpo por:
 *
 *   <Image src="/logo.svg" alt={t('logoAlt')} width={140} height={32}
 *          priority className="h-8 w-auto" />
 *
 * Ningún otro componente conoce el logo: se cambia sólo aquí.
 */
export default function Logo({className = ''}: {className?: string}) {
  const t = useTranslations('header');

  return (
    <span
      className={`text-base font-bold tracking-tight ${className}`}
      aria-label={t('logoAlt')}
    >
      CLÚSTER<span className="text-pink">.</span>
    </span>
  );
}
