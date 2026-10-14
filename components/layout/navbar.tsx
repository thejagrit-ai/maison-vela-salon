'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/config';

const links = [
  ['Services', '/services'], ['Artists', '/team'], ['Gallery', '/gallery'], ['Our Story', '/about'], ['Contact', '/contact'],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''} ${pathname === '/' && !scrolled ? 'site-header--home' : ''}`}>
      <div className="nav-shell">
        <Link href="/" className="brand" aria-label={`${siteConfig.name} home`}>
          <span className="brand-word">{siteConfig.shortName}</span><small className="brand-sub">Beauty Atelier</small>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => <Link key={href} className={pathname === href ? 'active' : ''} href={href}>{label}</Link>)}
        </nav>
        <Link className="nav-book" href="/book">Book a visit</Link>
        <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <div id="mobile-menu" className={`mobile-menu ${open ? 'mobile-menu--open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {links.map(([label, href], index) => <Link key={href} href={href}><span>0{index + 1}</span>{label}</Link>)}
          <Link className="mobile-book" href="/book">Book a visit</Link>
        </nav>
      </div>
    </header>
  );
}
