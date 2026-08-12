/**
 * Padrón de empresas del clúster.
 *
 * ÚNICA fuente de verdad del directorio: las páginas leen de aquí y no
 * conocen ninguna empresa por su nombre.
 *
 * PENDIENTE — los campos `industry`, `problem`, `solution` y `contact`
 * están vacíos a propósito. Son afirmaciones sobre empresas reales y no
 * se inventan: cada ficha muestra "Pendiente de confirmar" hasta que
 * llegue la información de la empresa. Rellenar un campo aquí lo publica
 * automáticamente en el listado y en la ficha.
 *
 * Verificar también la grafía exacta de cada nombre (mayúsculas,
 * acentos, sufijos legales) antes de publicar.
 */
export type Company = {
  /** Segmento de URL. En inglés la ruta es /companies/<slug>. */
  slug: string;
  name: string;
  /**
   * Ruta del logo dentro de `public/`, p. ej. `/empresas/kigo.webp`.
   * Sin logo, la ficha cae en un recurso tipográfico con el nombre.
   * Conviene subirlos monocromos o con fondo transparente: el mundo es
   * oscuro y un PNG con fondo blanco se ve como recuadro pegado.
   */
  logo?: string;
  /** A qué industria sirve. */
  industry?: string;
  /** Problema que resuelve. */
  problem?: string;
  /** Solución o servicio que provee. */
  solution?: string;
  contact?: {
    website?: string;
    email?: string;
    phone?: string;
  };
};

/** Orden alfabético por nombre. */
export const companies: readonly Company[] = [
  {slug: 'kigo', name: 'Kigo'},
  {slug: 'kotemah', name: 'Kotemah'},
  {slug: 'mileva-dynamics', name: 'Mileva Dynamics'},
  {slug: 'oxtron', name: 'Oxtron'},
  {slug: 'radek', name: 'Radek'},
  {slug: 'sabia', name: 'Sabia'}
];

export function getCompany(slug: string): Company | undefined {
  return companies.find((company) => company.slug === slug);
}
