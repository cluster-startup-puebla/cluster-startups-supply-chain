'use client';

import type {ReactNode} from 'react';
import Button from '@/components/ui/Button';
import {siteConfig, type ProfileKey} from '@/config/site';
import {useLeadForm} from './lead-form-context';

/**
 * CTA de una ruta de entrada: preselecciona el perfil y deja que el
 * ancla haga el scroll al formulario.
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
  const {setProfile} = useLeadForm();

  return (
    <Button
      href={`#${siteConfig.anchors.form}`}
      variant={variant}
      onClick={() => setProfile(profile)}
    >
      {children}
    </Button>
  );
}
