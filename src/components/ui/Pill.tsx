import type {ReactNode} from 'react';

/**
 * Etiqueta corta en píldora.
 *
 * Para datos que se leen de un vistazo y no se leen como frase: las
 * industrias a las que sirve una empresa. Un renglón de prosa en esa
 * posición obliga a leer; cuatro píldoras se escanean.
 *
 * Van sobre superficie tenue en vez de rosa sólido: son clasificación,
 * no llamada a la acción, y varias píldoras en color pelean con el
 * titular que tienen encima.
 */
type PillProps = {
  children: ReactNode;
  className?: string;
};

export default function Pill({children, className = ''}: PillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line bg-white/[0.04] px-3.5 py-1.5 text-sm leading-tight text-dim ${className}`}
    >
      {children}
    </span>
  );
}
