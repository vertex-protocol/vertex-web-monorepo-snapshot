import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';

interface Props {
  estimatedValueUsd: BigDecimal | undefined;
}

export function EstimatedCurrencyValueItem({ estimatedValueUsd }: Props) {
  if (!estimatedValueUsd) {
    return null;
  }

  const formattedValue = formatNumber(estimatedValueUsd, {
    formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
  });

  return `~ ${formattedValue}`;
}
