module.exports = {
  extends: ['next', 'turbo', 'prettier'],
  plugins: ['@typescript-eslint', 'eslint-plugin-no-relative-import-paths'],
  parser: '@typescript-eslint/parser',
  rules: {
    'import/no-cycle': 'error',
    'import/newline-after-import': 'error',
    'react-hooks/exhaustive-deps': 'error',
    '@next/next/no-html-link-for-pages': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'local',
        args: 'all',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    'no-relative-import-paths/no-relative-import-paths': 'error',
  },
};
