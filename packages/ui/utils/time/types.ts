import { TimeFormatSpecifier } from './TimeFormatSpecifier';

export type TimeFormatValue = Date | number;

export interface FormatOptions {
  /** The format specifier to use, see https://date-fns.org/v4.1.0/docs/format */
  formatSpecifier?: TimeFormatSpecifier | string;
  /** What to render if the value given is null */
  defaultFallback?: string;
}
