import { FormatOptions } from './types';
import { formatTimestamp } from './formatTimestamp';
import { addMinutes } from 'date-fns';

/**
 * Format a duration in milliseconds in human-readable format.
 *
 * @param {number | undefined} val
 * @returns {string}
 */
export function formatDurationMillis(
  val: number | undefined,
  options?: FormatOptions,
) {
  if (val == null) {
    return formatTimestamp(val, options);
  }

  // Add timezone offset to make val timezone independent (it's a duration!)
  // The number of minutes returned by getTimezoneOffset() is positive if the local time zone is behind UTC, and negative if the local time zone is ahead of UTC.
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset#negative_values_and_positive_values
  //
  // Example: SGT is UTC+8 (+480 minutes) therefore getTimezoneOffset will return -480, so val+(-480) will return a duration centered to 00:00 UTC for formatting.
  const adjustedVal = addMinutes(val, new Date(val).getTimezoneOffset());

  return formatTimestamp(adjustedVal, options);
}
