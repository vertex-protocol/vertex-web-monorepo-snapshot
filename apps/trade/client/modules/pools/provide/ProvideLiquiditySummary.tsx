import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { Summary } from 'client/components/Summary';

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
        value={lpValueUsd}
        numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
        defaultValue={0}
        valueEndElement="Liquidity"
      />
      <Summary.Item
        label="Est. Received:"
        value={lpAmount}
        numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        defaultValue={0}
        valueEndElement="LP Tokens"
      />
      <Summary.Item
        label="Fee:"
        value={feeAmount}
        defaultValue={0}
        numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
        valueEndElement={quoteSymbol}
      />
    </Summary.Container>
  );
}
