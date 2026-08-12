import {useTranslations} from 'next-intl';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import LinkButton from '@/components/ui/LinkButton';
import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';
import {siteConfig} from '@/config/site';

/**
 * Sección 1 — hero.
 *
 * El titular se parte en dos pesos sobre el cráter: la primera línea
 * nombra lo que somos, la segunda dónde. Sin imagen ni video: el
 * ambiente lo pintan gradientes, así que el primer viewport cabe en el
 * presupuesto de 3 s en 4G saturado.
 */
export default function Hero() {
  const t = useTranslations('hero');

  return (
    <Section tone="crater" nodes="hero" spacing="roomy" className="flex min-h-[76svh] items-center">
      <Container>
        <div className="flex max-w-4xl flex-col gap-7 sm:gap-9">
          <h1 className="text-balance">
            <span className="block text-[2.6rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              {t('titleLead')}
            </span>
            <span className="mt-1 block text-[1.9rem] font-normal leading-[1.12] tracking-[-0.02em] text-dim sm:mt-2 sm:text-5xl lg:text-6xl">
              {t('titleTail')}
            </span>
          </h1>

          <Text size="lg" dim>
            {t('subtitle')}
          </Text>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
            <LinkButton href="/necesidades">{t('ctaPrimary')}</LinkButton>
            <Button href={`#${siteConfig.anchors.model}`} variant="link">
              {t('ctaSecondary')}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
