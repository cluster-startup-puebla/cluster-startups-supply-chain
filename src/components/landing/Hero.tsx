import {useTranslations} from 'next-intl';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';
import {siteConfig} from '@/config/site';

/**
 * Sección 1 — hero. Sin video ni imagen de fondo: tiene que pintar en
 * 4G saturado, de pie en un pasillo de expo.
 */
export default function Hero() {
  const t = useTranslations('hero');

  return (
    <Section tone="paper" className="flex min-h-[58svh] items-center sm:min-h-[72svh]">
      <Container>
        <div className="flex flex-col gap-5 sm:gap-8">
          <Heading as="h1" size="xl">
            {t('title')}
          </Heading>

          <Text size="lg" muted>
            {t('subtitle')}
          </Text>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Button href={`#${siteConfig.anchors.form}`}>
              {t('ctaPrimary')}
            </Button>
            <Button href={`#${siteConfig.anchors.model}`} variant="link">
              {t('ctaSecondary')}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
