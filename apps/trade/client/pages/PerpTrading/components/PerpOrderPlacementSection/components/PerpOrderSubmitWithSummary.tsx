import { BigDecimal } from '@vertex-protocol/utils';
import { Button } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { LineItem } from 'client/components/LineItem/LineItem';
import { LineItemMetricWithEstimationProps } from 'client/components/LineItem/types';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { OrderSubmitButton } from 'client/modules/trading/components/OrderSubmitButton';
import { useEstimateTradeEntry } from 'client/modules/trading/hooks/useEstimateTradeEntry';
import { usePerpOrderFormContext } from 'client/pages/PerpTrading/context/PerpOrderFormContext';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';

import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';

interface Props {
  onSlippageAdjust: () => void;
}

export function PerpOrderSubmitWithSummary({ onSlippageAdjust }: Props) {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const {
    form: { watch },
    validatedAssetAmountInput,
    userStateError,
    executionConversionPrice,
    slippageFraction,
    buttonState,
    currentMarket,
  } = usePerpOrderFormContext();

  const side = watch('side');
  const priceType = watch('priceType');
  const marketSymbol = currentMarket?.metadata.symbol;

  const estimatedTradeEntry = useEstimateTradeEntry({
    amountInput: validatedAssetAmountInput,
    executionLimitPrice: executionConversionPrice,
    productId: currentMarket?.productId ?? 0,
    orderSide: side,
  });

  const showSlippageMetric = priceType === 'market' || priceType === 'stop';
  const slippageToleranceMetric: LineItemMetricWithEstimationProps<
    BigDecimal | number
  > = {
    label: 'Slippage',
    currentValue: slippageFraction,
    renderValue: (value) => (
      <div className="flex items-center gap-x-0.5">
        {formatNumber(value, {
          formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        })}
        <Button
          as="div"
          onClick={onSlippageAdjust}
          className="text-accent underline"
        >
          adjust
        </Button>
      </div>
    ),
  };

  const metricItems: LineItemMetricWithEstimationProps<BigDecimal | number>[] =
    [
      {
        label: 'Est. Price',
        currentValue: estimatedTradeEntry?.avgFillPrice,
        renderValue: PresetNumberFormatSpecifier.NUMBER_2DP,
      },
      ...(showSlippageMetric ? [slippageToleranceMetric] : []),
      {
        label: 'Est. Notional',
        currentValue: estimatedTradeEntry?.estimatedTotal,
        valueEndElement: primaryQuoteToken.symbol,
        renderValue: PresetNumberFormatSpecifier.NUMBER_2DP,
      },
      {
        label: 'Est. Fee',
        tooltip: { id: 'tradingEstimatedFee', infoIcon: true },
        currentValue: estimatedTradeEntry?.estimatedFee,
        valueEndElement: primaryQuoteToken.symbol,
        renderValue: PresetNumberFormatSpecifier.NUMBER_2DP,
      },
    ];

  const content = (
    <div className="flex w-full flex-col gap-y-1.5 px-3 pb-3">
      {metricItems.map(
        ({
          currentValue,
          estimatedValue,
          label,
          renderValue,
          valueEndElement,
          tooltip,
        }) => (
          <LineItem.MetricWithEstimation
            className="text-2xs"
            key={label?.toString()}
            label={label}
            tooltip={tooltip}
            currentValue={currentValue}
            estimatedValue={estimatedValue}
            renderValue={renderValue}
            valueEndElement={valueEndElement}
          />
        ),
      )}
    </div>
  );

  return (
    <ActionSummary.Container className="bg-surface-1">
      <ActionSummary.Disclosure
        expandableContent={content}
        labelContent="Summary"
        isHighlighted={!!estimatedTradeEntry}
      />
      <OrderSubmitButton
        isPerp
        userStateError={userStateError}
        marketSymbol={marketSymbol}
        state={buttonState}
        side={side}
      />
    </ActionSummary.Container>
  );
}
