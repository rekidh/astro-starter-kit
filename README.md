# Astro Starter Kit

Boilerplate / starter kit untuk pembangunan web modern berbasis Astro dengan fokus pada performa tinggi, skor Lighthouse optimal, SEO, serta dukungan AI Crawler (GEO).

## Stack

| Teknologi | Keterangan |
|---|---|
| **Framework** | Astro 7 (`output: 'static'` + adapter Node, SSR per-route lewat `prerender = false`) |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) |
| **Island** | Preact + Signals |
| **Slider** | Swiper Element (lazy-load) |
| **Konten** | Astro Content Collections (Markdown/MDX) |
| **Tooling** | ESLint · Prettier · Vitest · Husky + lint-staged · Lighthouse CI |

## Persyaratan & Cara Pakai

Membutuhkan **Node ≥ 22.22.3** (Astro 7 minimal 22.12, `eslint-plugin-astro` minimal 22.22.3). Repo ini menyediakan `.nvmrc`:

```bash
nvm install && nvm use     # membaca .nvmrc
node -v                    # pastikan v22.x

npm install
cp .env.example .env
npm run dev
