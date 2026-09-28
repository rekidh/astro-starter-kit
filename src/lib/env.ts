import { z } from 'zod';

/**
 * Validasi environment variable saat aplikasi boot.
 *
 * Di Astro, hanya variabel berawalan `PUBLIC_` yang ikut ter-bundle ke client.
 * Variabel tanpa prefix hanya tersedia di server — jangan pernah diimpor dari
 * komponen yang berjalan di browser.
 */

const clientSchema = z.object({
  PUBLIC_SITE_URL: z.url().default('http://localhost:4321'),
});

const parsed = clientSchema.safeParse({
  PUBLIC_SITE_URL: import.meta.env.PUBLIC_SITE_URL,
});

if (!parsed.success) {
  console.error('❌ Environment tidak valid:', z.treeifyError(parsed.error));
  throw new Error('Environment variable tidak valid. Periksa .env Anda.');
}

export const env = {
  ...parsed.data,
  /** Tanpa trailing slash — dipakai untuk canonical, sitemap, dan OG URL. */
  PUBLIC_SITE_URL: parsed.data.PUBLIC_SITE_URL.replace(/\/+$/, ''),
};
