import type {ReactNode} from 'react';

/**
 * Jerarquía por peso y tamaño. Archivo aguanta tracking muy cerrado en
 * los tamaños grandes, que es lo que le da el aire de señalética
 * industrial sin recurrir a mayúsculas.
 */
type HeadingProps = {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  size?: 'hero' | 'xl' | 'lg' | 'md' | 'sm';
  className?: string;
};

const sizes = {
  hero: 'text-[2.6rem] leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl',
  xl: 'text-[2rem] leading-[1.08] tracking-[-0.03em] sm:text-5xl',
  lg: 'text-[1.65rem] leading-[1.12] tracking-[-0.025em] sm:text-4xl',
  md: 'text-xl leading-snug tracking-[-0.02em] sm:text-2xl',
  sm: 'text-lg leading-snug tracking-[-0.015em]'
} as const;

export default function Heading({
  children,
  as: Tag = 'h2',
  size = 'lg',
  className = ''
}: HeadingProps) {
  return (
    <Tag className={`text-balance font-bold ${sizes[size]} ${className}`}>
      {children}
    </Tag>
  );
}
