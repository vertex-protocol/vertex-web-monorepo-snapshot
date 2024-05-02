import { toBigDecimal } from '@vertex-protocol/utils';
import { mapCustomFormatSpecifier } from 'client/utils/formatNumber/mapCustomFormatSpecifier';
import { CustomNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import {
  NumberFormatOptions,
  NumberFormatValue,
} from 'client/utils/formatNumber/types';
import { format as d3Format } from 'd3-format';
import { postProcessFormattedNumber } from 'client/utils/formatNumber/postProcessFormattedNumber';

export function formatNumber(
  val?: NumberFormatValue,
  options?: NumberFormatOptions,
): string {
  const { defaultValue, defaultFallback, formatSpecifier } = options ?? {};

  if (defaultValue == null && val == null) {
    return defaultFallback ?? '-';
  }

  const givenFormatSpecifier =
    formatSpecifier ?? CustomNumberFormatSpecifier.NUMBER_AUTO;

  const valueToFormat = toBigDecimal(val ?? defaultValue ?? 0);
  const mappedCustomSpecifier = mapCustomFormatSpecifier(
    valueToFormat,
    givenFormatSpecifier,
  );
  const resolvedFormatSpecifier = mappedCustomSpecifier ?? givenFormatSpecifier;

  const formatted = d3Format(resolvedFormatSpecifier)(valueToFormat.toNumber());

  return postProcessFormattedNumber(formatted, givenFormatSpecifier);
}
