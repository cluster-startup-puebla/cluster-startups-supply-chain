/**
 * Lista de puntos. El marcador es un nodo del campo, no un check
 * genérico: el mismo círculo luminoso que estructura toda la página.
 */
type BulletListProps = {
  items: readonly string[];
  className?: string;
};

export default function BulletList({items, className = ''}: BulletListProps) {
  return (
    <ul className={`flex flex-col gap-3.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3.5">
          <span
            aria-hidden="true"
            className="mt-2 size-2 shrink-0 rounded-full bg-lift shadow-[0_0_10px_1px_var(--magenta-lift)]"
          />
          <span className="text-base leading-relaxed text-dim">{item}</span>
        </li>
      ))}
    </ul>
  );
}
