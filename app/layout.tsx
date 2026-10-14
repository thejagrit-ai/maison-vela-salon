import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollMotion } from '@/components/ui/scroll-motion';
import { siteConfig } from '@/lib/config';
import './globals.css';

const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-display', display: 'swap' });
const sans = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: { default: `${siteConfig.name} — ${siteConfig.tagline}`, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: ['luxury beauty salon', 'modern hair atelier', 'skin rituals', 'bridal makeup'],
  authors: [{ name: 'Jagrit Sharma' }],
  creator: 'Jagrit Sharma',
  openGraph: { type: 'website', locale: 'en_IN', siteName: siteConfig.name, title: `${siteConfig.name} — ${siteConfig.tagline}`, description: siteConfig.description, images: [{ url: '/images/maison-vela-hero.jpg', width: 1600, height: 900, alt: 'Maison Vela beauty atelier' }] },
  twitter: { card: 'summary_large_image', title: `${siteConfig.name} — ${siteConfig.tagline}`, description: siteConfig.description, images: ['/images/maison-vela-hero.jpg'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <ScrollMotion />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
