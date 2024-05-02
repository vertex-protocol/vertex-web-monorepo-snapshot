import { BigDecimal } from '@vertex-protocol/utils';
import { WithClassnames } from '@vertex-protocol/web-common';
import { Summary } from 'client/components/Summary';
import { useSpotOrderFormContext } from 'client/pages/SpotTrading/context/SpotOrderFormContext';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { getMarketSizeFormatSpecifier } from 'client/utils/formatNumber/getMarketSizeFormatSpecifier';

interface Props {
  leverageEnabled: boolean;
  sizeIncrement: BigDecimal | undefined;
  showQuote: boolean | undefined;
  maxOrderSize: BigDecimal | undefined;
  symbol: string | undefined;
}

export function SpotTradingFormAccountInfo({
  leverageEnabled,
  maxOrderSize,
  showQuote,
  sizeIncrement,
  symbol = '',
  className,
}: WithClassnames<Props>) {
  const {
    tradingAccountMetrics: { derivedMetrics },
    allowAnyOrderSizeIncrement,
  } = useSpotOrderFormContext();

  const sizeFormatSpecifier = (() => {
    if (showQuote) {
      return PresetNumberFormatSpecifier.NUMBER_2DP;
    }
    if (allowAnyOrderSizeIncrement) {
      return CustomNumberFormatSpecifier.NUMBER_PRECISE;
    }

    return getMarketSizeFormatSpecifier(sizeIncrement);
  })();

  const items = (() => {
    if (leverageEnabled) {
      return (
        <>
          <Summary.Item
            label={
              <>
                <span className="text-positive">Max</span> Available:
              </>
            }
            value={`${formatNumber(maxOrderSize, {
              formatSpecifier: sizeFormatSpecifier,
            })} ${symbol}`}
          />
          <Summary.Item
            label="Borrow:"
            value={`${formatNumber(derivedMetrics.amountToBorrow, {
              formatSpecifier: sizeFormatSpecifier,
            })} ${derivedMetrics.borrowAssetSymbol}`}
          />
        </>
      );
    }

    return (
      <Summary.Item
        label="Available:"
        value={`${formatNumber(maxOrderSize, {
          formatSpecifier: sizeFormatSpecifier,
        })} ${symbol}`}
        definitionTooltipId={
          showQuote ? 'spotTradingAvailableQuote' : undefined
        }
      />
    );
  })();

  return <Summary.Container className={className}>{items}</Summary.Container>;
}
