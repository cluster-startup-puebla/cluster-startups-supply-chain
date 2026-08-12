'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import Button from '@/components/ui/Button';
import {siteConfig} from '@/config/site';

/**
 * Barra fija inferior en móvil.
 *
 * Aparece al salir del hero y se esconde cuando el formulario ya está a
 * la vista, para no tapar los campos justo cuando se están llenando.
 *
 * Usa un listener de scroll en vez de IntersectionObserver: no necesita
 * nodo centinela y su condición es legible de un vistazo.
 */
export default function StickyCta() {
  const t = useTranslations('stickyCta');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const viewport = window.innerHeight;
      const pastHero = window.scrollY > viewport * 0.6;

      const form = document.getElementById(siteConfig.anchors.form);
      const atForm = form
        ? form.getBoundingClientRect().top < viewport * 0.6
        : false;

      setVisible(pastHero && !atForm);
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
      <Button
        href={`#${siteConfig.anchors.form}`}
        block
        tabIndex={visible ? 0 : -1}
      >
        {t('label')}
      </Button>
    </div>
  );
}
