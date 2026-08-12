import type {ComponentPropsWithoutRef, ReactNode} from 'react';

/**
 * Controles de formulario. Altura mínima 48px para uso táctil de pie,
 * texto de 16px para que iOS no haga zoom al enfocar.
 */
const control =
  'w-full min-h-12 rounded-lg border-2 border-hairline bg-paper px-4 py-3 text-base ' +
  'text-foreground placeholder:text-muted/70 ' +
  'focus:border-navy focus:outline-2 focus:outline-offset-0 focus:outline-navy ' +
  'aria-[invalid=true]:border-pink';

export function Input(props: ComponentPropsWithoutRef<'input'>) {
  return <input {...props} className={`${control} ${props.className ?? ''}`} />;
}

export function Textarea(props: ComponentPropsWithoutRef<'textarea'>) {
  return (
    <textarea
      rows={4}
      {...props}
      className={`${control} resize-y ${props.className ?? ''}`}
    />
  );
}

export function Select({
  children,
  ...props
}: ComponentPropsWithoutRef<'select'> & {children: ReactNode}) {
  return (
    <select {...props} className={`${control} ${props.className ?? ''}`}>
      {children}
    </select>
  );
}

type CheckboxProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'> & {
  id: string;
  label: ReactNode;
  error?: string;
};

export function Checkbox({id, label, error, ...props}: CheckboxProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          {...props}
          className="mt-0.5 size-6 shrink-0 accent-[var(--brand-pink)]"
        />
        <label htmlFor={id} className="text-base leading-relaxed">
          {label}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-sm font-bold text-pink">
          {error}
        </p>
      ) : null}
    </div>
  );
}
