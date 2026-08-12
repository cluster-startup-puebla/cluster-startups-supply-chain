import type {ReactNode} from 'react';

/**
 * Cuerpo de texto. Tope de 65 caracteres por línea (regla dura del doc).
 * `dim` no es gris neutro: es un lila desaturado del propio mundo, para
 * que el texto secundario pertenezca al bloque en vez de apagarse.
 */
type TextProps = {
  children: ReactNode;
  size?: 'lg' | 'base' | 'sm';
  dim?: boolean;
  full?: boolean;
  className?: string;
};

const sizes = {
  lg: 'text-lg sm:text-xl',
  base: 'text-base sm:text-lg',
  sm: 'text-sm sm:text-base'
} as const;

export default function Text({
  children,
  size = 'base',
  dim = false,
  full = false,
  className = ''
}: TextProps) {
  return (
    <p
      className={`${sizes[size]} leading-relaxed ${full ? '' : 'max-w-[65ch]'} ${
        dim ? 'text-dim' : ''
      } ${className}`}
    >
      {children}
    </p>
  );
}
