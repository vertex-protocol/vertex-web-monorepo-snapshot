import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { LpDialogActionSummary } from 'client/modules/pools/components/LpDialogActionSummary';

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
    <LpDialogActionSummary.Container>
      <LpDialogActionSummary.Item
        label="Provide:"
        value={lpValueUsd}
        numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
        defaultValue={0}
        valueEndElement="Liquidity"
      />
      <LpDialogActionSummary.Item
        label="Est. Received:"
        value={lpAmount}
        numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        defaultValue={0}
        valueEndElement="LP Tokens"
      />
      <LpDialogActionSummary.Item
        label="Gas Fee:"
        definitionTooltipId="gasFee"
        value={feeAmount}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        valueEndElement={quoteSymbol}
      />
    </LpDialogActionSummary.Container>
  );
}
