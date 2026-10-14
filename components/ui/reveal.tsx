'use client';

import { CSSProperties, HTMLAttributes, useEffect, useRef } from 'react';
import { clsx } from 'clsx';

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  direction?: 'up' | 'left' | 'right';
};

export function Reveal({ className, children, delay = 0, direction = 'up', style, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.classList.add('is-visible'); observer.disconnect(); }
    }, { threshold: .12, rootMargin: '0px 0px -40px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const revealStyle = { ...style, '--reveal-delay': `${delay}ms` } as CSSProperties;
  return <div ref={ref} className={clsx('reveal', className)} data-direction={direction} style={revealStyle} {...props}>{children}</div>;
}
