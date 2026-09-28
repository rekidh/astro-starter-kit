# Arebi Landing

Landing page dengan fokus kecepatan, estetika, SEO, dan GEO. Spesifikasi lengkap ada di
[PRD.md](./PRD.md).

**Status:** scaffold core project. Konten dan fitur bisnis belum dikerjakan.

## Stack

| | |
|---|---|
| Framework | Astro 7 (`output: 'static'` + adapter Node, SSR per-route lewat `prerender = false`) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Island | Preact + Signals |
| Slider | Swiper Element, lazy-load |
| Konten | Astro Content Collections (Markdown/MDX) |
| Tooling | ESLint · Prettier · Vitest · Husky + lint-staged · Lighthouse CI |

## Mulai

Butuh **Node ≥ 22.22.3**. Astro 7 minimal 22.12, `eslint-plugin-astro` minimal 22.22.3 —
yang terakhir yang menentukan. Repo ini punya `.nvmrc`:

```bash
nvm install && nvm use     # membaca .nvmrc
node -v                    # pastikan v22.x

npm install
cp .env.example .env
npm run dev
```

Buka http://localhost:4321

`npm install` akan menjalankan `husky` lewat script `prepare`, jadi git hook langsung aktif.

## Script

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Build produksi ke `dist/` |
| `npm run preview` | Preview hasil build |
| `npm start` | Jalankan server hasil build (`dist/server/entry.mjs`) |
| `npm run typecheck` | `astro check` — tipe di `.ts` dan `.astro` |
| `npm run lint` / `lint:fix` | ESLint |
| `npm run format` / `format:check` | Prettier |
| `npm run test` / `test:watch` | Vitest |
| `npm run lhci` | Lighthouse CI terhadap budget di `lighthouserc.json` |

## Struktur

```
src/
├── components/
│   ├── layout/      SiteHeader, SiteFooter, ThemeToggle
│   ├── sections/    Seksi halaman
│   └── ui/          Primitif: Button, Card, Input, Label, Badge, Slider
├── config/site.ts   Identitas situs — nav, nama, deskripsi, sameAs
├── content/         blog, faq, glossary (Markdown)
├── content.config.ts Skema collections
├── layouts/         BaseLayout — head, SEO, JSON-LD, skip link
├── lib/
│   ├── env.ts       Validasi environment (zod)
│   ├── seo.ts       Resolusi meta per halaman
│   ├── schema-ld.ts Generator JSON-LD
│   └── utils.ts     cn(), formatDate(), slugify()
├── pages/
│   ├── index.astro
│   ├── 404.astro
│   ├── robots.txt.ts     Endpoint — izinkan crawler AI (GEO)
│   ├── manifest.json.ts
│   ├── llms.txt.ts       Endpoint — di-generate dari collections
│   └── api/health.ts
├── stores/ui.ts     State UI global (Preact Signals)
├── styles/global.css Design token + dark mode
└── types/
```

## Konvensi

**Environment.** Hanya variabel berawalan `PUBLIC_` yang ikut ke client. `PUBLIC_SITE_URL`
dibaca saat **build** — mengubahnya butuh build ulang.

**Warna dan spacing.** Selalu lewat token di `src/styles/global.css`. Jangan hardcode
nilai di komponen.

**Gambar.** Taruh di `src/assets/`, bukan `public/`, supaya lewat pipeline optimasi Astro.
`width`/`height` selalu eksplisit. Tepat satu gambar eager per halaman. Detail di
[PRD §4](./PRD.md).

**Animasi.** Hanya `transform` dan `opacity`. Scroll reveal: tambahkan class `reveal` —
`BaseLayout` sudah menyediakan satu `IntersectionObserver` untuk seluruh halaman. Konten
tetap terlihat kalau JavaScript gagal.

**Dark mode.** Berbasis class `dark` di `<html>`, dipasang skrip inline di `<head>` sebelum
paint pertama supaya tidak berkedip. Komponen memakai token semantik
(`var(--surface)`, `var(--text-muted)`) sehingga jarang butuh varian `dark:`.

**JSON-LD.** Hanya dari `src/lib/schema-ld.ts`. `Organization` + `WebSite` otomatis di
setiap halaman; schema khusus halaman dikirim lewat prop `schemas` ke `BaseLayout`.

**Slider.** `<Slider label="...">` dengan anak `<swiper-slide>`. Swiper baru diunduh saat
slider mendekati viewport, jadi tidak membebani LCP.

## Cache-Control (saat deploy nanti)

Reverse proxy harus menyetel header ini. Dua baris terakhir kritis — kalau salah, halaman
privat bisa ter-cache di CDN dan tersaji ke pengguna lain.

| Path | Header |
|---|---|
| `/_astro/*`, font | `public, max-age=31536000, immutable` |
| Halaman prerender | `public, max-age=0, s-maxage=3600, stale-while-revalidate=86400` |
| `/robots.txt`, `/sitemap*.xml`, `/llms.txt` | `public, max-age=3600` |
| `/api/*` | `private, no-store` |
| `/app/*`, `/login`, `/register` | `private, no-store` |

Astro 7 punya opsi `routeRules` yang mungkin bisa mengonsolidasikan ini ke dalam
`astro.config.mjs` — belum dipakai karena dokumentasinya belum diverifikasi.

## Belum dikerjakan

| | Menunggu |
|---|---|
| Struktur & isi seksi halaman | Konteks bisnis Arebi |
| Warna brand, logo, font | Aset brand |
| Form kontak, database, email | Keputusan terpisah — belum dimulai |
| Auth & member area | Fase 2 |
| Konfigurasi deploy | Keputusan hosting |
| Halaman `/tentang`, `/layanan`, `/blog`, `/faq`, `/kontak` | Konteks bisnis |

Link ke halaman-halaman itu sudah ada di `siteConfig.nav` dan saat ini mengarah ke 404.
