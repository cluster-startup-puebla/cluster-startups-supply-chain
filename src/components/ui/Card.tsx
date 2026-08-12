import type {ReactNode} from 'react';

/**
 * Superficie elevada: vidrio muy tenue con filo de luz arriba, como si
 * el bloque recibiera el resplandor del cráter. Sustituye a la tarjeta
 * con borde duro, que sobre tinta se lee como recuadro pegado.
 */
type CardProps = {
  children: ReactNode;
  /** Realza la tarjeta cuando es el foco del bloque. */
  lit?: boolean;
  className?: string;
};

export default function Card({
  children,
  lit = false,
  className = ''
}: CardProps) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border border-line bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-200 sm:p-8 ${
        lit ? 'shadow-[0_24px_60px_-30px_var(--magenta)]' : ''
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
      {children}
    </div>
  );
}
