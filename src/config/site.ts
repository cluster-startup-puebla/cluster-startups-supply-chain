/**
 * Configuración editable de la landing.
 *
 * El copy vive en `src/messages/*.json`; aquí sólo van los interruptores
 * y los datos que no se traducen (correos, teléfonos, URLs).
 */

type SiteConfig = {
  eventBannerEnabled: boolean;
  stickyCtaEnabled: boolean;
  anchors: {model: string; form: string};
  contact: {email: string; phone: string};
  social: {linkedin: string; instagram: string; x: string};
  privacyUrl: string;
};

export const siteConfig: SiteConfig = {
  /**
   * Banner temporal del evento. Ponerlo en `false` lo retira sin tocar
   * ninguna sección (el doc lo da de baja el 14 de agosto).
   */
  eventBannerEnabled: true,

  /**
   * Barra fija inferior en móvil con el CTA al formulario.
   */
  stickyCtaEnabled: true,

  /** Anclas de navegación interna. Una sola página, todo en scroll. */
  anchors: {
    model: 'modelo',
    form: 'contacto'
  },

  /** Pendientes de confirmación — ver sección 9 del documento de contexto. */
  contact: {
    email: '',
    phone: ''
  },

  social: {
    linkedin: '',
    instagram: '',
    x: ''
  },

  /** Enlace al aviso de privacidad. Vacío = se muestra sin enlace. */
  privacyUrl: ''
};

export type ProfileKey =
  | 'industry'
  | 'startup'
  | 'investor'
  | 'academia'
  | 'other';

/** Orden de los perfiles en el select del formulario. */
export const profileKeys: readonly ProfileKey[] = [
  'industry',
  'startup',
  'investor',
  'academia',
  'other'
];
