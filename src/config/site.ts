import { env } from '~/lib/env';

/**
 * Konstanta identitas situs — dipakai di metadata, header, footer,
 * manifest, sitemap, dan JSON-LD.
 *
 * Nilai bertanda TBD menunggu konteks bisnis Arebi.
 */
export const siteConfig = {
  name: 'Arebi',
  /** TBD — deskripsi 140–160 karakter untuk meta description default. */
  description: 'TBD — deskripsi singkat Arebi untuk meta description default.',
  /** TBD — tagline satu kalimat untuk hero dan OG. */
  tagline: 'TBD — tagline satu kalimat',

  url: env.PUBLIC_SITE_URL,
  lang: 'id',
  locale: 'id_ID',

  nav: [
    { label: 'Tentang', href: '/tentang' },
    { label: 'Layanan', href: '/layanan' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Kontak', href: '/kontak' },
  ],

  /** Profil resmi — dipakai sebagai `sameAs[]` di Organization schema. */
  sameAs: [] as string[],

  /** TBD — isi bila ada lokasi fisik, untuk LocalBusiness schema. */
  address: null as null | {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  },

  telephone: null as string | null,
  email: null as string | null,

  logo: '/logo.svg',
  /** OG image default, 1200×630. */
  ogImage: '/og-default.jpg',

  themeColor: '#4f46e5',
} as const;

export type SiteConfig = typeof siteConfig;
