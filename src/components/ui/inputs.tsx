import type {ComponentPropsWithoutRef, ReactNode} from 'react';

/**
 * Controles de formulario sobre tinta.
 *
 * Altura mínima 48px para uso táctil de pie y texto de 16px para que iOS
 * no haga zoom al enfocar. El foco se marca con el rosa de marca, que es
 * el mismo color del botón de envío: el ojo sigue una sola señal.
 */
const control =
  'w-full min-h-12 rounded-xl border border-line bg-white/[0.04] px-4 py-3 text-base ' +
  'text-text placeholder:text-dim/60 transition-colors duration-150 ' +
  'hover:border-[var(--line-strong)] ' +
  'focus:border-rosa focus:bg-white/[0.06] focus:outline-2 focus:outline-offset-0 focus:outline-rosa ' +
  'aria-[invalid=true]:border-rosa';

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
    <select
      {...props}
      className={`${control} appearance-none bg-[image:var(--chevron)] bg-[length:1.1rem] bg-[position:right_1rem_center] bg-no-repeat pr-11 ${props.className ?? ''}`}
      style={{
        // Chevron dibujado inline: evita una petición y hereda el color.
        ['--chevron' as string]:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b3adc2' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")"
      }}
    >
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
          className="mt-0.5 size-6 shrink-0 rounded border-line accent-[var(--rosa)]"
        />
        <label htmlFor={id} className="text-base leading-relaxed text-dim">
          {label}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-sm font-bold text-lift">
          {error}
        </p>
      ) : null}
    </div>
  );
}
