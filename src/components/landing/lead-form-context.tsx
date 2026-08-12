'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from 'react';
import type {ProfileKey} from '@/config/site';

/**
 * Puente entre los CTA de las cuatro rutas y el formulario.
 *
 * Cada CTA preselecciona su perfil antes de que el ancla haga scroll, de
 * modo que el lead llega ya clasificado sin recargar la página.
 */
type LeadFormContextValue = {
  profile: ProfileKey | '';
  setProfile: (profile: ProfileKey | '') => void;
};

const LeadFormContext = createContext<LeadFormContextValue | null>(null);

export function LeadFormProvider({children}: {children: ReactNode}) {
  const [profile, setProfileState] = useState<ProfileKey | ''>('');

  const setProfile = useCallback((next: ProfileKey | '') => {
    setProfileState(next);
  }, []);

  const value = useMemo(
    () => ({profile, setProfile}),
    [profile, setProfile]
  );

  return (
    <LeadFormContext.Provider value={value}>
      {children}
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  const context = useContext(LeadFormContext);

  if (!context) {
    throw new Error('useLeadForm debe usarse dentro de <LeadFormProvider>');
  }

  return context;
}
