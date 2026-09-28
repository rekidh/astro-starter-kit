import { siteConfig } from '~/config/site';
import { absoluteUrl } from './utils';

export interface SeoProps {
  title?: string;
  description?: string;
  /** Path relatif halaman, mis. `/blog/judul`. */
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

export interface ResolvedSeo {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noindex: boolean;
}

/**
 * Susun metadata halaman dari satu tempat.
 *
 * Title halaman digabung dengan nama situs, kecuali di homepage. Batas 60
 * dan 160 karakter dilaporkan sebagai peringatan saat build, bukan dipotong
 * diam-diam — memotong otomatis menyembunyikan masalah copy.
 */
export function resolveSeo(props: SeoProps): ResolvedSeo {
  const isHome = props.path === '/' || props.path === '';

  const title = props.title
    ? isHome
      ? props.title
      : `${props.title} · ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;

  const description = props.description ?? siteConfig.description;

  if (import.meta.env.DEV) {
    if (title.length > 60) console.warn(`[seo] title > 60 karakter (${title.length}): ${title}`);
    if (description.length > 160)
      console.warn(`[seo] description > 160 karakter (${description.length}) di ${props.path}`);
  }

  return {
    title,
    description,
    canonical: absoluteUrl(props.path, siteConfig.url),
    image: absoluteUrl(props.image ?? siteConfig.ogImage, siteConfig.url),
    type: props.type ?? 'website',
    publishedTime: props.publishedTime,
    modifiedTime: props.modifiedTime,
    noindex: props.noindex ?? false,
  };
}
