import {
  BASE_COLOR_VARS,
  getColorVar,
  GetColorVarParams,
} from '@vertex-protocol/web-ui';

export const COLOR_VARS = {
  ...BASE_COLOR_VARS,
  // Chart Colors
  'chart-fill': '--color-chart-fill',
  'chart-fill-positive': '--color-chart-fill-positive',
  'chart-fill-negative': '--color-chart-fill-negative',
} as const;

type ColorVar = keyof typeof COLOR_VARS;

/**
 * A utility function to get the theme color variable string given a valid color variable name.
 * ex. `getEdgeStatsColorVar('surface-card')` => `'var(--color-surface-card)'` if `as` is `cssFn`
 * or `getEdgeStatsColorVar('surface-card')` => `'--color-surface-card'` if `as` is `variable`
 */
export function getEdgeStatsColorVar(
  colorVarName: ColorVar,
  params?: GetColorVarParams,
) {
  return getColorVar(COLOR_VARS, colorVarName, params);
}
