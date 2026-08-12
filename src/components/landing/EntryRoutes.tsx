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
    <Section tone="navy">
      <Container>
        <div className="flex flex-col gap-6 sm:gap-12">
          <div className="flex flex-col gap-3">
            <Heading as="h2" size="lg">
              {t('title')}
            </Heading>
            <Text className="opacity-80">{t('subtitle')}</Text>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {routeKeys.map((key) => (
              <Card key={key} filled>
                <Icon name={icons[key]} className="size-8 text-pink" />

                <Heading as="h3" size="sm" className="mt-4">
                  {t(`${key}.title`)}
                </Heading>

                <Text className="mt-3 opacity-80" full>
                  {t(`${key}.intro`)}
                </Text>

                <BulletList
                  className="mt-6"
                  items={t.raw(`${key}.items`) as string[]}
                />

                <div className="mt-auto pt-6">
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
