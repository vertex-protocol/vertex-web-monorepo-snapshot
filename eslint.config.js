const custom = require('eslint-config-custom');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(custom, {
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
});
