import {
  CustomNumberFormatSpecifier,
  getMarketSizeFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useSpotOrderFormContext } from 'client/pages/SpotTrading/context/SpotOrderFormContext';
import { SpotTradingFormTradingAccountMetrics } from 'client/pages/SpotTrading/hooks/useSpotTradingFormAccountMetrics';

interface Props {
  leverageEnabled: boolean;
  sizeIncrement: BigDecimal | undefined;
  showQuote: boolean | undefined;
  maxOrderSize: BigDecimal | undefined;
  symbol: string | undefined;
  derivedMetrics: SpotTradingFormTradingAccountMetrics['derivedMetrics'];
}

export function SpotTradingFormAccountInfo({
  leverageEnabled,
  maxOrderSize,
  showQuote,
  sizeIncrement,
  symbol = '',
  derivedMetrics,
}: Props) {
  const { allowAnyOrderSizeIncrement } = useSpotOrderFormContext();

  const sizeFormatSpecifier = (() => {
    if (showQuote) {
      return PresetNumberFormatSpecifier.NUMBER_2DP;
    }
    if (allowAnyOrderSizeIncrement) {
      return CustomNumberFormatSpecifier.NUMBER_PRECISE;
    }

    return getMarketSizeFormatSpecifier(sizeIncrement);
  })();

  if (leverageEnabled) {
    return (
      <div className="flex flex-col gap-y-1">
        <ValueWithLabel.Horizontal
          label="Max Available:"
          sizeVariant="xs"
          value={maxOrderSize}
          numberFormatSpecifier={sizeFormatSpecifier}
          valueEndElement={symbol}
        />
        <ValueWithLabel.Horizontal
          label="Amount to Borrow:"
          sizeVariant="xs"
          valueEndElement={derivedMetrics.borrowAssetSymbol}
          numberFormatSpecifier={sizeFormatSpecifier}
          value={derivedMetrics.amountToBorrow}
        />
      </div>
    );
  }

  return (
    <ValueWithLabel.Horizontal
      sizeVariant="xs"
      label="Available:"
      value={maxOrderSize}
      numberFormatSpecifier={sizeFormatSpecifier}
      valueEndElement={symbol}
      tooltip={showQuote ? { id: 'spotTradingAvailableQuote' } : undefined}
    />
  );
}
