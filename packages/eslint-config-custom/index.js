module.exports = {
  extends: ['next', 'turbo', 'prettier'],
  rules: {
    'react-hooks/exhaustive-deps': 'error',
    '@next/next/no-html-link-for-pages': 'off',
  },
};
