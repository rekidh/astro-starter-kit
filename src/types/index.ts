/** Tipe bersama lintas komponen. */

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface Crumb {
  name: string;
  path: string;
}

/** Ukuran dan varian standar untuk komponen UI. */
export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
