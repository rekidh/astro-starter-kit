import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Gabungkan class Tailwind dengan resolusi konflik.
 * `cn('p-2', 'p-4')` → `'p-4'`
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Gabungkan path relatif dengan base URL situs menjadi URL absolut. */
export function absoluteUrl(path: string, base: string): string {
  return new URL(path, base).href;
}

/** Format tanggal ke bahasa Indonesia, mis. "28 September 2026". */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  }).format(d);
}

/** Bentuk `<time datetime="...">` — ISO 8601, dipakai juga di JSON-LD. */
export function isoDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString();
}

/** Ubah teks menjadi slug URL-safe. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
