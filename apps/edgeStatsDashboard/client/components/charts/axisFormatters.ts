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
export function monthlyAxisFormatter(value: number) {
  return formatTimestamp(value, {
    formatSpecifier: TimeFormatSpecifier.MONTH_D_YYYY,
  });
}

/**
 * Formats larger numbers on the y axis as abbreviated representation ex. 1.5M
 * @param value as number
 */
export function largeNumberAbbreviatedAxisFormatter(value: number): string {
  return formatNumber(value, {
    formatSpecifier: CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED,
  });
}

/**
 * Formats larger currencly numbers on the y axis as abbreviated representation ex. 1.5M$
 * @param value as number
 */
export function largeCurrencyNumberAbbreviatedAxisFormatter(
  value: number,
): string {
  return formatNumber(value, {
    formatSpecifier: CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED,
  });
}

/**
 * Formats number on the y as axis as integer
 * @param value as number
 */
export function integerNumberAxisFormatter(value: number): string {
  return formatNumber(value, {
    formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
  });
}

/**
 * Formats larger numbers on the y axis as exponential representation ex. 1.56e6
 * @param value as number
 */
export function largeNumberAsExponentialAxisFormatter(value: number): string {
  return formatNumber(value, {
    formatSpecifier: '.3',
  });
}

/**
 * Formats percentages on the y axis
 * @param value as fraction
 */
export function percentageAxisFormatter(value: number): string {
  return formatNumber(value, {
    formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
  });
}

/**
 * Formats precise percentages on the y axis
 * @param value as fraction
 */
export function percentagePreciseAxisFormatter(value: number): string {
  return formatNumber(value, {
    formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_UPTO_4DP,
  });
}
