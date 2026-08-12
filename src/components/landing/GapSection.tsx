import {useTranslations} from 'next-intl';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Icon, {type IconName} from '@/components/ui/Icon';
import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';
import {siteConfig} from '@/config/site';

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
    <Section tone="paper">
      <Container>
        <div className="flex flex-col gap-6 sm:gap-12">
          <Heading as="h2" size="lg" className="max-w-4xl">
            {t('title')}
          </Heading>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {cases.map(({key, icon}) => (
              <Card key={key}>
                <Icon name={icon} className="size-8 text-pink" />
                <Heading as="h3" size="sm" className="mt-4">
                  {t(`${key}.title`)}
                </Heading>
                <Text className="mt-3" muted full>
                  {t(`${key}.body`)}
                </Text>
              </Card>
            ))}
          </div>

          <div>
            <Button href={`#${siteConfig.anchors.form}`}>{t('cta')}</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
