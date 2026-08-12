import type {ComponentPropsWithoutRef, ReactNode} from 'react';

/**
 * Botón / enlace de acción.
 *
 * `primary` es el único elemento de la página que lleva rosa lleno, para
 * que la conversión no compita con nada. `outline` y `link` usan
 * `currentColor` y funcionan sobre cualquier bloque del mundo oscuro.
 *
 * Altura mínima 48px y ancho completo en móvil (regla dura del doc).
 */
type Variant = 'primary' | 'outline' | 'link';

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  block?: boolean;
  className?: string;
};

type ButtonAsLink = BaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof BaseProps> & {href: string};

type ButtonAsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof BaseProps> & {href?: never};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-base font-bold tracking-tight ' +
  'transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-rosa ' +
  'disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-rosa text-white shadow-[0_8px_28px_-8px_var(--rosa)] hover:bg-lift hover:shadow-[0_12px_34px_-8px_var(--magenta-lift)]',
  outline:
    'border border-[var(--line-strong)] text-current hover:border-lift hover:bg-white/5',
  link: 'min-h-12 px-0 text-current underline decoration-rosa decoration-2 underline-offset-[6px] hover:text-lift'
};

export default function Button({
  children,
  variant = 'primary',
  block = false,
  className = '',
  ...rest
}: ButtonProps) {
  const width = block ? 'w-full' : 'w-full sm:w-auto';
  const classes = `${base} ${variants[variant]} ${width} ${className}`;

  if ('href' in rest && rest.href !== undefined) {
    const {href, ...anchorProps} = rest as ButtonAsLink;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const {type = 'button', ...buttonProps} = rest as ButtonAsButton;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
