import Icon from './Icon';

type BulletListProps = {
  items: readonly string[];
  className?: string;
};

export default function BulletList({items, className = ''}: BulletListProps) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Icon name="check" className="mt-1 size-5 shrink-0 text-pink" />
          <span className="text-base leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
