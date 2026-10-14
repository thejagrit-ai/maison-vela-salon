# Maison Vela

Maison Vela is a premium beauty atelier website for hair, skin, and makeup services. It combines an editorial visual style with a responsive experience, smooth motion, and a complete client-side appointment flow.

**Live website:** [maison-vela-atelier.vercel.app](https://maison-vela-atelier.vercel.app)

## Features

- Responsive pages for the home, services, artists, gallery, about, contact, and booking experiences
- Service browsing with dedicated detail pages
- Local appointment booking with service, date, time, and client details
- Validation for past dates, closed Mondays, unavailable times, and duplicate reservations
- Browser persistence for confirmed appointments using `maison-vela-bookings-v1`
- Accessible navigation, forms, buttons, focus states, and reduced-motion support
- Local editorial imagery and reusable UI components

## Tech stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Lucide React icons

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

From the project directory, install the dependencies:

```bash
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run start    # Serve the production build
npm run lint     # Run the TypeScript check
```

## Project structure

```text
app/                    Application routes, metadata, and global styles
components/booking/     Appointment booking flow
components/layout/      Navigation and footer components
components/ui/          Shared buttons, containers, and motion primitives
lib/config.ts           Brand content, services, artists, and gallery data
public/images/          Local editorial images
```

## Booking data

The booking experience is currently client-side. Confirmed appointments are stored in the visitor's browser and are not sent to a server or shared with a salon team. A production deployment should connect the form to a secure backend, database, and notification service before accepting real appointments.

## Deployment

The production website is deployed on Vercel at [maison-vela-atelier.vercel.app](https://maison-vela-atelier.vercel.app).

Build the project before deploying:

```bash
npm run build
npm run start
```

The project can be deployed to any platform that supports a standard Next.js production application, including Vercel.

## Ownership and license

Copyright (c) 2026 Jagrit Sharma. All rights reserved.

This project is proprietary. See [LICENSE](LICENSE) for the complete terms. You may view the public repository, but you may not copy, modify, distribute, publish, sublicense, sell, or reuse the source code or design without written permission.

## Credits

Designed and built by Jagrit Sharma.
