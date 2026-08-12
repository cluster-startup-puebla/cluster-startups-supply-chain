import {useTranslations} from 'next-intl';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Icon, {type IconName} from '@/components/ui/Icon';
import LinkButton from '@/components/ui/LinkButton';
import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';

/**
 * Sección 3 — el hueco que llenamos.
 *
 * Es el argumento de existencia del clúster frente a un evento de
 * proveeduría. Si la página se recorta, esta sección se queda.
 */
const cases: readonly {key: 'supplier' | 'buyer'; icon: IconName}[] = [
  {key: 'supplier', icon: 'alert'},
  {key: 'buyer', icon: 'search'}
];

export default function GapSection() {
  const t = useTranslations('gap');

  return (
    <Section tone="craterSoft">
      <Container>
        <div className="flex flex-col gap-8 sm:gap-14">
          <Heading as="h2" size="xl" className="max-w-3xl">
            {t('title')}
          </Heading>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {cases.map(({key, icon}) => (
              <Card key={key}>
                <span className="flex size-11 items-center justify-center rounded-full border border-line bg-white/5 text-lift">
                  <Icon name={icon} className="size-5" />
                </span>
                <Heading as="h3" size="md" className="mt-5">
                  {t(`${key}.title`)}
                </Heading>
                <Text className="mt-3" dim full>
                  {t(`${key}.body`)}
                </Text>
              </Card>
            ))}
          </div>

          <div>
            <LinkButton href="/necesidades">{t('cta')}</LinkButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
