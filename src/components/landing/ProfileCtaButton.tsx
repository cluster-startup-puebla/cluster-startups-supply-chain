import type {ReactNode} from 'react';
import LinkButton from '@/components/ui/LinkButton';
import type {ProfileKey} from '@/config/site';

/**
 * CTA de una ruta de entrada.
 *
 * Lleva al levantamiento de necesidades con el perfil en la URL, de modo
 * que el formulario abre con el select ya resuelto. Va en la URL y no en
 * estado de React porque ahora es una navegación entre páginas.
 */
type ProfileCtaButtonProps = {
  profile: ProfileKey;
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'link';
};

export default function ProfileCtaButton({
  profile,
  children,
  variant = 'outline'
}: ProfileCtaButtonProps) {
  return (
    <LinkButton
      href={{pathname: '/necesidades', query: {perfil: profile}}}
      variant={variant}
    >
      {children}
    </LinkButton>
  );
}
