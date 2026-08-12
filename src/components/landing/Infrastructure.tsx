import {useTranslations} from 'next-intl';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Icon, {type IconName} from '@/components/ui/Icon';
import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';

/**
 * Sección 7 — infraestructura.
 *
 * Este público cree en fierros, no en conceptos. Los íconos son
 * marcadores: se sustituyen por fotos reales del Hub en cuanto existan,
 * nunca por stock genérico.
 */
const items: readonly {key: string; icon: IconName}[] = [
  {key: 'hub', icon: 'building'},
  {key: 'fablab', icon: 'cube'},
  {key: 'ai', icon: 'chip'},
  {key: 'labs', icon: 'flask'},
  {key: 'nodes', icon: 'node'}
];

export default function Infrastructure() {
  const t = useTranslations('infrastructure');

  return (
    <Section tone="navy">
      <Container>
        <div className="flex flex-col gap-6 sm:gap-12">
          <div className="flex flex-col gap-3">
            <Heading as="h2" size="lg">
              {t('title')}
            </Heading>
            <Text className="opacity-80">{t('subtitle')}</Text>
          </div>

          {/* 1 columna en móvil, 3 en escritorio (spec del doc). */}
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {items.map(({key, icon}) => (
              <Card key={key} filled>
                <Icon name={icon} className="size-8 text-pink" />
                <Heading as="h3" size="sm" className="mt-3">
                  {t(`items.${key}.title`)}
                </Heading>
                <Text size="sm" className="mt-2 opacity-80" full>
                  {t(`items.${key}.body`)}
                </Text>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
