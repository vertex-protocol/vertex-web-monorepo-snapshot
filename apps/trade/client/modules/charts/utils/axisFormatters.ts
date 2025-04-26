import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { formatNumber } from '@vertex-protocol/react-client';
import { formatTimestamp, TimeFormatSpecifier } from '@vertex-protocol/web-ui';

/**
 * @param value in milliseconds
 */
export function timeAxisFormatter(value: number) {
  return formatTimestamp(value, {
    formatSpecifier: TimeFormatSpecifier.HH_MM_12H,
  });
}

/**
 * @param value in milliseconds
 */
export function dateWithDayAxisFormatter(value: number) {
  return formatTimestamp(value, {
    formatSpecifier: TimeFormatSpecifier.E_D_MMM,
  });
}

/**
 * @param value in milliseconds
 */
export function dateAxisFormatter(value: number) {
  return formatTimestamp(value, {
    formatSpecifier: TimeFormatSpecifier.MONTH_D,
  });
}

/**
 * Formats larger currencies on the y axis
 * @param value in dollars
 */
export function currencyAxisFormatter(value: number): string {
  return formatNumber(value, {
    formatSpecifier: CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED,
  });
}

/**
 * Formats percentages on the y axis
 * @param value as fraction
 */
export function percentageAxisFormatter(value: number): string {
  return formatNumber(value, {
    formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_UPTO_4DP,
  });
}
