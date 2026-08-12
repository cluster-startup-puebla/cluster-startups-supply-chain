/**
 * Campo de nodos: los círculos luminosos del mundo visual.
 *
 * Es la firma de la página y también su argumento — un clúster es un
 * campo de nodos, denso donde el ecosistema ya existe. Se dibuja con
 * gradientes radiales, sin imágenes ni canvas.
 *
 * Dos reglas de composición:
 * 1. Ningún nodo cae en la columna de lectura. El campo vive en los
 *    márgenes; el texto siempre gana.
 * 2. Todo nodo tiene borde suave. Un círculo de corte duro sobre tinta
 *    se lee como bola de plástico, no como luz.
 */
type Node = {
  /** Posición del centro, en % del contenedor. */
  x: number;
  y: number;
  /** Diámetro, en % del ancho del contenedor. */
  size: number;
  opacity: number;
  /** `disc` disco de luz · `soft` bruma de fondo · `ring` aro fino. */
  kind?: 'disc' | 'soft' | 'ring';
};

const fields = {
  /** Hero: la mitad derecha y el borde inferior; el titular manda. */
  hero: [
    {x: 74, y: 18, size: 26, opacity: 0.4, kind: 'soft'},
    {x: 92, y: 54, size: 11, opacity: 0.42, kind: 'disc'},
    {x: 64, y: 74, size: 5.5, opacity: 0.5, kind: 'disc'},
    {x: 96, y: 84, size: 3, opacity: 0.55, kind: 'disc'},
    {x: 79, y: 37, size: 7, opacity: 0.5, kind: 'ring'},
    {x: 8, y: 92, size: 16, opacity: 0.26, kind: 'soft'},
    {x: 34, y: 96, size: 3, opacity: 0.4, kind: 'disc'}
  ],
  sparse: [
    {x: 91, y: 14, size: 13, opacity: 0.3, kind: 'soft'},
    {x: 4, y: 78, size: 16, opacity: 0.22, kind: 'soft'},
    {x: 84, y: 88, size: 3.5, opacity: 0.42, kind: 'disc'}
  ],
  dense: [
    {x: 90, y: 12, size: 18, opacity: 0.3, kind: 'soft'},
    {x: 6, y: 52, size: 14, opacity: 0.24, kind: 'soft'},
    {x: 95, y: 46, size: 4.5, opacity: 0.45, kind: 'disc'},
    {x: 88, y: 74, size: 6, opacity: 0.4, kind: 'ring'},
    {x: 3, y: 90, size: 3, opacity: 0.45, kind: 'disc'}
  ]
} satisfies Record<string, readonly Node[]>;

export type NodeFieldVariant = keyof typeof fields;

export default function NodeField({
  variant = 'sparse'
}: {
  variant?: NodeFieldVariant;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {fields[variant].map((node, index) => {
        const shared = {
          left: `${node.x}%`,
          top: `${node.y}%`,
          width: `${node.size}%`,
          aspectRatio: '1',
          transform: 'translate(-50%, -50%)',
          opacity: node.opacity
        };

        if (node.kind === 'ring') {
          return (
            <span
              key={index}
              className="absolute block rounded-full"
              style={{
                ...shared,
                border: '1px solid var(--magenta-lift)',
                boxShadow:
                  '0 0 24px -6px var(--magenta-lift), inset 0 0 24px -10px var(--magenta-lift)'
              }}
            />
          );
        }

        return (
          <span
            key={index}
            className="absolute block rounded-full"
            style={{
              ...shared,
              background:
                'radial-gradient(circle at 38% 32%, var(--magenta-lift) 0%, var(--magenta) 42%, color-mix(in oklab, var(--violet) 70%, transparent) 68%, transparent 78%)',
              filter: node.kind === 'soft' ? 'blur(40px)' : 'blur(6px)'
            }}
          />
        );
      })}
    </div>
  );
}
