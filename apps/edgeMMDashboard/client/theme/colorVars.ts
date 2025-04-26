import {
  BASE_COLOR_VARS,
  getColorVar,
  GetColorVarParams,
} from '@vertex-protocol/web-ui';

type ColorVar = keyof typeof BASE_COLOR_VARS;

/**
 * A utility function to get the theme color variable string given a valid color variable name.
 * ex. `getMMDashboardColorVar('surface-card')` => `'var(--color-surface-card)'` if `as` is `cssFn`
 * or `getMMDashboardColorVar('surface-card')` => `'--color-surface-card'` if `as` is `variable`
 */
export function getMMDashboardColorVar(
  colorVarName: ColorVar,
  params?: GetColorVarParams,
) {
  return getColorVar(BASE_COLOR_VARS, colorVarName, params);
}
