import type {ReactNode} from 'react';

/**
 * Bloque de página con fondo de marca.
 *
 * Los hijos heredan el color de texto vía `currentColor`, así que los
 * átomos (Button outline, Card, BulletList) se adaptan solos al tono
 * sin recibir props extra.
 */
export type SectionTone = 'paper' | 'navy' | 'pink' | 'ink';

type SectionProps = {
  children: ReactNode;
  tone?: SectionTone;
  id?: string;
  /** `tight` para franjas de una línea. */
  spacing?: 'tight' | 'default';
  className?: string;
};

const tones: Record<SectionTone, string> = {
  paper: 'bg-paper text-foreground',
  navy: 'bg-navy text-white',
  pink: 'bg-pink text-white',
  ink: 'bg-ink text-white'
};

/**
 * Compacto en móvil: el doc exige que el formulario se alcance en menos
 * de 6 pantallazos. En escritorio el aire se recupera.
 */
const spacings = {
  tight: 'py-6 sm:py-10',
  default: 'py-10 sm:py-20'
} as const;

export default function Section({
  children,
  tone = 'paper',
  id,
  spacing = 'default',
  className = ''
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${tones[tone]} ${spacings[spacing]} ${className}`}
    >
      {children}
    </section>
  );
}
