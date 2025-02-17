const custom = require('eslint-config-custom');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  custom,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
      },
    },
  },
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
);
