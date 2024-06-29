import { BigDecimal } from '@vertex-protocol/utils';
import { AmountWithSymbol } from 'client/components/AmountWithSymbol';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { formatNumber } from '@vertex-protocol/react-client';

interface Props {
  amountLiquidated: BigDecimal;
  amountFormatSpecifier: string;
  amountLiquidatedValueUsd: BigDecimal;
  symbol: string;
}

export function LiquidationSizeInfo({
  amountLiquidated,
  amountFormatSpecifier,
  amountLiquidatedValueUsd,
  symbol,
}: Props) {
  return (
    <div className="flex flex-col whitespace-nowrap">
      <AmountWithSymbol
        formattedSize={formatNumber(amountLiquidated.abs(), {
          formatSpecifier: amountFormatSpecifier,
        })}
        symbol={symbol}
      />
      <div className="text-text-tertiary">
        {formatNumber(amountLiquidatedValueUsd.abs(), {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        })}
      </div>
    </div>
  );
}
