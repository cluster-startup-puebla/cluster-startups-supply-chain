import type {ComponentPropsWithoutRef, ReactNode} from 'react';

/**
 * Botón / enlace de acción.
 *
 * `outline` y `link` usan `currentColor`, así que funcionan igual sobre
 * fondo blanco, navy o rosa sin variantes adicionales.
 *
 * Altura mínima 48px y ancho completo en móvil (regla dura del doc).
 */
type Variant = 'primary' | 'outline' | 'link';

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  /** Ancho completo también en escritorio. */
  block?: boolean;
  className?: string;
};

type ButtonAsLink = BaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof BaseProps> & {href: string};

type ButtonAsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof BaseProps> & {href?: never};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 text-base font-bold ' +
  'transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ' +
  'disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-pink text-white hover:bg-pink/90',
  outline: 'border-2 border-current text-current hover:bg-current/10',
  link: 'min-h-12 px-0 underline underline-offset-4 text-current hover:opacity-80'
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
