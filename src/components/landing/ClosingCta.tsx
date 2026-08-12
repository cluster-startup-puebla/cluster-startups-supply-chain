import {useTranslations} from 'next-intl';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import LinkButton from '@/components/ui/LinkButton';
import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';

/**
 * Cierre de la landing.
 *
 * El levantamiento de necesidades vive en su propia página, así que la
 * landing necesita un ancla final que lo empuje: sin esto el scroll
 * terminaría en infraestructura y moriría en el footer.
 */
export default function ClosingCta() {
  const t = useTranslations('closing');

  return (
    <Section tone="crater" nodes="dense" spacing="roomy">
      <Container>
        <div className="flex max-w-3xl flex-col gap-7">
          <Heading as="h2" size="hero">
            {t('title')}
          </Heading>
          <Text size="lg" dim>
            {t('body')}
          </Text>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <LinkButton href="/necesidades">{t('cta')}</LinkButton>
            <LinkButton href="/empresas" variant="link">
              {t('ctaSecondary')}
            </LinkButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
