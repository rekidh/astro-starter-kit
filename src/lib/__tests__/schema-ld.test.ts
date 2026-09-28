import { describe, expect, it } from 'vitest';
import {
  articleSchema,
  breadcrumbSchema,
  buildJsonLd,
  faqSchema,
  organizationSchema,
  websiteSchema,
} from '../schema-ld';

describe('organizationSchema', () => {
  it('punya @type dan @id yang stabil', () => {
    const org = organizationSchema();
    expect(org['@type']).toBe('Organization');
    expect(String(org['@id'])).toMatch(/#organization$/);
  });

  it('tidak memancarkan sameAs kosong', () => {
    // Array kosong di JSON-LD memicu warning di validator Google.
    expect(organizationSchema()).not.toHaveProperty('sameAs');
  });
});

describe('websiteSchema', () => {
  it('merujuk ke Organization lewat @id, bukan menduplikasinya', () => {
    expect(websiteSchema().publisher).toHaveProperty('@id');
  });
});

describe('breadcrumbSchema', () => {
  it('memberi nomor posisi mulai dari 1', () => {
    const crumbs = breadcrumbSchema([
      { name: 'Beranda', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]);
    const items = crumbs.itemListElement as Array<{ position: number; item: string }>;
    expect(items.map((i) => i.position)).toEqual([1, 2]);
    expect(items[0]?.item).toMatch(/^https?:\/\//);
  });
});

describe('faqSchema', () => {
  it('memetakan setiap entri ke Question + acceptedAnswer', () => {
    const faq = faqSchema([{ question: 'Apa itu X?', answer: 'X adalah Y.' }]);
    const entities = faq.mainEntity as Array<{
      '@type': string;
      acceptedAnswer: { text: string };
    }>;
    expect(entities).toHaveLength(1);
    expect(entities[0]?.['@type']).toBe('Question');
    expect(entities[0]?.acceptedAnswer.text).toBe('X adalah Y.');
  });
});

describe('articleSchema', () => {
  it('mengisi dateModified dari datePublished bila belum pernah direvisi', () => {
    const article = articleSchema({
      title: 'Judul',
      description: 'Deskripsi',
      path: '/blog/judul',
      datePublished: '2026-09-28T00:00:00.000Z',
    });
    expect(article.dateModified).toBe('2026-09-28T00:00:00.000Z');
  });

  it('menghormati dateModified yang diberikan', () => {
    const article = articleSchema({
      title: 'Judul',
      description: 'Deskripsi',
      path: '/blog/judul',
      datePublished: '2026-01-01T00:00:00.000Z',
      dateModified: '2026-09-28T00:00:00.000Z',
    });
    expect(article.dateModified).toBe('2026-09-28T00:00:00.000Z');
  });
});

describe('buildJsonLd', () => {
  it('membungkus semua schema dalam satu @graph', () => {
    const parsed = JSON.parse(buildJsonLd(organizationSchema(), websiteSchema()));
    expect(parsed['@context']).toBe('https://schema.org');
    expect(parsed['@graph']).toHaveLength(2);
  });
});
