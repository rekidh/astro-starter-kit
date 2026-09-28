// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

const SITE = process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

export default defineConfig({
  site: SITE,

  // Astro 7: tidak ada `output: 'hybrid'`. Default 'static' = semua halaman
  // di-prerender; route yang butuh SSR opt-in lewat `export const prerender = false`.
  output: 'static',
  adapter: node({ mode: 'standalone' }),

  // PRD §6: URL tanpa trailing slash.
  trailingSlash: 'never',

  // Default Astro 7 adalah 'jsx', yang membuang spasi antar elemen inline
  // mengikuti aturan JSX dan bisa menghapus spasi yang bermakna.
  // 'true' = pembuangan whitespace lossless.
  compressHTML: true,

  prefetch: false,

  integrations: [
    mdx(),
    preact({ compat: false }),
    sitemap({
      // Jangan pernah masukkan route privat fase 2 ke sitemap.
      filter: (page) =>
        !/\/(app|api|login|register|lupa-password|reset-password|verifikasi-email)(\/|$)/.test(
          page,
        ),
    }),
  ],

  image: {
    // Astro menyuntikkan style responsif (aspect-ratio + object-fit) sendiri,
    // sehingga `width`/`height` eksplisit tidak menyebabkan CLS.
    responsiveStyles: true,
    layout: 'constrained',
    // PRD §4 — lebar srcset yang di-generate.
    breakpoints: [400, 640, 828, 1080, 1280, 1600, 1920],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
