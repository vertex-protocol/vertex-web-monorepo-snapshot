const custom = require('eslint-config-custom');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  custom,
  { ignores: ['public/charting_library/'] },
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
