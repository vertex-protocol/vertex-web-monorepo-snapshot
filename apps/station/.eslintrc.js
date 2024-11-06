module.exports = {
  root: true,
  extends: ['custom'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  overrides: [
    {
      files: ['./**/*.js'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
  ],
};
