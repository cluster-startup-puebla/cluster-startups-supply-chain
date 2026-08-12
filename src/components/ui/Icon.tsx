/**
 * Set de íconos de línea, dibujados con `currentColor`.
 *
 * Inline y sin dependencias: no suman peso de red y heredan el color del
 * bloque. Agregar uno nuevo = una entrada más en `paths`.
 */
export type IconName =
  | 'alert'
  | 'search'
  | 'factory'
  | 'rocket'
  | 'trending'
  | 'school'
  | 'chip'
  | 'cube'
  | 'node'
  | 'building'
  | 'flask'
  | 'check'
  | 'arrowRight'
  | 'arrowDown';

const paths: Record<IconName, string> = {
  alert: 'M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z',
  search: 'M21 21l-4.3-4.3M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z',
  factory: 'M3 21h18M3 21V9l6 4V9l6 4V5l6 4v12M7 17h.01M13 17h.01M18 17h.01',
  rocket:
    'M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 13a10 10 0 0 1 9-9c1 0 2 .2 2 .2s.2 1 .2 2a10 10 0 0 1-9 9l-2.2-2.2Z',
  trending: 'M3 17l6-6 4 4 8-8M21 7v5m0-5h-5',
  school: 'M12 4 2 9l10 5 10-5-10-5ZM6 12v5c0 1 3 3 6 3s6-2 6-3v-5',
  chip: 'M7 7h10v10H7zM4 9h3M4 15h3M17 9h3M17 15h3M9 4v3M15 4v3M9 17v3M15 17v3',
  cube: 'M12 2 3 7v10l9 5 9-5V7l-9-5ZM3 7l9 5 9-5M12 12v10',
  node: 'M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM5 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12 8v5m0 0-5 4m5-4 5 4',
  building: 'M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 8h2a2 2 0 0 1 2 2v11M4 21h16M8 7h4M8 11h4M8 15h4',
  flask: 'M9 3h6M10 3v6L4.5 18A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3L14 9V3M7.5 14h9',
  check: 'M20 6 9 17l-5-5',
  arrowRight: 'M5 12h14M13 5l7 7-7 7',
  arrowDown: 'M12 5v14M5 13l7 7 7-7'
};

type IconProps = {
  name: IconName;
  className?: string;
};

export default function Icon({name, className = 'size-6'}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={paths[name]} />
    </svg>
  );
}
