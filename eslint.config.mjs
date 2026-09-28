import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default tseslint.config(
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', '*.min.*', '.lighthouseci/**'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-recommended'],

  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // Skrip inline di file .astro berjalan di browser tanpa bundling tipe.
  {
    files: ['**/*.astro'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },

  // File konfigurasi berjalan di Node.
  {
    files: ['*.config.{mjs,ts}', 'src/pages/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },
);
