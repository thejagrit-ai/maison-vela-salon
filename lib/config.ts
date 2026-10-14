export const siteConfig = {
  name: 'Maison Vela',
  shortName: 'VELA',
  tagline: 'Beauty, considered.',
  description: 'A modern beauty atelier for dimensional hair, restorative skin rituals, and refined makeup artistry.',
  email: 'hello@example.com',
  demoDetails: 'Demo contact details — replace before launch.',
  hours: [
    ['Tuesday–Friday', '10:00 AM–8:00 PM'],
    ['Saturday', '9:00 AM–7:00 PM'],
    ['Sunday', '10:00 AM–6:00 PM'],
    ['Monday', 'Closed'],
  ],
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  category: 'Hair' | 'Skin' | 'Makeup';
  description: string;
  longDescription: string;
  price: number;
  duration: number;
  image: string;
  alt: string;
};

export const services: Service[] = [
  {
    id: 'vela-cut-finish', slug: 'vela-cut-and-finish', name: 'Vela Cut & Finish', category: 'Hair',
    description: 'A considered cut shaped around your texture, routine, and natural movement.',
    longDescription: 'We begin with a detailed consultation, then cleanse, condition, cut, and finish with techniques chosen for how you actually wear your hair.',
    price: 2800, duration: 75, image: '/images/hair-ritual.jpg', alt: 'Stylist shaping glossy dark hair in a warm salon',
  },
  {
    id: 'dimension-colour', slug: 'dimension-colour', name: 'Dimension Colour', category: 'Hair',
    description: 'Soft, lived-in colour placed to illuminate your face and grow out beautifully.',
    longDescription: 'A bespoke colour appointment with tonal mapping, bond protection, gloss, and a polished finish. Final pricing follows your consultation and hair length.',
    price: 7200, duration: 180, image: '/images/editorial-two.jpg', alt: 'Editorial portrait highlighting dimensional brunette hair',
  },
  {
    id: 'silk-press', slug: 'silk-and-shine-ritual', name: 'Silk & Shine Ritual', category: 'Hair',
    description: 'A restorative treatment and tailored blow-dry for softness, movement, and shine.',
    longDescription: 'A deeply hydrating cleanse, targeted masque, scalp massage, heat protection, and finish selected for your hair type.',
    price: 3600, duration: 90, image: '/images/hair-ritual.jpg', alt: 'Hair artist shaping long glossy brunette hair by hand',
  },
  {
    id: 'vela-skin', slug: 'vela-skin-ritual', name: 'Vela Skin Ritual', category: 'Skin',
    description: 'A restorative facial calibrated to your skin, season, and current concerns.',
    longDescription: 'Includes a skin consultation, double cleanse, gentle exfoliation, massage, custom masque, and barrier-supporting finish.',
    price: 4200, duration: 75, image: '/images/skin-ritual.jpg', alt: 'Calm facial treatment in a softly lit treatment room',
  },
  {
    id: 'clarity-peel', slug: 'clarity-peel', name: 'Clarity Peel', category: 'Skin',
    description: 'A gentle resurfacing treatment for smooth texture and an even, luminous finish.',
    longDescription: 'After consultation, we select an appropriate professional exfoliant and complete the ritual with calming hydration and SPF.',
    price: 4800, duration: 60, image: '/images/atelier.jpg', alt: 'Minimal ivory salon interior with a serene treatment atmosphere',
  },
  {
    id: 'modern-makeup', slug: 'modern-makeup', name: 'Modern Makeup', category: 'Makeup',
    description: 'Fresh, dimensional makeup that feels like you—only more luminous.',
    longDescription: 'A collaborative makeup appointment for events, portraits, or an evening out, with thoughtful skin preparation and optional lashes.',
    price: 5200, duration: 75, image: '/images/makeup-ritual.jpg', alt: 'Curated makeup brushes and neutral cosmetics on a studio table',
  },
  {
    id: 'bridal-preview', slug: 'bridal-preview', name: 'Bridal Preview', category: 'Makeup',
    description: 'A collaborative trial to refine your wedding-day hair and makeup direction.',
    longDescription: 'We explore references, wardrobe, light, and wear time, then photograph and document the chosen look for a calm wedding morning.',
    price: 6800, duration: 120, image: '/images/editorial-one.jpg', alt: 'Soft natural beauty portrait with luminous makeup',
  },
];

export type Artist = { slug: string; name: string; role: string; bio: string; specialties: string[]; image: string; alt: string };

export const artists: Artist[] = [
  {
    slug: 'anika-rao', name: 'Anika Rao', role: 'Hair Director',
    bio: 'Anika approaches hair as architecture: proportion first, detail second. Her work centres on dimensional brunettes, modern shapes, and finishes that retain their character between visits.',
    specialties: ['Precision cutting', 'Dimensional colour', 'Texture-led styling'], image: '/images/editorial-two.jpg', alt: 'Anika Rao, hair director, in an editorial salon portrait',
  },
  {
    slug: 'meher-kapoor', name: 'Meher Kapoor', role: 'Skin Therapist',
    bio: 'Meher pairs a calm, consultative manner with barrier-conscious treatments. She believes consistency and restraint create healthier skin than aggressive trends.',
    specialties: ['Barrier repair', 'Facial massage', 'Gentle resurfacing'], image: '/images/artist-meher.jpg', alt: 'Meher Kapoor, skin therapist, in soft natural light',
  },
  {
    slug: 'tara-sen', name: 'Tara Sen', role: 'Makeup Artist',
    bio: 'Tara is known for luminous skin, quiet colour, and makeup that reads beautifully in person and on camera. Her process always begins with listening.',
    specialties: ['Modern bridal', 'Editorial beauty', 'Skin-first makeup'], image: '/images/artist-tara.jpg', alt: 'Tara Sen, makeup artist, at her beauty studio station',
  },
];

export const gallery = [
  { src: '/images/maison-vela-hero.jpg', alt: 'Luminous beauty look in the Maison Vela salon', label: 'The Vela finish' },
  { src: '/images/hair-ritual.jpg', alt: 'Detailed salon hair ritual in progress', label: 'Cut with intention' },
  { src: '/images/skin-ritual.jpg', alt: 'Restorative facial treatment in a quiet studio', label: 'Skin in balance' },
  { src: '/images/makeup-ritual.jpg', alt: 'Neutral makeup palette and professional brushes', label: 'Modern colour' },
  { src: '/images/editorial-one.jpg', alt: 'Natural luminous portrait after a beauty appointment', label: 'Soft luminosity' },
  { src: '/images/editorial-two.jpg', alt: 'Editorial portrait with polished dimensional hair', label: 'Movement & tone' },
  { src: '/images/atelier.jpg', alt: 'Serene premium salon interior in ivory tones', label: 'The atelier' },
  { src: '/images/studio.jpg', alt: 'Contemporary beauty studio with warm lighting', label: 'A place to exhale' },
];

export const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(price);
