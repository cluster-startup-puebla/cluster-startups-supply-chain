'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import LinkButton from '@/components/ui/LinkButton';

/**
 * Barra fija inferior en móvil.
 *
 * Aparece al salir del hero y lleva al levantamiento de necesidades, que
 * vive en su propia página. Mientras el visitante recorre el argumento,
 * la conversión queda siempre a un toque.
 *
 * Usa un listener de scroll en vez de IntersectionObserver: no necesita
 * nodo centinela y su condición es legible de un vistazo.
 */
export default function StickyCta() {
  const t = useTranslations('stickyCta');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };

    update();
    window.addEventListener('scroll', update, {passive: true});
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 ease-out md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <LinkButton href="/necesidades" block>
        {t('label')}
      </LinkButton>
    </div>
  );
}
