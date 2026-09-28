import { describe, expect, it } from 'vitest';
import { absoluteUrl, cn, formatDate, isoDate, slugify } from '../utils';

describe('cn', () => {
  it('menggabungkan class', () => {
    expect(cn('p-2', 'text-sm')).toBe('p-2 text-sm');
  });

  it('menyelesaikan konflik Tailwind dengan class terakhir yang menang', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('mengabaikan nilai falsy', () => {
    expect(cn('p-2', false, undefined, null, 'text-sm')).toBe('p-2 text-sm');
  });
});

describe('absoluteUrl', () => {
  it('menggabungkan path relatif dengan base', () => {
    expect(absoluteUrl('/kontak', 'https://arebi.test')).toBe('https://arebi.test/kontak');
  });

  it('membiarkan URL absolut apa adanya', () => {
    expect(absoluteUrl('https://cdn.test/a.jpg', 'https://arebi.test')).toBe(
      'https://cdn.test/a.jpg',
    );
  });
});

describe('slugify', () => {
  it('mengubah teks menjadi slug', () => {
    expect(slugify('Layanan Utama Arebi')).toBe('layanan-utama-arebi');
  });

  it('membuang tanda baca dan merapikan pemisah', () => {
    expect(slugify('  SEO & GEO: Panduan!  ')).toBe('seo-geo-panduan');
  });

  it('menghilangkan diakritik', () => {
    expect(slugify('Café Créme')).toBe('cafe-creme');
  });
});

describe('formatDate', () => {
  it('memformat ke bahasa Indonesia', () => {
    expect(formatDate('2026-09-28T00:00:00Z')).toBe('28 September 2026');
  });
});

describe('isoDate', () => {
  it('menghasilkan ISO 8601', () => {
    expect(isoDate('2026-09-28T00:00:00Z')).toBe('2026-09-28T00:00:00.000Z');
  });
});
