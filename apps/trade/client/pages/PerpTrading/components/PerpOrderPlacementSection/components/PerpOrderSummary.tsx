import {
  formatNumber,
  getMarketPriceFormatSpecifier,
  getMarketSizeFormatSpecifier,
} from '@vertex-protocol/react-client';
import { LinkButton } from '@vertex-protocol/web-ui';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { usePerpOrderFormContext } from 'client/pages/PerpTrading/context/PerpOrderFormContext';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { TradingFormPerpTradingAccountMetrics } from 'client/pages/PerpTrading/hooks/usePerpTradingFormTradingAccountMetrics';

interface Props {
  currentState: TradingFormPerpTradingAccountMetrics['currentState'];
  estimatedState: TradingFormPerpTradingAccountMetrics['estimatedState'];
}

export function PerpOrderSummary({ currentState, estimatedState }: Props) {
  const { show } = useDialog();
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { slippageFraction, currentMarket, estimatedTradeEntry, priceType } =
    usePerpOrderFormContext();

  const showSlippageMetric = priceType === 'market' || priceType === 'stop';
  const slippageToleranceMetric: ValueWithLabelProps = {
    label: 'Max Slippage',
    valueContent: (
      <LinkButton
        onClick={() =>
          show({
            type: 'settings',
            params: {},
          })
        }
        colorVariant="accent"
      >
        {formatNumber(slippageFraction, {
          formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        })}
      </LinkButton>
    ),
  };

  const showEstimatedFeeFireIcon = estimatedTradeEntry?.estimatedFee.isZero();

  const metricItems: ValueWithLabelProps[] = [
    {
      label: 'Est. Price',
      value: estimatedTradeEntry?.avgFillPrice,
      numberFormatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
    },
    {
      label: 'Est. Fee',
      tooltip: { id: 'tradingEstimatedFee' },
      valueContent: `${showEstimatedFeeFireIcon ? '🔥 ' : ''}${formatNumber(
        estimatedTradeEntry?.estimatedFee,
        {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
        },
      )}`,
      valueEndElement: primaryQuoteToken.symbol,
    },
    ...(showSlippageMetric ? [slippageToleranceMetric] : []),
    {
      label: 'Position',
      value: currentState?.positionAmount,
      newValue: estimatedState?.positionAmount,
      valueEndElement: currentMarket?.metadata.marketName,
      numberFormatSpecifier: getMarketSizeFormatSpecifier(
        currentMarket?.sizeIncrement,
      ),
    },
    {
      label: 'Est. Liq Price',
      value: currentState?.estimatedLiquidationPrice ?? undefined,
      newValue: estimatedState?.estimatedLiquidationPrice ?? undefined,
      numberFormatSpecifier: getMarketPriceFormatSpecifier(
        currentMarket?.priceIncrement,
      ),
    },
    {
      label: 'Margin Usage',
      value: currentState?.marginUsageBounded,
      newValue: estimatedState?.marginUsageBounded,
      numberFormatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
      tooltip: { id: 'marginUsage' },
    },
    {
      label: 'Account Leverage',
      valueClassName: 'gap-x-0',
      numberFormatSpecifier: PresetNumberFormatSpecifier.NUMBER_1DP,
      valueEndElement: 'x',
      value: currentState?.leverage,
      newValue: estimatedState?.leverage,
      tooltip: { id: 'accountLeverage' },
    },
  ];

  return (
    <div className="flex flex-col gap-y-1">
      {metricItems.map((itemProps) => (
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          key={itemProps.label?.toString()}
          {...itemProps}
        />
      ))}
    </div>
  );
}
