import type {ReactNode} from 'react';

type ContainerProps = {
  children: ReactNode;
  /** `narrow` para bloques de lectura, `wide` para grids. */
  width?: 'narrow' | 'default' | 'wide';
  className?: string;
};

const widths = {
  narrow: 'max-w-2xl',
  default: 'max-w-5xl',
  wide: 'max-w-6xl'
} as const;

export default function Container({
  children,
  width = 'default',
  className = ''
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-6 lg:px-8 ${widths[width]} ${className}`}
    >
      {children}
    </div>
  );
}
