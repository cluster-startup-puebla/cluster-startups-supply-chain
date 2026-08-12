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
 * nunca por stock genérico de gente sonriendo con tablets.
 *
 * 1 columna en móvil, 3 en escritorio (spec del doc).
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
    <Section tone="craterSoft" nodes="sparse">
      <Container>
        <div className="flex flex-col gap-8 sm:gap-14">
          <div className="flex flex-col gap-4">
            <Heading as="h2" size="xl">
              {t('title')}
            </Heading>
            <Text dim>{t('subtitle')}</Text>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {items.map(({key, icon}) => (
              <Card key={key}>
                <span className="flex size-11 items-center justify-center rounded-full border border-line bg-white/5 text-lift">
                  <Icon name={icon} className="size-5" />
                </span>
                <Heading as="h3" size="sm" className="mt-5">
                  {t(`items.${key}.title`)}
                </Heading>
                <Text size="sm" className="mt-2" dim full>
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
