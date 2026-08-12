import type {ReactNode} from 'react';
import NodeField, {type NodeFieldVariant} from './NodeField';

/**
 * Bloque de página sobre el suelo de tinta.
 *
 * El ritmo no viene de alternar claro y oscuro, sino de alternar
 * densidad de luz: bloques con cráter y nodos contra bloques callados.
 * Un pasaje denso se gana uno tranquilo.
 */
export type SectionTone = 'void' | 'crater' | 'craterSoft' | 'raised' | 'deep';

type SectionProps = {
  children: ReactNode;
  tone?: SectionTone;
  /** Campo de nodos sobre el fondo; se omite si no se indica. */
  nodes?: NodeFieldVariant;
  id?: string;
  spacing?: 'tight' | 'default' | 'roomy';
  className?: string;
};

const tones: Record<SectionTone, string> = {
  void: 'bg-ink',
  crater: 'bg-ink crater',
  craterSoft: 'bg-ink crater-soft',
  raised: 'bg-raised edge-lit',
  deep: 'bg-deep'
};

const spacings = {
  tight: 'py-7 sm:py-10',
  default: 'py-14 sm:py-24',
  roomy: 'py-20 sm:py-32'
} as const;

export default function Section({
  children,
  tone = 'void',
  nodes,
  id,
  spacing = 'default',
  className = ''
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden text-text ${tones[tone]} ${spacings[spacing]} ${className}`}
    >
      {nodes ? <NodeField variant={nodes} /> : null}
      <div className="relative">{children}</div>
    </section>
  );
}
