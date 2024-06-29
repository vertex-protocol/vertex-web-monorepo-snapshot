import {
  PresetNumberFormatSpecifier,
  formatNumber,
  getMarketQuoteSizeFormatSpecifier,
} from '@vertex-protocol/react-client';
import { Button } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { OrderSubmitButton } from 'client/modules/trading/components/OrderSubmitButton';
import { useEstimateTradeEntry } from 'client/modules/trading/hooks/useEstimateTradeEntry';
import { useSpotOrderFormContext } from 'client/pages/SpotTrading/context/SpotOrderFormContext';

interface Props {
  onSlippageAdjust: () => void;
}

export function SpotOrderSubmitWithSummary({ onSlippageAdjust }: Props) {
  const {
    form: { watch },
    buttonState,
    userStateError,
    validatedAssetAmountInput,
    executionConversionPrice,
    slippageFraction,
    currentMarket,
    quoteMetadata,
  } = useSpotOrderFormContext();

  const orderSide = watch('side');
  const priceType = watch('priceType');
  const marketSymbol = currentMarket?.metadata.token.symbol;

  const estimatedTradeEntry = useEstimateTradeEntry({
    amountInput: validatedAssetAmountInput,
    executionLimitPrice: executionConversionPrice,
    productId: currentMarket?.productId ?? 0,
    orderSide,
  });

  const showSlippageMetric = priceType === 'market' || priceType === 'stop';
  const slippageToleranceMetric: ValueWithLabelProps = {
    label: 'Slippage',
    valueContent: (
      <div className="flex items-center gap-x-1">
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
      label: 'Est. Total',
      value: estimatedTradeEntry?.estimatedTotal,
      valueEndElement: quoteMetadata?.symbol,
      numberFormatSpecifier: getMarketQuoteSizeFormatSpecifier(
        quoteMetadata?.isPrimaryQuote,
      ),
    },
    {
      label: 'Est. Fee',
      tooltip: { id: 'tradingEstimatedFee', infoIcon: true },
      value: estimatedTradeEntry?.estimatedFee,
      valueEndElement: quoteMetadata?.symbol,
      numberFormatSpecifier: getMarketQuoteSizeFormatSpecifier(
        quoteMetadata?.isPrimaryQuote,
      ),
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
        isPerp={false}
        userStateError={userStateError}
        marketSymbol={marketSymbol}
        state={buttonState}
        side={orderSide}
      />
    </ActionSummary.Container>
  );
}
