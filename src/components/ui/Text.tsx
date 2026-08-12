import type {ReactNode} from 'react';

/**
 * Cuerpo de texto. Tope de 65 caracteres por línea (regla dura del doc);
 * `muted` sólo se usa sobre fondo claro para no romper contraste AA.
 */
type TextProps = {
  children: ReactNode;
  size?: 'lg' | 'base' | 'sm';
  muted?: boolean;
  /** Quita el tope de ancho cuando el contenedor ya lo impone. */
  full?: boolean;
  className?: string;
};

const sizes = {
  lg: 'text-lg sm:text-xl',
  base: 'text-base sm:text-lg',
  sm: 'text-sm'
} as const;

export default function Text({
  children,
  size = 'base',
  muted = false,
  full = false,
  className = ''
}: TextProps) {
  return (
    <p
      className={`${sizes[size]} leading-relaxed ${full ? '' : 'max-w-[65ch]'} ${
        muted ? 'text-muted' : ''
      } ${className}`}
    >
      {children}
    </p>
  );
}
