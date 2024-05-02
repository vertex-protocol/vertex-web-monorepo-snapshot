module.exports = {
  // Type check, Lint check and prettify
  '!(public/**/*)**/*.(ts|tsx|js)': (filenames) => [
    'yarn typecheck',
    'yarn lint',
    `yarn prettier --write ${filenames.join(' ')}`,
  ],
  // Prettify
  '**/*.(md|json)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
};
