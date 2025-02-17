const tseslint = require('typescript-eslint');
const turboConfig = require('eslint-config-turbo/flat');
const prettierConfig = require('eslint-config-prettier');
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const noRelativeImportPathsPlugin = require('eslint-plugin-no-relative-import-paths');
const { FlatCompat } = require('@eslint/eslintrc');

const nextConfig = new FlatCompat({ baseDirectory: __dirname }).extends('next');

module.exports = tseslint.config(
  nextConfig,
  turboConfig,
  prettierConfig,
  { ignores: ['.next'] },
  {
    files: ['**/*.{js,ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      'no-relative-import-paths': noRelativeImportPathsPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { vars: 'local', args: 'all', argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': [
        'error',
        { considerDefaultExhaustiveForUnions: true },
      ],
      'import/no-cycle': 'error',
      'import/newline-after-import': 'error',
      'no-relative-import-paths/no-relative-import-paths': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
);
