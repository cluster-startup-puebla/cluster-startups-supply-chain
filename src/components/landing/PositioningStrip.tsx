import {useTranslations} from 'next-intl';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

/**
 * Sección 2 — posicionamiento en una línea.
 *
 * Es la frase que se repite en el pitch, el one-pager y aquí. Va sola en
 * su franja: si comparte bloque, deja de leerse como declaración.
 */
export default function PositioningStrip() {
  const t = useTranslations('positioning');

  return (
    <Section tone="pink" spacing="tight">
      <Container>
        <p className="text-balance text-xl font-bold leading-snug sm:text-3xl">
          {t('text')}
        </p>
      </Container>
    </Section>
  );
}
