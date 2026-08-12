import {routing, type Locale} from '@/i18n/routing';

/**
 * Padrón de empresas del clúster.
 *
 * ÚNICA fuente de verdad del directorio: las páginas leen de aquí y no
 * conocen ninguna empresa por su nombre.
 *
 * Los campos de ficha son afirmaciones sobre empresas reales: se llenan
 * con lo que la empresa confirma y nunca se inventan. Mientras un campo
 * esté vacío la ficha muestra "Pendiente de confirmar"; en cuanto se
 * rellena aquí aparece en el listado y en la ficha sin tocar ninguna
 * página.
 *
 * Verificar también la grafía exacta de cada nombre (mayúsculas,
 * acentos, sufijos legales) antes de publicar.
 */

/**
 * Texto de ficha en los dos idiomas del sitio.
 *
 * El sitio se sirve en `es` y `en`, así que el contenido de empresa
 * viaja en ambos: dejar solo español haría que /companies mezclara
 * encabezados en inglés con párrafos en español. Al ser `Record<Locale,
 * string>`, añadir un idioma en `routing` rompe la compilación hasta
 * traducir todas las fichas — que es justo lo que queremos.
 */
export type LocalizedText = Record<Locale, string>;

/**
 * Lista de etiquetas cortas en los dos idiomas.
 *
 * Las industrias se pintan como píldoras, así que cada entrada tiene que
 * caber en una: una o tres palabras, nunca una frase.
 */
export type LocalizedList = Record<Locale, readonly string[]>;

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
  /** A qué industrias sirve, como etiquetas sueltas. */
  industries?: LocalizedList;
  /** Problema que resuelve. */
  problem?: LocalizedText;
  /** Solución o servicio que provee. */
  solution?: LocalizedText;
  contact?: {
    /** Persona con la que se habla, no un buzón genérico. */
    person?: string;
    /**
     * Cargo. Va sin traducir porque hasta ahora todos son siglas que no
     * se traducen (CEO, CTO); el día que una empresa dé un cargo en
     * español, este campo pasa a `LocalizedText`.
     */
    role?: string;
    website?: string;
    email?: string;
    phone?: string;
  };
};

/** Variante del idioma activo, con el idioma por defecto como respaldo. */
export function localize<T>(value: Record<Locale, T>, locale: string): T {
  return value[locale as Locale] ?? value[routing.defaultLocale];
}

