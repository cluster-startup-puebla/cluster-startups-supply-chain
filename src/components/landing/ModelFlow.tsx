import {useTranslations} from 'next-intl';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Icon, {type IconName} from '@/components/ui/Icon';
import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';
import {siteConfig} from '@/config/site';

/**
 * Sección 5 — cómo funciona el modelo.
 *
 * Cuatro nodos encadenados: el mismo círculo luminoso del campo, ahora
 * conectado por una línea que se enciende de magenta. Es la traducción
 * visual del recorrido N1 → N5, y el único sitio donde los nodos se
 * tocan entre sí. Horizontal en escritorio, vertical en celular.
 */
const steps: readonly {key: string; icon: IconName}[] = [
  {key: 'challenge', icon: 'factory'},
  {key: 'talent', icon: 'rocket'},
  {key: 'solution', icon: 'chip'},
  {key: 'scale', icon: 'trending'}
];

export default function ModelFlow() {
  const t = useTranslations('model');

  return (
    <Section tone="raised" id={siteConfig.anchors.model}>
      <Container>
        <div className="flex flex-col gap-8 sm:gap-14">
          <Heading as="h2" size="xl">
            {t('title')}
          </Heading>

          <ol className="relative flex flex-col gap-0 md:flex-row">
            {steps.map(({key, icon}, index) => (
              <li
                key={key}
                className="relative flex flex-1 gap-5 pb-9 last:pb-0 md:flex-col md:gap-5 md:pb-0"
              >
                {/* Hilo que conecta los nodos: vertical en móvil, horizontal en escritorio. */}
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-[1.375rem] top-12 bottom-1 w-px bg-gradient-to-b from-magenta to-transparent md:left-12 md:right-0 md:top-[1.375rem] md:bottom-auto md:h-px md:w-auto md:bg-gradient-to-r"
                  />
                ) : null}

                <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-raised text-lift shadow-[0_0_20px_-4px_var(--magenta)]">
                  <Icon name={icon} className="size-5" />
                </span>

                <div className="md:pr-8">
                  <span className="block text-base font-bold leading-snug tracking-tight sm:text-lg">
                    {t(`steps.${key}`)}
                  </span>
                </div>
              </li>
            ))}
          </ol>

          <Text dim>{t('body')}</Text>
        </div>
      </Container>
    </Section>
  );
}
