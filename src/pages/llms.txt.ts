import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '~/config/site';

/**
 * /llms.txt — ringkasan situs untuk mesin generatif (PRD §7).
 *
 * Di-generate saat build dari Content Collections, jadi tidak pernah basi.
 * Field `answer` sengaja ikut: mesin generatif mengekstrak kalimat pembuka,
 * dan jawaban langsung jauh lebih mungkin dikutip daripada judul saja.
 */
export const GET: APIRoute = async () => {
  const [posts, faqs, terms] = await Promise.all([
    getCollection('blog', ({ data }) => !data.draft),
    getCollection('faq'),
    getCollection('glossary'),
  ]);

  const out: string[] = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.description}`,
    '',
    `Situs: ${siteConfig.url}`,
    `Bahasa: Indonesia`,
    '',
  ];

  if (faqs.length > 0) {
    out.push('## Pertanyaan yang sering diajukan', '');
    for (const faq of faqs.sort((a, b) => a.data.order - b.data.order)) {
      out.push(`### ${faq.data.question}`, '', faq.data.answer, '');
    }
  }

  if (terms.length > 0) {
    out.push('## Glosarium', '');
    for (const t of terms) {
      out.push(`- **${t.data.term}**: ${t.data.definition}`);
    }
    out.push('');
  }

  if (posts.length > 0) {
    out.push('## Artikel', '');
    const sorted = posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
    for (const post of sorted) {
      out.push(
        `### ${post.data.title}`,
        '',
        post.data.answer,
        '',
        `URL: ${siteConfig.url}/blog/${post.id}`,
        `Diperbarui: ${(post.data.updatedDate ?? post.data.pubDate).toISOString().slice(0, 10)}`,
        '',
      );
    }
  }

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
