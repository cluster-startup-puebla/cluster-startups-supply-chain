import {useTranslations} from 'next-intl';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Icon, {type IconName} from '@/components/ui/Icon';
import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';

/**
 * Sección 6 — por qué el clúster.
 *
 * Prueba, no promesa. Sin tarjetas: una lista de filos, para que el
 * bloque respire después de las cuatro rutas. Sobre Google y NVIDIA se
 * afirma co-ubicación, jamás propiedad ni sociedad.
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
    <Section tone="void">
      <Container>
        <div className="flex flex-col gap-8 sm:gap-14">
          <Heading as="h2" size="xl">
            {t('title')}
          </Heading>

          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-[var(--line)] sm:grid-cols-2">
            {items.map(({key, icon}) => (
              <li key={key} className="bg-ink p-6 sm:p-8">
                <span className="flex size-10 items-center justify-center rounded-full border border-line bg-white/5 text-lift">
                  <Icon name={icon} className="size-[1.15rem]" />
                </span>
                <Heading as="h3" size="sm" className="mt-4">
                  {t(`items.${key}.title`)}
                </Heading>
                <Text size="sm" className="mt-2" dim full>
                  {t(`items.${key}.body`)}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
