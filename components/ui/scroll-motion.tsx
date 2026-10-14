'use client';

import { useEffect } from 'react';

export function ScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        root.style.setProperty('--page-progress', '0');
        return;
      }

      const scrollable = Math.max(1, root.scrollHeight - window.innerHeight);
      root.style.setProperty('--page-progress', String(Math.min(1, window.scrollY / scrollable)));

      const parallaxTargets = '[data-parallax], .detail-media img, .portrait img, .gallery-item img, .visit-image img, .about-hero img, .image-stack img';
      document.querySelectorAll<HTMLElement>(parallaxTargets).forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > window.innerHeight + 120) return;
        const speed = Number(element.dataset.parallax || '0.055');
        const distance = rect.top + rect.height / 2 - window.innerHeight / 2;
        const shift = Math.max(-42, Math.min(42, distance * -speed));
        element.style.setProperty('--parallax-shift', `${shift.toFixed(2)}px`);
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    reducedMotion.addEventListener('change', requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reducedMotion.removeEventListener('change', requestUpdate);
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
