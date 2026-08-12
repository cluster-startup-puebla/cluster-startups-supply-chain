import type {ReactNode} from 'react';

/**
 * Envoltura de campo: etiqueta, marca de opcional, control y error.
 * Los controles llegan como hijos para que Field no tenga que conocer
 * cada tipo de input.
 */
type FieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  /** Texto de la marca "Opcional"; si se omite, el campo se ve obligatorio. */
  optionalLabel?: string;
  error?: string;
  hint?: string;
};

export default function Field({
  id,
  label,
  children,
  optionalLabel,
  error,
  hint
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="flex items-baseline gap-2 text-sm font-bold tracking-tight"
      >
        {label}
        {optionalLabel ? (
          <span className="text-xs font-normal text-dim">{optionalLabel}</span>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-sm text-dim">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-bold text-lift">
          {error}
        </p>
      ) : null}
    </div>
  );
}
