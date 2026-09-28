import { siteConfig } from '~/config/site';
import { absoluteUrl } from './utils';

/**
 * Generator JSON-LD — satu-satunya sumber structured data.
 *
 * Dipusatkan di sini supaya tidak ada duplikasi atau schema yang saling
 * bertentangan antar halaman. Validasi lewat Google Rich Results Test
 * sebelum launch.
 */

type Json = Record<string, unknown>;

export function organizationSchema(): Json {
  const schema: Json = {
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo, siteConfig.url),
    description: siteConfig.description,
  };

  if (siteConfig.sameAs.length > 0) schema.sameAs = siteConfig.sameAs;
  if (siteConfig.telephone) schema.telephone = siteConfig.telephone;
  if (siteConfig.email) schema.email = siteConfig.email;
  if (siteConfig.address) schema.address = { '@type': 'PostalAddress', ...siteConfig.address };

  return schema;
}

export function websiteSchema(): Json {
  return {
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.lang,
    publisher: { '@id': `${siteConfig.url}/#organization` },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path, siteConfig.url),
    })),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FaqItem[]): Json {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export interface ArticleInput {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}

export function articleSchema(input: ArticleInput): Json {
  return {
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(input.path, siteConfig.url) },
    datePublished: input.datePublished,
    // GEO: mesin generatif memprioritaskan konten segar, jadi dateModified
    // selalu diisi — default ke tanggal publikasi bila belum pernah diubah.
    dateModified: input.dateModified ?? input.datePublished,
    author: { '@type': 'Organization', name: input.author ?? siteConfig.name },
    publisher: { '@id': `${siteConfig.url}/#organization` },
    inLanguage: siteConfig.lang,
    ...(input.image ? { image: absoluteUrl(input.image, siteConfig.url) } : {}),
  };
}

/** Bungkus beberapa schema jadi satu `@graph` — satu <script> per halaman. */
export function buildJsonLd(...schemas: Json[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': schemas,
  });
}
