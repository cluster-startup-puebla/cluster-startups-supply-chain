import {useTranslations} from 'next-intl';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

/**
 * Sección 2 — posicionamiento en una línea.
 *
 * Es la frase que se repite en el pitch, el one-pager y aquí. Va sola en
 * su bloque, sobre la superficie elevada: si comparte sitio, deja de
 * leerse como declaración.
 */
export default function PositioningStrip() {
  const t = useTranslations('positioning');

  return (
    <Section tone="raised" spacing="tight">
      <Container>
        <p className="text-balance py-4 text-xl font-bold leading-[1.18] tracking-[-0.025em] sm:text-3xl lg:text-4xl">
          {t('text')}
        </p>
      </Container>
    </Section>
  );
}
