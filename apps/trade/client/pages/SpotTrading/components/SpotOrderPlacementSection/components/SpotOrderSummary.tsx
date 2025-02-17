import {
  CustomNumberFormatSpecifier,
  formatNumber,
  getMarketQuoteSizeFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { LinkButton } from '@vertex-protocol/web-ui';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useEstimateTradeEntry } from 'client/modules/trading/hooks/useEstimateTradeEntry';
import { useSpotLeverageEnabled } from 'client/modules/trading/hooks/useSpotLeverageEnabled';
import { useSpotOrderFormContext } from 'client/pages/SpotTrading/context/SpotOrderFormContext';
import { SpotTradingFormTradingAccountMetrics } from 'client/pages/SpotTrading/hooks/useSpotTradingFormAccountMetrics';

interface Props {
  currentState: SpotTradingFormTradingAccountMetrics['currentState'];
  estimatedState: SpotTradingFormTradingAccountMetrics['estimatedState'];
}

export function SpotOrderSummary({ currentState, estimatedState }: Props) {
  const { show } = useDialog();
  const {
    form: { watch },
    validatedAssetAmountInput,
    executionConversionPrice,
    slippageFraction,
    currentMarket,
    quoteMetadata,
  } = useSpotOrderFormContext();
  const { spotLeverageEnabled } = useSpotLeverageEnabled();

  const orderSide = watch('side');
  const priceType = watch('priceType');

  const estimatedTradeEntry = useEstimateTradeEntry({
    amountInput: validatedAssetAmountInput,
    executionLimitPrice: executionConversionPrice,
    productId: currentMarket?.productId,
    orderSide,
  });

  const showSlippageMetric = priceType === 'market' || priceType === 'stop';

  const slippageToleranceMetric: ValueWithLabelProps = {
    label: 'Max Slippage',
    valueContent: (
      <LinkButton
        onClick={() => {
          show({
            type: 'settings',
            params: {},
          });
        }}
        colorVariant="accent"
      >
        {formatNumber(slippageFraction, {
          formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        })}
      </LinkButton>
    ),
  };

  const marginUsageMetric: ValueWithLabelProps = {
    label: 'Margin Usage',
    value: currentState?.marginUsageBounded,
    newValue: estimatedState?.marginUsageBounded,
    numberFormatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
    tooltip: { id: 'marginUsage' },
  };

  const accountLeverageMetric: ValueWithLabelProps = {
    label: 'Account Leverage',
    valueClassName: 'gap-x-0',
    numberFormatSpecifier: PresetNumberFormatSpecifier.NUMBER_1DP,
    valueEndElement: 'x',
    value: currentState?.leverage,
    newValue: estimatedState?.leverage,
    tooltip: { id: 'accountLeverage' },
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
          formatSpecifier: getMarketQuoteSizeFormatSpecifier(
            quoteMetadata?.isPrimaryQuote,
          ),
        },
      )}`,
      valueEndElement: quoteMetadata?.symbol,
    },
    ...(showSlippageMetric ? [slippageToleranceMetric] : []),
    {
      label: 'Est. Total',
      value: estimatedTradeEntry?.estimatedTotal,
      valueEndElement: quoteMetadata?.symbol,
      numberFormatSpecifier: getMarketQuoteSizeFormatSpecifier(
        quoteMetadata?.isPrimaryQuote,
      ),
    },
    {
      label: `${currentMarket?.metadata.token.symbol} Balance`,
      value: currentState?.assetBalance,
      newValue: estimatedState?.assetBalance,
      numberFormatSpecifier: CustomNumberFormatSpecifier.NUMBER_PRECISE,
    },
  ];

  const accountMetricItems: ValueWithLabelProps[] = spotLeverageEnabled
    ? [marginUsageMetric, accountLeverageMetric]
    : [];
  const showCrossAccountMetrics = accountMetricItems.length > 0;

  return (
    <div className="flex flex-col gap-y-1">
      {orderMetricItems.map((itemProps, index) => (
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          key={index}
          {...itemProps}
        />
      ))}
      {showCrossAccountMetrics && (
        <>
          {/*Extra 4px of spacing between sections*/}
          <span className="text-text-primary mt-1 text-xs">Cross Account</span>
          {accountMetricItems.map((itemProps, index) => (
            <ValueWithLabel.Horizontal
              sizeVariant="xs"
              key={index}
              {...itemProps}
            />
          ))}
        </>
      )}
    </div>
  );
}
