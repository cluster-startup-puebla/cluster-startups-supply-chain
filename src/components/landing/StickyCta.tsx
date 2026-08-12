'use client';

import {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import Button from '@/components/ui/Button';
import {siteConfig} from '@/config/site';

/**
 * Barra fija inferior en móvil.
 *
 * Aparece al salir del hero y se esconde al llegar al formulario, para
 * no tapar los campos justo cuando el visitante los está llenando.
 */
export default function StickyCta() {
  const t = useTranslations('stickyCta');
  const [visible, setVisible] = useState(false);
  const sentinel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const form = document.getElementById(siteConfig.anchors.form);
    const node = sentinel.current;
    if (!node) return;

    let pastHero = false;
    let atForm = false;

    const sync = () => setVisible(pastHero && !atForm);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting;
        sync();
      },
      {rootMargin: '0px'}
    );
    heroObserver.observe(node);

    const formObserver = form
      ? new IntersectionObserver(
          ([entry]) => {
            atForm = entry.isIntersecting;
            sync();
          },
          {rootMargin: '0px 0px -40% 0px'}
        )
      : null;
    if (form && formObserver) formObserver.observe(form);

    return () => {
      heroObserver.disconnect();
      formObserver?.disconnect();
    };
  }, []);

  return (
    <>
      {/* Marca el final del primer pantallazo. */}
      <div ref={sentinel} aria-hidden="true" className="h-px" />

      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-paper/95 p-3 backdrop-blur transition-transform duration-200 md:hidden ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <Button href={`#${siteConfig.anchors.form}`} block>
          {t('label')}
        </Button>
      </div>
    </>
  );
}
