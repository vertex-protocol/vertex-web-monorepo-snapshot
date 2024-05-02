import { BigDecimal } from '@vertex-protocol/utils';
import { Summary } from 'client/components/Summary';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';

interface Props {
  lpValueUsd: BigDecimal | undefined;
  lpAmount: BigDecimal | undefined;
  feeAmount: BigDecimal | undefined;
  quoteSymbol: string;
}

export function ProvideLiquiditySummary({
  lpValueUsd,
  lpAmount,
  feeAmount,
  quoteSymbol,
}: Props) {
  return (
    <Summary.Container>
      <Summary.Item
        label="Provide:"
        value={`${formatNumber(lpValueUsd, {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
          defaultValue: 0,
        })} Liquidity`}
      />
      <Summary.Item
        label="Est. Received:"
        value={`${formatNumber(lpAmount, {
          formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
          defaultValue: 0,
        })} LP Tokens`}
      />
      <Summary.Item
        label="Fee:"
        value={`${formatNumber(feeAmount, {
          formatSpecifier: CustomNumberFormatSpecifier.NUMBER_PRECISE,
        })} ${quoteSymbol}`}
      />
    </Summary.Container>
  );
}
