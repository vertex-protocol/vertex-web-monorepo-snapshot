import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
  formatNumber,
  getMarketQuoteSizeFormatSpecifier,
} from '@vertex-protocol/react-client';
import { LinkButton } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
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
  const showMarginUsageMetric = spotLeverageEnabled;
  const showAccountLeverageMetric = spotLeverageEnabled;

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
    ...(showMarginUsageMetric ? [marginUsageMetric] : []),
    ...(showAccountLeverageMetric ? [accountLeverageMetric] : []),
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
