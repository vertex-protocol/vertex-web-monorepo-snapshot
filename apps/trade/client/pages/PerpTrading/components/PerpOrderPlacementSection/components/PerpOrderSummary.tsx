import {
  formatNumber,
  getMarketPriceFormatSpecifier,
  getMarketSizeFormatSpecifier,
  PresetNumberFormatSpecifier,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { LinkButton } from '@vertex-protocol/web-ui';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { usePerpOrderFormContext } from 'client/pages/PerpTrading/context/PerpOrderFormContext';
import { TradingFormPerpTradingAccountMetrics } from 'client/pages/PerpTrading/hooks/usePerpTradingFormTradingAccountMetrics';

interface Props {
  currentState: TradingFormPerpTradingAccountMetrics['currentState'];
  estimatedState: TradingFormPerpTradingAccountMetrics['estimatedState'];
}

export function PerpOrderSummary({ currentState, estimatedState }: Props) {
  const { show } = useDialog();
  const { primaryQuoteToken } = useVertexMetadataContext();
  const {
    slippageFraction,
    currentMarket,
    estimatedTradeEntry,
    priceType,
    marginMode,
  } = usePerpOrderFormContext();

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

  const orderMetricItems: ValueWithLabelProps[] = [
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
      newValue: estimatedState?.estimatedLiquidationPrice,
      numberFormatSpecifier: getMarketPriceFormatSpecifier(
        currentMarket?.priceIncrement,
      ),
    },
  ];

  const showAvailableMargin = marginMode.mode === 'isolated';
  const availableMarginMetric: ValueWithLabelProps = {
    label: 'Available Margin',
    numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
    value: currentState?.fundsAvailableUsdBounded,
    newValue: estimatedState?.fundsAvailableUsdBounded,
    tooltip: { id: 'fundsAvailable' },
  };

  const accountMetricItems: ValueWithLabelProps[] = [
    ...(showAvailableMargin ? [availableMarginMetric] : []),
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
      {orderMetricItems.map((itemProps) => (
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          key={itemProps.label?.toString()}
          {...itemProps}
        />
      ))}
      {/*Extra 4px of spacing between sections*/}
      <span className="text-text-primary mt-1 text-xs">Cross Account</span>
      {accountMetricItems.map((itemProps, index) => (
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          key={index}
          {...itemProps}
        />
      ))}
    </div>
  );
}
