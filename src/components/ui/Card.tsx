import type {ReactNode} from 'react';

/**
 * Tarjeta de borde. Usa `currentColor` al 25% para el borde, así que
 * se ve correcta sobre blanco y sobre navy sin variantes.
 */
type CardProps = {
  children: ReactNode;
  /** Rellena el fondo con un velo del color de texto del bloque. */
  filled?: boolean;
  className?: string;
};

export default function Card({
  children,
  filled = false,
  className = ''
}: CardProps) {
  return (
    <div
      className={`flex h-full flex-col rounded-xl border-2 border-current/25 p-5 sm:p-8 ${
        filled ? 'bg-current/5' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
