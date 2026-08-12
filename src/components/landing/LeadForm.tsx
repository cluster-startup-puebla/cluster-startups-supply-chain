'use client';

import {useActionState, useState} from 'react';
import {useTranslations} from 'next-intl';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Field from '@/components/ui/Field';
import Icon from '@/components/ui/Icon';
import {Checkbox, Input, Select, Textarea} from '@/components/ui/inputs';
import {profileKeys, type ProfileKey} from '@/config/site';
import {submitLead} from '@/lib/leads/actions';
import {initialLeadFormState, type LeadField} from '@/lib/leads/schema';

/**
 * Levantamiento de necesidades.
 *
 * Es el único objetivo medible del sitio. El reto va primero y a todo el
 * ancho porque es el dato de mayor valor: un lead con reto escrito vale
 * diez sin él, y quien llega desde "ese es mi caso" lo escribe mientras
 * sigue motivado.
 *
 * Sigue siendo opcional a propósito: el doc fija ocho campos como techo
 * y advierte que cada campo obligatorio cuesta conversión en un
 * formulario que se llena de pie en un pasillo de expo.
 *
 * `initialProfile` llega del parámetro `?perfil=` que ponen los CTA de
 * las cuatro rutas, de modo que el lead entra ya clasificado.
 */
export default function LeadForm({
  initialProfile = ''
}: {
  initialProfile?: ProfileKey | '';
}) {
  const t = useTranslations('form');
  const [profile, setProfile] = useState<ProfileKey | ''>(initialProfile);
  const [state, formAction, isPending] = useActionState(
    submitLead,
    initialLeadFormState
  );

  const errorFor = (field: LeadField) => {
    const code = state.fieldErrors?.[field];
    return code ? t(`errors.${code}`) : undefined;
  };

  const describedBy = (field: LeadField) =>
    state.fieldErrors?.[field] ? `${field}-error` : undefined;

  if (state.status === 'success') {
    return (
      <Container width="narrow">
        <p
          role="status"
          className="flex items-center gap-4 rounded-2xl border border-line bg-white/[0.04] p-7 text-lg font-bold"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-rosa text-white">
            <Icon name="check" className="size-5" />
          </span>
          {t('success')}
        </p>
      </Container>
    );
  }

  return (
    <Container width="narrow">
      <form
        action={formAction}
        noValidate
        className="flex flex-col gap-9 rounded-3xl border border-line bg-white/[0.03] p-6 backdrop-blur-sm sm:p-9"
      >
        {/* El reto primero: es el dato que activa el ecosistema. */}
        <fieldset className="flex flex-col gap-5">
          <legend className="text-xs font-bold uppercase tracking-[0.14em] text-lift">
            {t('challengeLabel')}
          </legend>

          <Field
            id="challenge"
            label={t('fields.challenge')}
            optionalLabel={t('optional')}
          >
            <Textarea
              id="challenge"
              name="challenge"
              rows={5}
              placeholder={t('challengePlaceholder')}
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
                setProfile(event.target.value as ProfileKey | '')
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
        </fieldset>

        <fieldset className="flex flex-col gap-5 border-t border-line pt-8">
          <legend className="text-xs font-bold uppercase tracking-[0.14em] text-dim">
            {t('contactLabel')}
          </legend>

          <div className="grid gap-5 sm:grid-cols-2">
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
              <Input id="role" name="role" autoComplete="organization-title" />
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
          </div>

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
        </fieldset>

        <Button type="submit" disabled={isPending} block>
          {isPending ? t('submitting') : t('submit')}
        </Button>
      </form>
    </Container>
  );
}
