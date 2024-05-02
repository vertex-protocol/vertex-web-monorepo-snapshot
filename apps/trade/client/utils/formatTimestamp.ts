import { format } from 'date-fns';

export enum TimeFormatSpecifier {
  E_D_MMM = 'E, MMM d', // Mon, Oct 15
  E_MMM_D_HH_12H = 'E, MMM d, p', // Mon, Oct 15, 1:00 PM
  MMM_D_HH_12H_O = 'MMM d, p (O)', // Oct 15, 1:00 PM (GMT-8) - Used for cases where the exact time is important
  HH_MM_SS = 'HH:mm:ss', // 08:30:12
  MM_SS = 'mm:ss', // 45:20
  HH_MM_SS_12H = 'pp', // 10:05:12 PM
  HH_MM_12H = 'p', // 10:05 PM
  MONTH_D = 'MMM d', /// Oct 15
  MONTH_D_YYYY = 'MMM d, yyyy', // Oct 15, 2023
}

export interface FormatOptions {
  //The format specifier to use, see https://date-fns.org/v2.29.3/docs/format
  formatSpecifier?: TimeFormatSpecifier | string;
  // What to render if the value given is null
  defaultFallback?: string;
}

export function formatTimestamp(
  val: number | Date | undefined,
  options?: FormatOptions,
) {
  if (val == null) {
    return options?.defaultFallback ?? '-';
  }

  return format(val, options?.formatSpecifier ?? TimeFormatSpecifier.HH_MM_SS);
}
