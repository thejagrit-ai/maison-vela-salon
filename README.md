# Maison Vela

Maison Vela is a polished, responsive demo website for a premium hair, skin, and makeup atelier.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run build
```

The appointment flow stores confirmed bookings in the visitor’s browser under `maison-vela-bookings-v1`. It rejects past dates, closed Mondays, unavailable times, and duplicate date/time reservations.

## Project structure

- `app/` — pages, routes, metadata, and global visual system
- `components/booking/` — accessible local booking flow
- `components/layout/` — site navigation and footer
- `components/ui/` — shared primitives and scroll reveal
- `lib/config.ts` — brand details, service menu, artist profiles, and gallery content
- `public/images/` — local, optimized editorial imagery

Designed and built by Jagrit Sharma.
