import type { APIRoute } from 'astro';
import { siteConfig } from '~/config/site';

/**
 * robots.txt sebagai endpoint, bukan file statis, supaya URL sitemap
 * selalu ikut domain yang benar tanpa diedit manual per environment.
 *
 * Crawler mesin generatif diizinkan SECARA SENGAJA — itu prasyarat agar
 * konten Arebi bisa dikutip di ChatGPT, Perplexity, dan AI Overviews (PRD §7).
 */

const GENERATIVE_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

/** Route privat fase 2 — tidak boleh di-crawl siapa pun. */
const DISALLOW = ['/api/', '/app/', '/login', '/register', '/lupa-password', '/reset-password', '/verifikasi-email'];

export const GET: APIRoute = () => {
  const lines: string[] = [
    '# Mesin pencari',
    'User-agent: Googlebot',
    'Allow: /',
    '',
    'User-agent: Bingbot',
    'Allow: /',
    '',
    '# Mesin generatif — diizinkan sengaja untuk GEO',
  ];

  for (const bot of GENERATIVE_BOTS) {
    lines.push(`User-agent: ${bot}`, 'Allow: /', '');
  }

  lines.push('# Default', 'User-agent: *', 'Allow: /');
  for (const path of DISALLOW) lines.push(`Disallow: ${path}`);

  lines.push('', `Sitemap: ${siteConfig.url}/sitemap-index.xml`, '');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
