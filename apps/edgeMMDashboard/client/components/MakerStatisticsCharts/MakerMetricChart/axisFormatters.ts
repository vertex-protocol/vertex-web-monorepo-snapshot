import { TimeInSeconds } from '@vertex-protocol/client';
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
 * Formats larger numbers on the y axis as abbreviated representation ex. 1.5M
 * @param value as number
 */
export function largeNumberAbbreviatedAxisFormatter(value: number): string {
  return formatNumber(value, {
    formatSpecifier: CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED,
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
 * Returns the appropriate x axis formatter based on the interval
 * @param interval
 */
export function getIntervalAxisFormatter(interval: number) {
  // Equal or greater then 1 month
  if (interval >= 30 * TimeInSeconds.DAY) {
    return dateAxisFormatter;
  }

  // Equal or greater then 1 day
  if (interval >= TimeInSeconds.DAY) {
    return dateWithDayAxisFormatter;
  }

  // Less than 1 day
  return timeAxisFormatter;
}
