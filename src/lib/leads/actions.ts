'use server';

import {
  validateLead,
  type LeadFormState,
  type Lead
} from './schema';

/**
 * Recibe el lead del formulario de la landing.
 *
 * PENDIENTE — destino de los leads. Hoy sólo se validan y se registran
 * en el log del servidor: no hay base de datos ni correo conectados, así
 * que un envío en producción NO llega a ninguna bandeja. Falta decidir
 * entre hoja de cálculo, CRM o correo antes de publicar el QR.
 */
export async function submitLead(
  _previousState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const read = (field: string) => String(formData.get(field) ?? '').trim();

  const values = {
    name: read('name'),
    company: read('company'),
    role: read('role'),
    profile: read('profile'),
    challenge: read('challenge'),
    email: read('email'),
    phone: read('phone'),
    consent: formData.get('consent') === 'on'
  };

  const fieldErrors = validateLead(values);

  if (Object.keys(fieldErrors).length > 0) {
    return {status: 'error', fieldErrors};
  }

  const lead = values as Lead;

  console.info('[lead]', JSON.stringify(lead));

  return {status: 'success'};
}
