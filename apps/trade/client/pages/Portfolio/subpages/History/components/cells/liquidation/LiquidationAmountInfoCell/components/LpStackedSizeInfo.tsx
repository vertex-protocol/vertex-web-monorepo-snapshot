import { BigDecimal } from '@vertex-protocol/utils';
import { AmountWithSymbol } from 'client/components/AmountWithSymbol';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { formatNumber } from '@vertex-protocol/react-client';

interface Props {
  amount: BigDecimal;
  amountFormatSpecifier: string;
  valueUsd: BigDecimal;
  symbol: string;
}

export function LpStackedSizeInfo({
  amount,
  amountFormatSpecifier,
  valueUsd,
  symbol,
}: Props) {
  const formattedSize = formatNumber(amount, {
    formatSpecifier: amountFormatSpecifier,
  });
  const formattedValue = formatNumber(valueUsd, {
    formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
  });

  return (
    <div className="flex flex-col justify-center gap-y-0.5">
      <AmountWithSymbol formattedSize={formattedSize} symbol={symbol} />
      <div className="text-text-tertiary">{formattedValue}</div>
    </div>
  );
}
