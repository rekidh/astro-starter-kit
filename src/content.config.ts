import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content Collections — mesin konten untuk SEO & GEO (PRD §7).
 *
 * Field `answer` di blog/faq bukan hiasan: itu jawaban langsung 1–2 kalimat
 * yang diletakkan di awal konten dan diekstrak ke llms.txt. Mesin generatif
 * mengutip kalimat pembuka, jadi jawaban harus di depan.
 */

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(70),
      description: z.string().min(120).max(170),
      /** Jawaban langsung, 1–2 kalimat. Muncul di awal artikel dan di llms.txt. */
      answer: z.string().min(40).max(400),
      /** Pertanyaan yang dijawab artikel ini — dipakai untuk heading & FAQ schema. */
      question: z.string().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default('Tim Arebi'),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    /** Jawaban harus mandiri — bisa dipahami tanpa konteks sekitarnya. */
    answer: z.string().min(40),
    category: z.string().default('umum'),
    order: z.number().default(100),
    updatedDate: z.coerce.date().optional(),
  }),
});

const glossary = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/glossary' }),
  schema: z.object({
    term: z.string(),
    /** Definisi eksplisit: "X adalah …" — bentuk yang paling mudah dikutip. */
    definition: z.string().min(40),
    aliases: z.array(z.string()).default([]),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog, faq, glossary };
