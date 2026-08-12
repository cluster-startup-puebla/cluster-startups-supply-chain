import {useTranslations} from 'next-intl';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Icon, {type IconName} from '@/components/ui/Icon';
import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';

/**
 * Sección 6 — por qué el clúster.
 *
 * Prueba, no promesa. Sobre Google y NVIDIA se afirma co-ubicación,
 * jamás propiedad ni sociedad (cajón 3 del inventario honesto).
 */
const items: readonly {key: string; icon: IconName}[] = [
  {key: 'infrastructure', icon: 'building'},
  {key: 'model', icon: 'node'},
  {key: 'institutional', icon: 'check'},
  {key: 'recognition', icon: 'cube'}
];

export default function Credibility() {
  const t = useTranslations('credibility');

  return (
    <Section tone="paper" className="border-t border-hairline">
      <Container>
        <div className="flex flex-col gap-6 sm:gap-12">
          <Heading as="h2" size="lg">
            {t('title')}
          </Heading>

          <ul className="grid gap-6 sm:gap-8 sm:grid-cols-2">
            {items.map(({key, icon}) => (
              <li key={key} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-pink/10 text-pink">
                  <Icon name={icon} className="size-5" />
                </span>
                <div>
                  <Heading as="h3" size="sm">
                    {t(`items.${key}.title`)}
                  </Heading>
                  <Text className="mt-2" muted full>
                    {t(`items.${key}.body`)}
                  </Text>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
