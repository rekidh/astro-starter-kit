import { signal, computed } from '@preact/signals';

/**
 * State UI global.
 *
 * Padanan Zustand di stack ini adalah Preact Signals — sudah ada di
 * dependency untuk island, ~0 KB tambahan, dan bisa dibaca dari skrip
 * vanilla maupun komponen Preact.
 */

export const isMobileNavOpen = signal(false);

export function toggleMobileNav(): void {
  isMobileNavOpen.value = !isMobileNavOpen.value;
}

export function closeMobileNav(): void {
  isMobileNavOpen.value = false;
}

export type Theme = 'light' | 'dark';

export const theme = signal<Theme>('light');

export const isDark = computed(() => theme.value === 'dark');
