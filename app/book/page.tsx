import type { Metadata } from 'next';
import { BookingWidget } from '@/components/booking/booking-widget';
import { Container } from '@/components/ui/container';
import { services } from '@/lib/config';

export const metadata: Metadata = { title: 'Book a Visit', description: 'Choose a Maison Vela service, date, and available time.' };

export default async function BookPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const initialService = services.find((item) => item.id === service || item.slug === service)?.id || '';
  return <><section className="page-hero"><Container><p className="eyebrow">Private time, held for you</p><h1 className="section-title">Book your visit.</h1><p>Choose a ritual and a future studio time. You will review every detail before confirming.</p></Container></section><section className="section"><Container><BookingWidget initialServiceId={initialService} /></Container></section></>;
}
