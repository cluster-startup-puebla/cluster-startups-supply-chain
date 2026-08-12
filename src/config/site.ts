/**
 * Configuración editable de la landing.
 *
 * El copy vive en `src/messages/*.json`; aquí sólo van los interruptores
 * y los datos que no se traducen (correos, teléfonos, URLs).
 */

type SiteConfig = {
  eventBannerEnabled: boolean;
  stickyCtaEnabled: boolean;
  anchors: {model: string; content: string};
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

  /**
   * Anclas dentro de la landing. El levantamiento de necesidades ya no
   * es un ancla: vive en su propia página (`/necesidades`).
   */
  anchors: {
    model: 'modelo',
    content: 'contenido'
  },

  /** El nombre y el cargo viven en `messages.footer.contactName`. */
  contact: {
    email: 'rancholoko69@gmail.com',
    phone: '+52 (275) 112-1666'
  },

  social: {
    linkedin: '',
    instagram: '',
    x: ''
  },

  /** Enlace al aviso de privacidad. Vacío = se muestra sin enlace. */
  privacyUrl: '/privacidad'
};

export type ProfileKey =
  'industry' | 'startup' | 'investor' | 'academia' | 'other';

/** Orden de los perfiles en el select del formulario. */
export const profileKeys: readonly ProfileKey[] = [
  'industry',
  'startup',
  'investor',
  'academia',
  'other'
];
