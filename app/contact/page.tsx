import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact the Maison Vela demo atelier or begin a booking online.',
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <Container>
          <p className="eyebrow">Contact</p>
          <h1 className="section-title">We would love to hear from you.</h1>
          <p>For appointment guidance, accessibility requests, or anything else, send the atelier a note.</p>
        </Container>
      </section>

      <section className="section section--paper">
        <Container className="contact-grid">
          <div className="contact-card">
            <p className="eyebrow">Say hello</p>
            <h2 className="display">Thoughtful care starts here.</h2>
            <div className="demo-notice" role="note">
              <Sparkles aria-hidden="true" />
              <span>
                <small>Demo mode</small>
                {siteConfig.demoDetails}
              </span>
            </div>
            <a className="contact-detail" href={`mailto:${siteConfig.email}`}>
              <Mail aria-hidden="true" />
              <span>
                <small>Demo email</small>
                {siteConfig.email}
              </span>
            </a>
            <Link className="book" href="/book">
              Book online <ArrowRight size={18} />
            </Link>
          </div>

          <div className="visit-image">
            <Image
              src="/images/atelier.jpg"
              alt="Calm ivory salon interior with warm brass details"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 55vw"
            />
          </div>
        </Container>
      </section>

      <section className="section">
        <Container className="hours-section">
          <div>
            <p className="eyebrow">Studio hours</p>
            <h2 className="section-title">Time, set aside for you.</h2>
          </div>
          <dl>
            {siteConfig.hours.map(([day, time]) => (
              <div key={day}>
                <dt>{day}</dt>
                <dd>{time}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <style>{`
        .contact-grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: 1rem; }
        .contact-card { padding: clamp(1.5rem, 4vw, 3.5rem); background: var(--rose-soft); }
        .contact-card h2 { margin: .4rem 0 2rem; font-size: clamp(2.7rem, 5vw, 3.5rem); }
        .contact-detail,
        .demo-notice { display: flex; gap: 1rem; align-items: flex-start; padding: 1rem 0; border-top: 1px solid #cdbbb3; }
        .contact-detail svg,
        .demo-notice svg { flex: 0 0 auto; margin-top: .2rem; color: var(--brass); }
        .contact-card small { display: block; color: var(--muted); font-size: .7rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
        .demo-notice { color: var(--muted); }
        .contact-card .book { display: inline-flex; align-items: center; gap: .5rem; margin-top: 2rem; padding: .9rem 1.2rem; background: var(--espresso); color: white; border-radius: 999px; font-weight: 700; transition: transform .25s ease, background-color .25s ease; }
        .contact-card .book:hover { transform: translateY(-2px); background: var(--charcoal); }
        .visit-image { position: relative; min-height: 650px; overflow: hidden; }
        .visit-image img { object-fit: cover; }
        .hours-section { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        .hours-section dl { margin: 0; border-top: 1px solid var(--line); }
        .hours-section dl div { display: flex; justify-content: space-between; gap: 1rem; padding: 1.1rem 0; border-bottom: 1px solid var(--line); }
        .hours-section dd { margin: 0; color: var(--muted); }
        @media (max-width: 800px) {
          .contact-grid,
          .hours-section { grid-template-columns: 1fr; }
          .visit-image { min-height: 500px; }
        }
      `}</style>
    </>
  );
}
