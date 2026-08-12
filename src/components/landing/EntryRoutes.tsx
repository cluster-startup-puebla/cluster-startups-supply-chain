import {useTranslations} from 'next-intl';
import BulletList from '@/components/ui/BulletList';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import Icon, {type IconName} from '@/components/ui/Icon';
import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';
import {profileKeys, type ProfileKey} from '@/config/site';
import ProfileCtaButton from './ProfileCtaButton';

/**
 * Sección 4 — cuatro rutas de entrada.
 *
 * Industria va primero porque es el tráfico dominante. Cada CTA baja al
 * formulario dejando el perfil preseleccionado: esa clasificación es lo
 * que hace útil la base de leads después.
 */
const icons: Record<Exclude<ProfileKey, 'other'>, IconName> = {
  industry: 'factory',
  startup: 'rocket',
  investor: 'trending',
  academia: 'school'
};

const routeKeys = profileKeys.filter(
  (key): key is Exclude<ProfileKey, 'other'> => key !== 'other'
);

export default function EntryRoutes() {
  const t = useTranslations('routes');

  return (
    <Section tone="void" nodes="dense">
      <Container>
        <div className="flex flex-col gap-8 sm:gap-14">
          <div className="flex flex-col gap-4">
            <Heading as="h2" size="xl">
              {t('title')}
            </Heading>
            <Text dim>{t('subtitle')}</Text>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {routeKeys.map((key, index) => (
              <Card key={key} lit={index === 0}>
                <span className="flex size-11 items-center justify-center rounded-full border border-line bg-white/5 text-lift">
                  <Icon name={icons[key]} className="size-5" />
                </span>

                <Heading as="h3" size="md" className="mt-5">
                  {t(`${key}.title`)}
                </Heading>

                <Text className="mt-3" dim full>
                  {t(`${key}.intro`)}
                </Text>

                <BulletList
                  className="mt-6"
                  items={t.raw(`${key}.items`) as string[]}
                />

                <div className="mt-auto pt-7">
                  <ProfileCtaButton profile={key}>
                    {t(`${key}.cta`)}
                  </ProfileCtaButton>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
