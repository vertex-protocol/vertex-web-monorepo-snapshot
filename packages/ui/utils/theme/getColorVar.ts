export interface GetColorVarParams {
  as?: 'variable' | 'cssFn';
}

/**
 * A utility function to get the theme color variable string given a valid color variable name.
 * ex. `getColorVar('surface-card')` => `'var(--color-surface-card)'` if as is `cssFn`
 * or `getColorVar('surface-card')` => `'--color-surface-card'` if `as` is `variable`
 */
export function getColorVar<TVars>(
  colorVars: TVars,
  colorVarName: keyof TVars,
  params?: GetColorVarParams,
) {
  const colorVarValue = colorVars[colorVarName];

  return params?.as === 'variable' ? colorVarValue : `var(${colorVarValue})`;
}
