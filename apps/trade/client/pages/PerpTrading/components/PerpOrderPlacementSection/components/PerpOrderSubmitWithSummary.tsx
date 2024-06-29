import { formatNumber } from '@vertex-protocol/react-client';
import { Button } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { OrderSubmitButton } from 'client/modules/trading/components/OrderSubmitButton';
import { useEstimateTradeEntry } from 'client/modules/trading/hooks/useEstimateTradeEntry';
import { usePerpOrderFormContext } from 'client/pages/PerpTrading/context/PerpOrderFormContext';

import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';

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
  const slippageToleranceMetric: ValueWithLabelProps = {
    label: 'Slippage',
    valueContent: (
      <div className="flex items-center gap-x-0.5">
        {formatNumber(slippageFraction, {
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

  const metricItems: ValueWithLabelProps[] = [
    {
      label: 'Est. Price',
      value: estimatedTradeEntry?.avgFillPrice,
      numberFormatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
    },
    ...(showSlippageMetric ? [slippageToleranceMetric] : []),
    {
      label: 'Est. Notional',
      value: estimatedTradeEntry?.estimatedTotal,
      valueEndElement: primaryQuoteToken.symbol,
      numberFormatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
    },
    {
      label: 'Est. Fee',
      tooltip: { id: 'tradingEstimatedFee', infoIcon: true },
      value: estimatedTradeEntry?.estimatedFee,
      valueEndElement: primaryQuoteToken.symbol,
      numberFormatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
    },
  ];

  const content = (
    <div className="flex w-full flex-col gap-y-1.5 px-3 pb-3">
      {metricItems.map((itemProps) => (
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          key={itemProps.label?.toString()}
          {...itemProps}
        />
      ))}
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
