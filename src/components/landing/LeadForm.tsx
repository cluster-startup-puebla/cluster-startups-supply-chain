'use client';

import {useActionState} from 'react';
import {useTranslations} from 'next-intl';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Field from '@/components/ui/Field';
import Heading from '@/components/ui/Heading';
import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/Section';
import Text from '@/components/ui/Text';
import {Checkbox, Input, Select, Textarea} from '@/components/ui/inputs';
import {profileKeys, siteConfig} from '@/config/site';
import {submitLead} from '@/lib/leads/actions';
import {initialLeadFormState, type LeadField} from '@/lib/leads/schema';
import {useLeadForm} from './lead-form-context';

/**
 * Sección 8 — formulario de captura.
 *
 * Es el único objetivo medible de la página: ocho campos, ni uno más.
 * El campo "reto" es opcional pero es el de mayor valor de toda la web.
 */
export default function LeadForm() {
  const t = useTranslations('form');
  const {profile, setProfile} = useLeadForm();
  const [state, formAction, isPending] = useActionState(
    submitLead,
    initialLeadFormState
  );

  const errorFor = (field: LeadField) => {
    const code = state.fieldErrors?.[field];
    return code ? t(`errors.${code}`) : undefined;
  };

  const describedBy = (field: LeadField, extra?: string) =>
    [extra, state.fieldErrors?.[field] ? `${field}-error` : null]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <Section tone="paper" id={siteConfig.anchors.form}>
      <Container width="narrow">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <Heading as="h2" size="lg">
              {t('title')}
            </Heading>
            <Text muted>{t('subtitle')}</Text>
          </div>

          {state.status === 'success' ? (
            <p
              role="status"
              className="flex items-center gap-3 rounded-xl border-2 border-pink bg-pink/5 p-6 text-lg font-bold"
            >
              <Icon name="check" className="size-6 shrink-0 text-pink" />
              {t('success')}
            </p>
          ) : (
            <form action={formAction} noValidate className="flex flex-col gap-6">
              <Field id="name" label={t('fields.name')} error={errorFor('name')}>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(state.fieldErrors?.name)}
                  aria-describedby={describedBy('name')}
                />
              </Field>

              <Field
                id="company"
                label={t('fields.company')}
                error={errorFor('company')}
              >
                <Input
                  id="company"
                  name="company"
                  autoComplete="organization"
                  required
                  aria-invalid={Boolean(state.fieldErrors?.company)}
                  aria-describedby={describedBy('company')}
                />
              </Field>

              <Field
                id="role"
                label={t('fields.role')}
                optionalLabel={t('optional')}
              >
                <Input
                  id="role"
                  name="role"
                  autoComplete="organization-title"
                />
              </Field>

              <Field
                id="profile"
                label={t('fields.profile')}
                error={errorFor('profile')}
              >
                <Select
                  id="profile"
                  name="profile"
                  required
                  value={profile}
                  onChange={(event) =>
                    setProfile(event.target.value as typeof profile)
                  }
                  aria-invalid={Boolean(state.fieldErrors?.profile)}
                  aria-describedby={describedBy('profile')}
                >
                  <option value="">{t('profilePlaceholder')}</option>
                  {profileKeys.map((key) => (
                    <option key={key} value={key}>
                      {t(`profiles.${key}`)}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field
                id="challenge"
                label={t('fields.challenge')}
                optionalLabel={t('optional')}
              >
                <Textarea
                  id="challenge"
                  name="challenge"
                  placeholder={t('challengePlaceholder')}
                />
              </Field>

              <Field
                id="email"
                label={t('fields.email')}
                error={errorFor('email')}
              >
                <Input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(state.fieldErrors?.email)}
                  aria-describedby={describedBy('email')}
                />
              </Field>

              <Field
                id="phone"
                label={t('fields.phone')}
                optionalLabel={t('optional')}
              >
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                />
              </Field>

              <Checkbox
                id="consent"
                name="consent"
                required
                label={t('fields.consent')}
                error={errorFor('consent')}
                aria-invalid={Boolean(state.fieldErrors?.consent)}
                aria-describedby={describedBy('consent')}
              />

              <Button type="submit" disabled={isPending} block>
                {isPending ? t('submitting') : t('submit')}
              </Button>
            </form>
          )}
        </div>
      </Container>
    </Section>
  );
}
