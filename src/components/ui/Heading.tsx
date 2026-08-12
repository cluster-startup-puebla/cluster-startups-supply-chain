import type {ReactNode} from 'react';

/**
 * Jerarquía por peso y tamaño, nunca por mayúsculas ni familias
 * decorativas. El nivel semántico (`as`) es independiente del tamaño.
 */
type HeadingProps = {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  size?: 'xl' | 'lg' | 'md' | 'sm';
  className?: string;
};

const sizes = {
  xl: 'text-[2rem] leading-[1.15] sm:text-5xl',
  lg: 'text-2xl leading-tight sm:text-4xl',
  md: 'text-xl leading-snug sm:text-2xl',
  sm: 'text-lg leading-snug'
} as const;

export default function Heading({
  children,
  as: Tag = 'h2',
  size = 'lg',
  className = ''
}: HeadingProps) {
  return (
    <Tag
      className={`text-balance font-bold tracking-tight ${sizes[size]} ${className}`}
    >
      {children}
    </Tag>
  );
}