/** Orden alfabético por nombre. */
export const companies: readonly Company[] = [
  {
    slug: 'kigo',
    name: 'Kigo',
    logo: '/empresas/kigo.webp',
    industries: {
      es: [
        'Corporativos',
        'Parques industriales',
        'Control de accesos',
        'Seguridad física'
      ],
      en: [
        'Corporate campuses',
        'Industrial parks',
        'Access control',
        'Physical security'
      ]
    },
    problem: {
      es: 'El control de accesos sigue siendo una libreta en caseta. Colaboradores, visitantes y proveedores se acumulan en la entrada mientras el guardia captura datos a mano, y cuando hay que auditar quién entró, a qué área y con qué permiso, la evidencia está incompleta o no existe. La carga cae entera sobre el personal de seguridad y un acceso no autorizado se queda sin rastro.',
      en: 'Access control still runs on a logbook at the gate. Employees, visitors and suppliers pile up at the entrance while a guard writes down details by hand, and when someone needs to audit who came in, to which area and under what permission, the evidence is incomplete or missing. The entire load falls on the security staff, and an unauthorized entry leaves no trace.'
    },
    solution: {
      es: 'Kigo Corporativo digitaliza el acceso de punta a punta. El ingreso se hace por QR, reconocimiento facial, invitación digital o lectura de placas y TAG en accesos vehiculares; el sistema verifica identidad, rol, área y vigencia en segundos, y cada evento queda registrado con hora, usuario, área y evidencia para auditoría. Un panel único administra permisos por rol, área, horario y vigencia, con bitácora digital, rondines, botón de pánico, lockers y elevadores.',
      en: 'Kigo Corporativo digitizes access end to end. Entry runs on QR, facial recognition, digital invitation, or plate and TAG reading at vehicle gates; the system verifies identity, role, area and validity in seconds, and every event is logged with time, user, area and evidence for audit. A single panel manages permissions by role, area, schedule and validity, with a digital logbook, guard rounds, panic button, lockers and elevators.'
    },
    contact: {website: 'https://kigo.pro/'}
  },
  {
    slug: 'kotemah',
    name: 'Kotemah',
    logo: '/empresas/kotemah.webp',
    industries: {
      es: ['Manufactura', 'Ergonomía', 'Manejo de cargas', 'Seguridad y salud'],
      en: ['Manufacturing', 'Ergonomics', 'Load handling', 'Health and safety']
    },
    problem: {
      es: 'Levantar, empujar y transportar carga desgasta al operador, y a la planta le cuesta en incapacidades, rotación y ritmo perdido. Además es obligación normativa: la NOM-036-1-STPS-2018 exige identificar, analizar, prevenir y controlar el riesgo ergonómico en toda tarea que maneje cargas desde 3 kg, y sostenerlo con evidencia documentada. La mayoría de las plantas no tiene con qué demostrarlo.',
      en: 'Lifting, pushing and carrying loads wears the operator down, and it costs the plant in sick leave, turnover and lost pace. It is also a legal obligation: Mexico’s NOM-036-1-STPS-2018 requires identifying, analyzing, preventing and controlling ergonomic risk in every task handling loads of 3 kg or more, backed by documented evidence. Most plants have no way to prove it.'
    },
    solution: {
      es: 'Un ecosistema que cuida el cuerpo del operador y sostiene el expediente. Equipos de manipulación de carga en gravedad cero y exoesqueletos que quitan el esfuerzo de la tarea sin rediseñar la línea, más ErgoSoft para levantar la evaluación ergonómica, documentar los controles y llevar el seguimiento que pide la norma.',
      en: 'An ecosystem that protects the operator’s body and keeps the records straight. Zero-gravity load handling equipment and exoskeletons take the strain out of the task without redesigning the line, plus ErgoSoft to run the ergonomic assessment, document controls and keep the follow-up the standard requires.'
    },
    contact: {
      person: 'Rodrigo Ruiz',
      email: 'ventas.koteos@gmail.com',
      phone: '+52 222 190 1740'
    }
  },
  {
    slug: 'mileva-dynamics',
    name: 'Mileva Dynamics',
    logo: '/empresas/mileva-dynamics.webp',
    industries: {
      es: [
        'Manufactura',
        'Piso de planta',
        'Líneas de ensamble',
        'Visión por computadora'
      ],
      en: ['Manufacturing', 'Shop floor', 'Assembly lines', 'Computer vision']
    },
    problem: {
      es: 'Saber quién está trabajando, en qué estación y por cuánto tiempo resulta caro y poco confiable. El registro manual o por credencial se presta a errores y a que alguien marque por otro, así que no hay certeza del tiempo real en estación; sin ese dato no se ven los cuellos de botella, las ausencias ni los desbalances de línea. La visión industrial tradicional lo resuelve, pero pide servidores, GPU dedicada y cableado que muchas plantas no pueden pagar.',
      en: 'Knowing who is working, at which station and for how long turns out to be expensive and unreliable. Manual or badge check-in invites errors and buddy punching, so there is no certainty about real time at the station; without that figure, bottlenecks, absences and line imbalances stay invisible. Traditional machine vision solves it, but it demands servers, a dedicated GPU and cabling many plants cannot afford.'
    },
    solution: {
      es: 'Sistema Andon de control de presencia y productividad por reconocimiento facial. Corre en el borde, en el nodo de la propia estación: sin nube, sin infraestructura pesada y con los datos biométricos dentro del sitio. Mide intervalos verificables de inicio y fin —no acumulados estimados— y estructura la operación en una plataforma central: gerencia da de alta líneas y supervisores, y cada supervisor arma su equipo, asigna operadores a estaciones y sigue rendimientos, ausencias y desbalances.',
      en: 'An Andon system for presence and productivity control through facial recognition. It runs at the edge, on the station’s own node: no cloud, no heavy infrastructure, and biometric data never leaves the site. It measures verifiable start and end intervals — not estimated totals — and structures the operation in a central platform: management registers lines and supervisors, and each supervisor builds their team, assigns operators to stations and tracks output, absences and imbalances.'
    },
    contact: {
      person: 'Daniel Martínez',
      role: 'CEO',
      email: 'Josedaniel.martinez@milevadynamics.com',
      phone: '222 954 3666'
    }
  },
  {
    slug: 'oxtron',
    name: 'Oxtron',
    logo: '/empresas/oxtron.webp',
    industries: {
      es: [
        'Agroalimentario',
        'Polímeros y petroquímica',
        'Huella de carbono',
        'Descarbonización'
      ],
      en: [
        'Agrifood',
        'Polymers and petrochemicals',
        'Carbon footprint',
        'Decarbonization'
      ]
    },
    problem: {
      es: 'Los compradores europeos y estadounidenses ya exigen trazabilidad ambiental para dejar entrar un producto, y el exportador mexicano no tiene con qué responder: medir la huella de cada producto pide análisis de ciclo de vida, y el reporte de emisiones se rearma a mano cada año. En polímeros y petroquímica hay además un desperdicio doble: el CO₂ de proceso se ventea como residuo mientras la planta sigue comprando insumos convencionales.',
      en: 'European and US buyers already demand environmental traceability before letting a product in, and Mexican exporters have no way to answer: measuring each product’s footprint requires life-cycle assessment, and the emissions report is rebuilt by hand every year. In polymers and petrochemicals the waste is twofold: process CO₂ is vented while the plant keeps buying conventional feedstock.'
    },
    solution: {
      es: 'Dos frentes sobre el mismo dato. La plataforma de huella de carbono alimentaria calcula automáticamente las emisiones de productos e ingredientes contra una base de análisis de ciclo de vida con metodología IPCC y GHG Protocol, y emite etiquetas climáticas verificables; la de inventario de emisiones automatiza el reporte de Alcances 1, 2 y 3 conforme al GHG Protocol y al RETC. Para fuentes fijas, un sistema modular captura el CO₂ con pureza de hasta 90% y lo devuelve como materia prima de policarbonato, metanol y resinas: el residuo de proceso se vuelve flujo de valor.',
      en: 'Two fronts on the same data. The food carbon footprint platform automatically calculates emissions for products and ingredients against a life-cycle assessment database built on IPCC methodology and the GHG Protocol, and issues verifiable climate labels; the emissions inventory platform automates Scope 1, 2 and 3 reporting under the GHG Protocol and Mexico’s RETC. For fixed sources, a modular system captures CO₂ at up to 90% purity and returns it as feedstock for polycarbonate, methanol and resins: a process waste becomes a value stream.'
    },
    contact: {
      person: 'Jazmín Salazar',
      role: 'CEO',
      website: 'https://www.oxtron.mx/es/',
      email: 'info@oxtron.mx'
    }
  },
  {
    slug: 'radek',
    name: 'Radek',
    logo: '/empresas/radek.webp',
    industries: {
      es: [
        'Multisectorial',
        'Empresas consolidadas',
        'Digitalización',
        'Venture building'
      ],
      en: [
        'Cross-sector',
        'Established companies',
        'Digitization',
        'Venture building'
      ]
    },
    problem: {
      es: 'La inversión en tecnología es necesaria, pero el ROI se justifica solo desde el ahorro interno y ese ahorro casi nunca alcanza para pagar el proyecto. El software que la empresa manda a construir queda encerrado en su propia operación: cuesta, se amortiza lento y nunca genera un peso de ingreso.',
      en: 'Investing in technology is necessary, but the ROI case rests on internal savings alone, and those savings rarely cover the project. The software a company commissions stays locked inside its own operation: it costs money, pays back slowly and never earns a peso.'
    },
    solution: {
      es: 'Convierte el desarrollo interno en un negocio aparte, para que la misma inversión se pague dos veces: primero al digitalizar los procesos de la empresa, después al lanzar esa solución al mercado y generar ingresos nuevos. Construye el side business digital de la empresa consolidada levantando la startup de su propio sector.',
      en: 'Turns in-house development into a business of its own, so the same investment pays for itself twice: first by digitizing the company’s processes, then by taking that solution to market as a new revenue line. It builds an established company’s digital side business by launching the startup of its own sector.'
    },
    contact: {
      person: 'Yamil Álvarez',
      role: 'CEO',
      email: 'yamil@radek.mx'
    }
  },
  {
    slug: 'sabia',
    name: 'Sabia',
    logo: '/empresas/sabia.webp',
    industries: {
      es: [
        'Industria y servicios',
        'Integración de sistemas',
        'IA aplicada',
        'Automatización'
      ],
      en: [
        'Industry and services',
        'Systems integration',
        'Applied AI',
        'Process automation'
      ]
    },
    problem: {
      es: 'La operación vive en hojas de cálculo y en sistemas que no se hablan entre sí. Cada área captura lo mismo con otro nombre, la versión buena del archivo la tiene una persona y nadie puede decir cuánto tarda de verdad un proceso. Sin dato estandarizado y medido no hay nada que automatizar: primero hay que poner orden, y ese es el trabajo que siempre se pospone.',
      en: 'The operation lives in spreadsheets and in systems that do not talk to each other. Each area records the same thing under a different name, the good version of the file sits with one person, and nobody can say how long a process actually takes. Without standardized, measured data there is nothing to automate: the ordering has to come first, and that is the work that always gets postponed.'
    },
    solution: {
      es: 'Hace que los sistemas se hablen entre sí e implementa soluciones de IA que estandarizan, ordenan y miden el proceso antes de automatizarlo. El compromiso es concreto: cualquier Excel que hoy sostenga la operación se convierte en plataforma en ocho semanas, con el dato en un solo lugar y el proceso medido de punta a punta.',
      en: 'Gets systems talking to each other and deploys AI that standardizes, orders and measures a process before automating it. The commitment is concrete: any spreadsheet currently holding the operation together becomes a platform in eight weeks, with the data in one place and the process measured end to end.'
    },
    contact: {
      person: 'Álvaro Castillo',
      email: 'hola@alvarocastillo.dev',
      phone: '221 240 1587'
    }
  }
];

export function getCompany(slug: string): Company | undefined {
  return companies.find((company) => company.slug === slug);
}
