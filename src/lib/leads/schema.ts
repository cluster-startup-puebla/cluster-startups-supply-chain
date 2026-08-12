import {profileKeys, type ProfileKey} from '@/config/site';

/**
 * Contrato del formulario de captura, compartido entre cliente y
 * servidor. Vive fuera del archivo `'use server'` porque esos archivos
 * sólo pueden exportar funciones asíncronas.
 */
export type LeadField =
  | 'name'
  | 'company'
  | 'role'
  | 'profile'
  | 'challenge'
  | 'email'
  | 'phone'
  | 'consent';

/** Código de error; el texto se traduce en el cliente. */
export type LeadErrorCode = 'required' | 'email' | 'consent';

export type LeadFormState = {
  status: 'idle' | 'success' | 'error';
  fieldErrors?: Partial<Record<LeadField, LeadErrorCode>>;
};

export const initialLeadFormState: LeadFormState = {status: 'idle'};

export type Lead = {
  name: string;
  company: string;
  role: string;
  profile: ProfileKey;
  challenge: string;
  email: string;
  phone: string;
  consent: boolean;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isProfileKey(value: string): value is ProfileKey {
  return (profileKeys as readonly string[]).includes(value);
}

/** Valida los ocho campos y devuelve los errores por campo. */
export function validateLead(
  values: Omit<Lead, 'profile'> & {profile: string}
): Partial<Record<LeadField, LeadErrorCode>> {
  const errors: Partial<Record<LeadField, LeadErrorCode>> = {};

  if (!values.name) errors.name = 'required';
  if (!values.company) errors.company = 'required';
  if (!isProfileKey(values.profile)) errors.profile = 'required';

  if (!values.email) {
    errors.email = 'required';
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = 'email';
  }

  if (!values.consent) errors.consent = 'consent';

  return errors;
}
