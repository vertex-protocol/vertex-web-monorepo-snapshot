import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';

interface Props extends WithClassnames {
  isError?: boolean;
  estimatedValueUsd: BigDecimal | undefined;
}

export function EstimatedCurrencyValueItem({
  estimatedValueUsd,
  isError,
  className,
}: Props) {
  if (!estimatedValueUsd) {
    return null;
  }

  const formattedValue = formatNumber(estimatedValueUsd, {
    formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
  });

  return (
    <div
      className={joinClassNames(
        isError ? 'text-disabled' : 'text-text-tertiary',
        className,
      )}
    >
      {`~ ${formattedValue}`}
    </div>
  );
}
