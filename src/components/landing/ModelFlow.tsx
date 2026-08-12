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
 * Diagrama, nunca texto corrido: horizontal en escritorio, vertical en
 * celular. Es la traducción visual del recorrido N1 → N5.
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
    <Section tone="paper" id={siteConfig.anchors.model}>
      <Container>
        <div className="flex flex-col gap-6 sm:gap-12">
          <Heading as="h2" size="lg">
            {t('title')}
          </Heading>

          <ol className="flex flex-col gap-2 md:flex-row md:items-stretch">
            {steps.map(({key, icon}, index) => (
              <li
                key={key}
                className="flex flex-col items-center gap-2 md:flex-1 md:flex-row md:gap-2"
              >
                <div className="flex w-full flex-col items-center gap-3 rounded-xl border-2 border-navy/20 bg-navy/5 px-4 py-6 text-center md:h-full md:justify-start">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                    <Icon name={icon} className="size-6" />
                  </span>
                  <span className="text-balance text-sm font-bold leading-snug text-navy sm:text-base">
                    {t(`steps.${key}`)}
                  </span>
                </div>

                {index < steps.length - 1 ? (
                  <span aria-hidden="true" className="shrink-0 text-pink">
                    <Icon name="arrowDown" className="size-6 md:hidden" />
                    <Icon name="arrowRight" className="hidden size-6 md:block" />
                  </span>
                ) : null}
              </li>
            ))}
          </ol>

          <Text muted>{t('body')}</Text>
        </div>
      </Container>
    </Section>
  );
}
