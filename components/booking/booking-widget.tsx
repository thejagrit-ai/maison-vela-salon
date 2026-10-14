'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { CalendarDays, Check, Clock3, IndianRupee, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice, services } from '@/lib/config';

type Booking = {
  id: string; serviceId: string; date: string; time: string; name: string; email: string; phone: string; notes: string; createdAt: string;
};
type Fields = Omit<Booking, 'id' | 'createdAt'>;
type Errors = Partial<Record<keyof Fields, string>>;

const STORAGE_KEY = 'maison-vela-bookings-v1';
const baseSlots = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30'];

function localDate(offset = 0) {
  const value = new Date(); value.setDate(value.getDate() + offset);
  const y = value.getFullYear(); const m = String(value.getMonth() + 1).padStart(2, '0'); const d = String(value.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
function timeLabel(value: string) {
  const [hour, minute] = value.split(':').map(Number);
  return new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit' }).format(new Date(2020, 0, 1, hour, minute));
}
function dateLabel(value: string) {
  return new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${value}T12:00:00`));
}

export function BookingWidget({ initialServiceId = '' }: { initialServiceId?: string }) {
  const [fields, setFields] = useState<Fields>({ serviceId: initialServiceId, date: '', time: '', name: '', email: '', phone: '', notes: '' });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [reviewing, setReviewing] = useState(false);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  useEffect(() => {
    try { setBookings(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')); } catch { setBookings([]); }
  }, []);

  const service = services.find((item) => item.id === fields.serviceId);
  const selectedDay = fields.date ? new Date(`${fields.date}T12:00:00`).getDay() : -1;
  const availableSlots = useMemo(() => {
    if (!fields.date || !service || selectedDay === 1) return [];
    const opens = selectedDay === 6 ? 9 * 60 : 10 * 60;
    const closes = selectedDay === 0 ? 18 * 60 : selectedDay === 6 ? 19 * 60 : 20 * 60;
    return baseSlots.filter((slot) => {
      const [h, m] = slot.split(':').map(Number); const start = h * 60 + m;
      const candidateEnd = start + service.duration;
      const occupied = bookings.some((booking) => {
        if (booking.date !== fields.date) return false;
        const [bookingHour, bookingMinute] = booking.time.split(':').map(Number);
        const bookingStart = bookingHour * 60 + bookingMinute;
        const bookingDuration = services.find((item) => item.id === booking.serviceId)?.duration ?? 60;
        return start < bookingStart + bookingDuration && bookingStart < candidateEnd;
      });
      return start >= opens && start + service.duration <= closes && !occupied;
    });
  }, [bookings, fields.date, selectedDay, service]);

  useEffect(() => {
    if (!reviewing) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setReviewing(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [reviewing]);

  function setField<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value, ...(key === 'serviceId' || key === 'date' ? { time: '' } : {}) }));
    setErrors((current) => ({ ...current, [key]: undefined, ...(key === 'serviceId' || key === 'date' ? { time: undefined } : {}) }));
    setReviewing(false);
  }

  function validate() {
    const next: Errors = {};
    if (!service) next.serviceId = 'Choose a service to continue.';
    if (!fields.date) next.date = 'Choose a date for your visit.';
    else if (fields.date < localDate(1)) next.date = 'Please choose a future date.';
    else if (selectedDay === 1) next.date = 'Maison Vela is closed on Mondays.';
    if (!fields.time) next.time = 'Choose an available time.';
    else if (!availableSlots.includes(fields.time)) next.time = 'That time is no longer available. Please choose another.';
    if (fields.name.trim().length < 2) next.name = 'Enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(fields.email)) next.email = 'Enter a valid email address.';
    if (fields.phone.replace(/\D/g, '').length < 10) next.phone = 'Enter a valid phone number with at least 10 digits.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function prepareReview(event: FormEvent) {
    event.preventDefault();
    if (validate()) { setReviewing(true); requestAnimationFrame(() => document.getElementById('booking-review')?.focus()); }
  }

  function confirmBooking() {
    if (!validate() || !service) { setReviewing(false); return; }
    const [hour, minute] = fields.time.split(':').map(Number);
    const requestedStart = hour * 60 + minute;
    const duplicate = bookings.some((booking) => {
      if (booking.date !== fields.date) return false;
      const [bookingHour, bookingMinute] = booking.time.split(':').map(Number);
      const bookingStart = bookingHour * 60 + bookingMinute;
      const bookingDuration = services.find((item) => item.id === booking.serviceId)?.duration ?? 60;
      return requestedStart < bookingStart + bookingDuration && bookingStart < requestedStart + service.duration;
    });
    if (duplicate) { setErrors({ time: 'That time was just booked. Please choose another.' }); setReviewing(false); return; }
    const booking: Booking = { ...fields, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    const next = [...bookings, booking];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setBookings(next); setConfirmed(booking); setReviewing(false);
    requestAnimationFrame(() => document.getElementById('booking-success')?.focus());
  }

  function reset() {
    setFields({ serviceId: '', date: '', time: '', name: '', email: '', phone: '', notes: '' }); setErrors({}); setConfirmed(null); setReviewing(false);
  }

  if (confirmed) {
    const confirmedService = services.find((item) => item.id === confirmed.serviceId)!;
    return <section id="booking-success" className="success" tabIndex={-1} aria-labelledby="success-title">
      <div className="success-mark"><Check size={32} aria-hidden="true" /></div><p className="eyebrow">Appointment reserved</p><h2 id="success-title" className="display">We’ll see you soon, {confirmed.name.split(' ')[0]}.</h2><p>Your appointment is saved on this device. Keep this confirmation for your records.</p>
      <dl><div><dt>Service</dt><dd>{confirmedService.name}</dd></div><div><dt>When</dt><dd>{dateLabel(confirmed.date)} at {timeLabel(confirmed.time)}</dd></div><div><dt>Duration</dt><dd>{confirmedService.duration} minutes</dd></div><div><dt>Price</dt><dd>{formatPrice(confirmedService.price)}</dd></div><div><dt>Reference</dt><dd>{confirmed.id.slice(0, 8).toUpperCase()}</dd></div></dl>
      <Button type="button" onClick={reset}><RotateCcw size={17} /> Make another booking</Button>
      <style jsx>{`.success{text-align:center;padding:clamp(2rem,7vw,5rem);background:var(--paper);border:1px solid var(--line);border-radius:1.5rem;box-shadow:var(--shadow-lg)}.success:focus{outline:none}.success-mark{width:68px;height:68px;margin:0 auto 1.5rem;display:grid;place-items:center;border-radius:50%;background:#e1eee7;color:var(--success)}.success h2{max-width:680px;margin:.5rem auto 1rem;font-size:clamp(2.6rem,6vw,5rem)}.success>p:not(.eyebrow){color:var(--muted)}dl{max-width:670px;margin:2rem auto;display:grid;grid-template-columns:1fr 1fr;text-align:left;border:1px solid var(--line);border-radius:1rem;overflow:hidden}dl div{padding:1rem 1.25rem;border-bottom:1px solid var(--line)}dl div:nth-child(odd){border-right:1px solid var(--line)}dt{font-size:.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:.12em}dd{margin:.25rem 0 0;font-weight:700}@media(max-width:600px){dl{grid-template-columns:1fr}dl div:nth-child(odd){border-right:0}}`}</style>
    </section>;
  }

  return <div className="booking-layout">
    <form onSubmit={prepareReview} noValidate aria-label="Book an appointment" className="booking-form">
      <fieldset><legend><span>01</span> Choose your ritual</legend>
        <div className="service-options">{services.map((item) => <label key={item.id} className={fields.serviceId === item.id ? 'selected' : ''}><input type="radio" name="service" value={item.id} checked={fields.serviceId === item.id} onChange={() => setField('serviceId', item.id)} /><span><b>{item.name}</b><small>{item.category} · {item.duration} min · {formatPrice(item.price)}</small></span><i aria-hidden="true" /></label>)}</div>
        {errors.serviceId && <p className="error" role="alert">{errors.serviceId}</p>}
      </fieldset>

      <fieldset><legend><span>02</span> Select a time</legend><div className="two-col">
        <div className="field"><label htmlFor="date">Appointment date</label><input id="date" type="date" min={localDate(1)} max={localDate(120)} value={fields.date} onChange={(e) => setField('date', e.target.value)} aria-invalid={!!errors.date} aria-describedby={errors.date ? 'date-error' : 'date-help'} /><p id="date-help" className="help">Future dates only. The atelier is closed Mondays.</p>{errors.date && <p id="date-error" className="error" role="alert">{errors.date}</p>}</div>
        <div><p className="field-label">Available times</p>{!fields.date || !service ? <p className="slot-empty">Choose a service and date to see available times.</p> : selectedDay === 1 ? <p className="slot-empty">We are closed on Mondays. Please choose another day.</p> : availableSlots.length === 0 ? <p className="slot-empty">No times remain for this date. Try another day.</p> : <div className="slots" role="radiogroup" aria-label="Available appointment times">{availableSlots.map((slot) => <label key={slot} className={fields.time === slot ? 'selected' : ''}><input type="radio" name="time" value={slot} checked={fields.time === slot} onChange={() => setField('time', slot)} />{timeLabel(slot)}</label>)}</div>}{errors.time && <p className="error" role="alert">{errors.time}</p>}</div>
      </div></fieldset>

      <fieldset><legend><span>03</span> Your details</legend><div className="two-col">
        <div className="field"><label htmlFor="name">Full name</label><input id="name" autoComplete="name" value={fields.name} onChange={(e) => setField('name', e.target.value)} aria-invalid={!!errors.name} />{errors.name && <p className="error" role="alert">{errors.name}</p>}</div>
        <div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" autoComplete="email" value={fields.email} onChange={(e) => setField('email', e.target.value)} aria-invalid={!!errors.email} />{errors.email && <p className="error" role="alert">{errors.email}</p>}</div>
        <div className="field"><label htmlFor="phone">Phone number</label><input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Enter your phone number" value={fields.phone} onChange={(e) => setField('phone', e.target.value)} aria-invalid={!!errors.phone} />{errors.phone && <p className="error" role="alert">{errors.phone}</p>}</div>
        <div className="field notes"><label htmlFor="notes">Notes <span>(optional)</span></label><textarea id="notes" maxLength={500} placeholder="Tell us about your goals, preferences, or accessibility needs." value={fields.notes} onChange={(e) => setField('notes', e.target.value)} /><p className="help">{fields.notes.length}/500</p></div>
      </div></fieldset>
      <Button type="submit" size="lg" fullWidth>Review booking</Button>
    </form>

    <aside className="summary" aria-label="Booking summary"><p className="eyebrow">Your visit</p>{service ? <><h2 className="display">{service.name}</h2><p>{service.description}</p><ul><li><Clock3 size={17} /> {service.duration} minutes</li><li><IndianRupee size={17} /> {formatPrice(service.price)}</li>{fields.date && <li><CalendarDays size={17} /> {dateLabel(fields.date)}{fields.time ? ` · ${timeLabel(fields.time)}` : ''}</li>}</ul></> : <><h2 className="display">Begin with a ritual.</h2><p>Select a service to see its timing, price, and appointment details here.</p></>}</aside>

    {reviewing && service && <div className="review-backdrop" role="presentation" onMouseDown={(e) => { if (e.currentTarget === e.target) setReviewing(false); }}><section id="booking-review" className="review" role="dialog" aria-modal="true" aria-labelledby="review-title" tabIndex={-1}><p className="eyebrow">One last look</p><h2 id="review-title" className="display">Confirm your visit</h2><dl><div><dt>Guest</dt><dd>{fields.name}</dd></div><div><dt>Service</dt><dd>{service.name}</dd></div><div><dt>Date & time</dt><dd>{dateLabel(fields.date)} at {timeLabel(fields.time)}</dd></div><div><dt>Duration & price</dt><dd>{service.duration} min · {formatPrice(service.price)}</dd></div><div><dt>Contact</dt><dd>{fields.email}<br />{fields.phone}</dd></div>{fields.notes && <div><dt>Notes</dt><dd>{fields.notes}</dd></div>}</dl><div className="review-actions"><Button type="button" variant="outline" onClick={() => setReviewing(false)}>Edit details</Button><Button type="button" onClick={confirmBooking}>Confirm appointment</Button></div></section></div>}

    <style jsx>{`
      .booking-layout{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(280px,.55fr);gap:2rem;align-items:start}.booking-form{display:grid;gap:2rem}.booking-form fieldset{min-width:0;margin:0;padding:clamp(1.25rem,3vw,2rem);border:1px solid var(--line);border-radius:1.25rem;background:var(--paper)}legend{padding:0 .6rem;font-family:var(--font-display);font-size:1.8rem;font-weight:600}legend span{margin-right:.5rem;color:var(--brass);font-family:var(--font-sans);font-size:.7rem}.service-options{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}.service-options label{position:relative;display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:1rem;border:1px solid var(--line);border-radius:.85rem;cursor:pointer;transition:.2s}.service-options label:hover,.service-options label.selected,.service-options label:has(input:focus-visible){border-color:var(--brass);background:#faf5ed}.service-options label:has(input:focus-visible),.slots label:has(input:focus-visible){outline:3px solid var(--brass);outline-offset:2px}.service-options input,.slots input{position:absolute;opacity:0;pointer-events:none}.service-options span{display:grid}.service-options small{color:var(--muted);font-size:.75rem}.service-options i{width:17px;height:17px;flex:none;border:1px solid var(--brass);border-radius:50%;box-shadow:inset 0 0 0 4px white}.service-options .selected i{background:var(--brass)}.two-col{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem}.slots{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.45rem}.slots label{position:relative;padding:.55rem .7rem;border:1px solid var(--line);border-radius:.6rem;cursor:pointer;font-size:.82rem;font-weight:700}.slots label:hover,.slots label.selected{border-color:var(--espresso);background:var(--espresso);color:white}.slot-empty{margin:.45rem 0;color:var(--muted);font-size:.85rem}.notes{grid-column:1/-1}.notes label span{color:var(--muted);font-weight:400}.notes .help{text-align:right}.summary{position:sticky;top:110px;padding:2rem;background:var(--espresso);color:var(--ivory);border-radius:1.25rem}.summary h2{margin:.2rem 0 1rem;font-size:2.6rem}.summary>p:not(.eyebrow){color:#cfc3bc}.summary ul{display:grid;gap:.75rem;margin:1.5rem 0 0;padding:1.5rem 0 0;border-top:1px solid rgba(255,255,255,.2);list-style:none}.summary li{display:flex;align-items:center;gap:.65rem;font-size:.88rem}.summary li :global(svg){color:var(--champagne)}.review-backdrop{position:fixed;inset:0;z-index:90;display:grid;place-items:center;padding:1rem;background:rgba(25,18,15,.68);backdrop-filter:blur(6px)}.review{width:min(620px,100%);max-height:calc(100svh - 2rem);overflow:auto;padding:clamp(1.5rem,5vw,3rem);background:var(--paper);border-radius:1.25rem;box-shadow:var(--shadow-lg)}.review:focus{outline:none}.review h2{margin:.25rem 0 1.5rem;font-size:3rem}.review dl{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--line);margin:0}.review dl div{padding:1rem 1rem 1rem 0;border-bottom:1px solid var(--line)}.review dt{color:var(--muted);font-size:.7rem;letter-spacing:.1em;text-transform:uppercase}.review dd{margin:.2rem 0 0;font-weight:700}.review-actions{display:flex;justify-content:flex-end;gap:.75rem;margin-top:1.5rem}
      @media(max-width:850px){.booking-layout{grid-template-columns:1fr}.summary{position:static;grid-row:1}.service-options{grid-template-columns:1fr}}@media(max-width:600px){.two-col{grid-template-columns:1fr}.notes{grid-column:auto}.review dl{grid-template-columns:1fr}.review-actions{flex-direction:column-reverse}.review-actions :global(button){width:100%}}
    `}</style>
  </div>;
}
