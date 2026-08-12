import Image from 'next/image';
import type {Company} from '@/data/companies';

/**
 * Logo de una empresa del padrón.
 *
 * Mientras no haya archivo, cae en un recurso tipográfico con la inicial
 * sobre un nodo del campo: la ficha nunca muestra un hueco ni un icono
 * genérico. En cuanto se rellena `logo` en `data/companies.ts`, el
 * archivo sustituye al recurso sin tocar ninguna página.
 */
type CompanyLogoProps = {
  company: Company;
  className?: string;
};

export default function CompanyLogo({
  company,
  className = 'size-14'
}: CompanyLogoProps) {
  if (company.logo) {
    return (
      <Image
        src={company.logo}
        alt={company.name}
        width={320}
        height={320}
        className={`${className} object-contain`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${className} flex items-center justify-center rounded-full border border-line bg-[radial-gradient(circle_at_35%_30%,var(--magenta-lift),var(--magenta)_60%,transparent_78%)] text-xl font-bold text-white`}
    >
      {company.name.charAt(0)}
    </span>
  );
}
