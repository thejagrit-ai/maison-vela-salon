import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock3 } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { formatPrice, services } from '@/lib/config';

export const metadata: Metadata = { title: 'Services', description: 'Explore considered hair, skin, and makeup rituals at Maison Vela.' };

export default function ServicesPage() {
  const categories = ['Hair', 'Skin', 'Makeup'] as const;
  return <><section className="page-hero"><Container><p className="eyebrow">The service edit</p><h1 className="section-title">Designed for how you want to feel.</h1><p>Transparent starting prices, realistic timing, and a consultation woven into every appointment.</p></Container></section>
    {categories.map((category, categoryIndex) => <section className={`section ${categoryIndex % 2 === 0 ? 'section--paper' : ''}`} key={category}><Container><Reveal className="category-head"><p className="eyebrow">0{categoryIndex + 1}</p><h2 className="display">{category}</h2></Reveal><div className="service-list">{services.filter((service) => service.category === category).map((service) => <Reveal className="service-row" key={service.id}><div className="service-thumb"><Image src={service.image} alt={service.alt} fill sizes="160px" /></div><div><h3 className="display">{service.name}</h3><p>{service.description}</p></div><div className="service-meta"><span><Clock3 size={15} /> {service.duration} min</span><b>From {formatPrice(service.price)}</b></div><Link href={`/services/${service.slug}`} aria-label={`View ${service.name}`}><ArrowRight /></Link></Reveal>)}</div></Container></section>)}
    <section className="section section--dark"><Container className="cta"><div><p className="eyebrow">Not sure what to choose?</p><h2 className="display">Start with what you want to change.</h2></div><Link href="/contact">Ask the atelier <ArrowRight size={18} /></Link></Container></section>
    <style>{`.category-head{display:grid;grid-template-columns:120px 1fr;align-items:end;border-bottom:1px solid var(--line);padding-bottom:1.5rem}.category-head h2{margin:0;font-size:4.5rem}.service-row{display:grid;grid-template-columns:130px 1fr 180px 50px;gap:2rem;align-items:center;padding:1.5rem 0;border-bottom:1px solid var(--line)}.service-thumb{position:relative;width:130px;height:100px;overflow:hidden;background:var(--rose-soft)}.service-thumb img{object-fit:cover}.service-row h3{margin:0;font-size:2rem}.service-row p{margin:.4rem 0 0;color:var(--muted)}.service-meta{display:grid;gap:.35rem}.service-meta span{display:flex;align-items:center;gap:.4rem;color:var(--muted);font-size:.8rem}.service-row>a{display:grid;width:44px;height:44px;place-items:center;border:1px solid var(--line);border-radius:50%;transition:.2s}.service-row>a:hover{background:var(--espresso);color:white}.cta{display:flex;justify-content:space-between;align-items:end;gap:2rem}.cta h2{max-width:760px;margin:0;font-size:clamp(3rem,6vw,5.5rem)}.cta>a{display:inline-flex;gap:.5rem;align-items:center;flex:none;padding:.9rem 1.2rem;border:1px solid currentColor;border-radius:999px;font-weight:700}@media(max-width:760px){.category-head{grid-template-columns:50px 1fr}.category-head h2{font-size:3.5rem}.service-row{grid-template-columns:90px 1fr 44px;gap:1rem}.service-thumb{width:90px;height:110px}.service-meta{grid-column:2}.service-row h3{font-size:1.65rem}.service-row p{font-size:.88rem}.cta{display:block}.cta>a{margin-top:1.5rem}}`}</style>
  </>;
}
