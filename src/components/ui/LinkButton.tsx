import type {ComponentProps, ReactNode} from 'react';
import {Link} from '@/i18n/navigation';
import {buttonClasses, type ButtonVariant} from './Button';

/**
 * Enlace de navegación con aspecto de botón.
 *
 * Usa el `Link` de next-intl, no `<a>`, para que las rutas traducidas
 * resuelvan solas: `/necesidades` en español y `/needs` en inglés.
 */
type LinkButtonProps = {
  children: ReactNode;
  href: ComponentProps<typeof Link>['href'];
  variant?: ButtonVariant;
  block?: boolean;
  className?: string;
};

export default function LinkButton({
  children,
  href,
  variant = 'primary',
  block = false,
  className = ''
}: LinkButtonProps) {
  return (
    <Link href={href} className={buttonClasses({variant, block, className})}>
      {children}
    </Link>
  );
}
