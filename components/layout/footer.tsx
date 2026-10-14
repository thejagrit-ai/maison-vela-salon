'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/lib/config';

export function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-lead">
          <div><p className="eyebrow">The chair is ready</p><h2 className="display">Make space for yourself.</h2></div>
          <Link href="/book" className="footer-cta">Book a visit <ArrowUpRight size={19} aria-hidden="true" /></Link>
        </div>
        <div className="footer-grid">
          <div><Link href="/" className="footer-brand">{siteConfig.name}</Link><p>{siteConfig.tagline}<br />Hair, skin, and makeup with intention.</p></div>
          <nav aria-label="Footer navigation">
            <p className="footer-label">Explore</p>
            <Link href="/services">Services</Link><Link href="/team">Artists</Link><Link href="/gallery">Gallery</Link><Link href="/about">Our Story</Link>
          </nav>
          <div><p className="footer-label">Demo details</p><p>{siteConfig.demoDetails}</p><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div>
          <div><p className="footer-label">Hours</p>{siteConfig.hours.map(([day, time]) => <p className="hours" key={day}><span>{day}</span><span>{time}</span></p>)}</div>
        </div>
        <div className="footer-base"><span>© {new Date().getFullYear()} {siteConfig.name}</span><span>Made by Jagrit Sharma</span></div>
      </Container>
      <style jsx>{`
        .footer{padding:6rem 0 1.5rem;background:var(--espresso);color:var(--ivory)}.footer-lead{display:flex;justify-content:space-between;align-items:end;gap:2rem;padding-bottom:4.5rem;border-bottom:1px solid rgba(255,255,255,.18)}.footer-lead h2{margin:0;font-size:clamp(3rem,7vw,6.5rem)}.footer-cta{display:inline-flex;align-items:center;gap:.5rem;flex:none;padding:.85rem 1.2rem;border:1px solid #eee0d0;border-radius:999px;font-weight:700}.footer-grid{display:grid;grid-template-columns:1.5fr .7fr 1fr 1.25fr;gap:3rem;padding:4rem 0}.footer-grid p,.footer-grid a{color:#d8d0c8;font-size:.9rem}.footer-grid nav{display:flex;flex-direction:column;align-items:start;gap:.45rem}.footer-brand{font-family:var(--font-display);font-size:2rem!important;color:var(--ivory)!important}.footer-label{margin:0 0 .9rem;color:var(--champagne)!important;font-size:.7rem!important;font-weight:700;letter-spacing:.18em;text-transform:uppercase}.hours{display:flex;justify-content:space-between;gap:1rem;margin:.25rem 0}.footer-base{display:flex;justify-content:space-between;gap:1rem;border-top:1px solid rgba(255,255,255,.18);padding-top:1.5rem;color:#afa49d;font-size:.75rem}
        @media(max-width:800px){.footer{padding-top:4.5rem}.footer-lead{display:block;padding-bottom:3rem}.footer-cta{margin-top:2rem}.footer-grid{grid-template-columns:1fr 1fr;gap:2.5rem 1.5rem;padding:3rem 0}.footer-base{flex-direction:column}}
        @media(max-width:480px){.footer-grid{grid-template-columns:1fr}.footer-lead h2{font-size:3.5rem}}
      `}</style>
    </footer>
  );
}
