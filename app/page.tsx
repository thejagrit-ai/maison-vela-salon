import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock3, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { artists, formatPrice, services, siteConfig } from '@/lib/config';

const featured = [services[0], services[3], services[5]];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <Image src="/images/maison-vela-hero.jpg" alt="Woman with luminous makeup and polished dark hair seated in the Maison Vela salon" fill priority sizes="100vw" className="hero-image" data-parallax="0.035" />
        <div className="hero-shade" />
        <Container className="hero-inner">
          <p className="hero-kicker">Hair · Skin · Makeup</p>
          <h1 className="display">Beauty,<br /><em>considered.</em></h1>
          <p className="hero-copy">Thoughtful rituals, modern artistry, and the rare pleasure of not being rushed.</p>
          <div className="hero-actions"><Link className="hero-primary" href="/book">Book a visit <ArrowRight size={18} /></Link><Link className="hero-secondary" href="/services">Explore services</Link></div>
        </Container>
      </section>

      <section className="marquee" aria-label="Maison Vela values"><p>Quiet luxury <i>◆</i> Honest consultation <i>◆</i> Modern artistry <i>◆</i> Unhurried care</p></section>

      <section className="section section--paper">
        <Container>
          <Reveal className="service-heading"><div><p className="eyebrow">Our signatures</p><h2 className="section-title">Rituals designed around you.</h2></div><p className="section-intro">No copy-and-paste beauty. Every appointment begins with listening and ends with a result that still feels entirely your own.</p></Reveal>
          <div className="service-grid">
            {featured.map((service, index) => (
              <Reveal key={service.id} className={`service-card service-card--${index + 1}`}>
                <Link href={`/services/${service.slug}`} aria-label={`View ${service.name}`}>
                  <div className="media-wrap service-image"><Image src={service.image} alt={service.alt} fill sizes="(max-width: 760px) 100vw, 33vw" data-parallax="0.035" /></div>
                  <div className="service-copy"><span>{service.category}</span><h3 className="display">{service.name}</h3><p>{service.description}</p><div><b>From {formatPrice(service.price)}</b><small><Clock3 size={14} /> {service.duration} min</small></div></div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="center"><Link href="/services" className="text-link">View the complete service menu <ArrowRight size={17} /></Link></div>
        </Container>
      </section>

      <section className="section philosophy">
        <Container className="split">
          <Reveal className="philosophy-image" direction="left"><div className="media-wrap"><Image src="/images/atelier.jpg" alt="Serene Maison Vela salon interior in warm ivory and brass" fill sizes="(max-width: 760px) 100vw, 50vw" data-parallax="0.045" /></div><span>Open Tue–Sun</span></Reveal>
          <Reveal className="philosophy-copy" direction="right"><p className="eyebrow">A slower kind of salon</p><h2 className="section-title">Your appointment should feel like an exhale.</h2><p className="section-intro">We designed Maison Vela as an antidote to the noisy, overbooked salon. Consultation has room. Details receive attention. Recommendations are useful, never performative.</p><ul><li><Sparkles size={18} /> Tailored, never trend-led</li><li><Sparkles size={18} /> Considered products and techniques</li><li><Sparkles size={18} /> Clear timing and transparent pricing</li></ul><Link href="/about" className="text-link">Step inside our approach <ArrowRight size={17} /></Link></Reveal>
        </Container>
      </section>

      <section className="section section--dark">
        <Container>
          <Reveal><p className="eyebrow">The artists</p><h2 className="section-title">Three disciplines.<br />One point of view.</h2></Reveal>
          <div className="artist-row">
            {artists.map((artist, index) => <Reveal key={artist.slug} className="artist" delay={index * 90}><Link href={`/team/${artist.slug}`}><span>0{index + 1}</span><div className="artist-image"><Image src={artist.image} alt={artist.alt} fill sizes="(max-width: 760px) 100vw, 33vw" data-parallax="0.03" /></div><h3 className="display">{artist.name}</h3><p>{artist.role}</p></Link></Reveal>)}
          </div>
          <div className="center"><Link href="/team" className="text-link">Meet the atelier <ArrowRight size={17} /></Link></div>
        </Container>
      </section>

      <section className="section section--paper">
        <Container>
          <Reveal className="visit-intro"><div><p className="eyebrow">Your first visit</p><h2 className="section-title">Simple by design.</h2></div><p className="section-intro">Choose your ritual, select an open time, and tell us what matters. Your details stay on this device and your appointment remains available after refresh.</p></Reveal>
          <div className="steps">
            {[['01','Choose','Explore clear services, duration, and starting prices.'],['02','Plan','Pick a future date and an available studio time.'],['03','Arrive','We begin with an unrushed, in-person consultation.']].map(([number,title,text]) => <Reveal className="step" key={number}><span>{number}</span><h3 className="display">{title}</h3><p>{text}</p></Reveal>)}
          </div>
          <Reveal className="booking-band"><div><p className="eyebrow">Ready when you are</p><h2 className="display">Your next good hair day starts here.</h2></div><Link href="/book">Find an appointment <ArrowRight size={18} /></Link></Reveal>
        </Container>
      </section>

      <style>{`
        .hero-image{animation:hero-image-in 1.2s cubic-bezier(.2,.7,.2,1) both}.hero-kicker,.hero h1,.hero-copy,.hero-actions{animation:hero-copy-in .72s cubic-bezier(.2,.72,.2,1) both}.hero-kicker{animation-delay:.06s}.hero h1{animation-delay:.12s}.hero-copy{animation-delay:.2s}.hero-actions{animation-delay:.28s}@keyframes hero-image-in{from{transform:translate3d(0,var(--parallax-shift),0) scale(1.12)}to{transform:translate3d(0,var(--parallax-shift),0) scale(1.08)}}@keyframes hero-copy-in{from{transform:translateY(16px)}to{transform:none}}
        .hero{position:relative;min-height:780px;height:100svh;color:#fff;overflow:hidden}.hero-image{object-fit:cover;object-position:center}.hero-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(26,18,15,.82) 0%,rgba(31,21,18,.55) 38%,rgba(31,21,18,.05) 72%),linear-gradient(0deg,rgba(20,13,11,.35),transparent 40%)}.hero-inner{position:relative;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding-top:5rem}.hero-kicker{margin:0 0 1.4rem;font-size:.72rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase}.hero h1{margin:0;font-size:clamp(4.8rem,10vw,9rem)}.hero h1 em{color:#e6cec4;font-weight:500}.hero-copy{max-width:500px;margin:1.5rem 0 2rem;color:#f5eee9;font-size:1.1rem}.hero-actions{display:flex;align-items:center;gap:1.4rem;flex-wrap:wrap}.hero-primary{display:inline-flex;align-items:center;gap:.6rem;padding:.9rem 1.25rem;border-radius:999px;background:#fff;color:var(--espresso);font-weight:700}.hero-secondary{padding:.35rem 0;border-bottom:1px solid #fff;font-weight:700}.marquee{overflow:hidden;background:var(--rose-soft);white-space:nowrap}.marquee p{width:max-content;margin:0;padding:1rem 0;font-family:var(--font-display);font-size:1.25rem;letter-spacing:.03em;animation:marquee 25s linear infinite}.marquee i{margin:0 2rem;color:var(--brass);font-size:.55rem}@keyframes marquee{to{transform:translateX(-20%)}}.service-heading,.visit-intro{display:grid;grid-template-columns:1.15fr .85fr;gap:3rem;align-items:end;margin-bottom:4rem}.service-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.25rem;align-items:start}.service-card--2{margin-top:4rem}.service-image{height:430px}.service-copy{padding:1.5rem .25rem}.service-copy>span{color:var(--brass);font-size:.68rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase}.service-copy h3{margin:.6rem 0;font-size:2.35rem}.service-copy p{min-height:3.4em;margin:0;color:var(--muted);font-size:.9rem}.service-copy>div{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);margin-top:1.2rem;padding-top:1rem;font-size:.8rem}.service-copy small{display:flex;align-items:center;gap:.35rem}.center{text-align:center;margin-top:3rem}.philosophy{background:var(--ivory)}.philosophy-image{position:relative}.philosophy-image .media-wrap{height:680px}.philosophy-image span{position:absolute;right:-1rem;bottom:2rem;padding:1rem;background:var(--rose);color:#fff;font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.philosophy-copy ul{display:grid;gap:.7rem;margin:2rem 0;padding:0;list-style:none}.philosophy-copy li{display:flex;gap:.7rem;align-items:center;font-weight:600}.philosophy-copy li svg{color:var(--brass)}.artist-row{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-top:4rem}.artist>a>span{color:var(--champagne);font-size:.7rem}.artist-image{position:relative;height:460px;margin:.65rem 0 1.2rem;overflow:hidden;background:#493a34}.artist-image img{object-fit:cover;filter:saturate(.78);transition:transform .6s,filter .4s}.artist:hover img{transform:translate3d(0,var(--parallax-shift),0) scale(1.12);filter:saturate(1)}.artist h3{margin:0;font-size:2.2rem}.artist p{margin:.2rem 0;color:#bbb0aa}.steps{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.step{padding:2.5rem}.step+.step{border-left:1px solid var(--line)}.step>span{color:var(--brass);font-size:.7rem}.step h3{margin:1.5rem 0 .7rem;font-size:2.1rem}.step p{margin:0;color:var(--muted)}.booking-band{display:flex;justify-content:space-between;align-items:center;gap:2rem;margin-top:5rem;padding:3rem;background:var(--rose-soft);border-radius:1.5rem}.booking-band h2{max-width:670px;margin:0;font-size:clamp(2.6rem,5vw,4.5rem)}.booking-band a{display:inline-flex;align-items:center;gap:.5rem;flex:none;padding:.9rem 1.25rem;background:var(--espresso);color:#fff;border-radius:999px;font-weight:700}
        @media(max-width:800px){.hero{min-height:700px}.hero-image{object-position:66% center}.hero-shade{background:linear-gradient(90deg,rgba(26,18,15,.78),rgba(26,18,15,.28)),linear-gradient(0deg,rgba(20,13,11,.5),transparent 60%)}.hero-inner{justify-content:flex-end;padding-bottom:7rem}.hero h1{font-size:clamp(4.1rem,20vw,6rem)}.service-heading,.visit-intro{grid-template-columns:1fr;gap:0;margin-bottom:2.5rem}.service-grid,.artist-row,.steps{grid-template-columns:1fr}.service-card--2{margin-top:0}.service-image{height:390px}.philosophy-image .media-wrap{height:500px}.philosophy-image span{right:.5rem}.artist-image{height:520px}.step{padding:2rem .5rem}.step+.step{border-left:0;border-top:1px solid var(--line)}.booking-band{display:block;padding:2rem 1.25rem}.booking-band a{margin-top:1.5rem;width:100%;justify-content:center}.marquee p{animation:none}}
      `}</style>
    </>
  );
}
