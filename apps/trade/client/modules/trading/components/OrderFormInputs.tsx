import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { TradeInput } from 'client/modules/trading/components/TradeInput';
import {
  OrderFormError,
  OrderFormValidators,
} from 'client/modules/trading/types';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { useOrderFormInputs } from '../hooks/useOrderFormInputs';
import { RangeSlider } from './RangeSlider';

interface Props extends WithClassnames {
  formError: OrderFormError | undefined;
  validators: OrderFormValidators;
  marketSymbol: string | undefined;
  inputIncrements: {
    price: BigDecimal | undefined;
    size: BigDecimal | undefined;
  };
  minAssetOrderSize: BigDecimal | undefined;
}

export function OrderFormInputs({
  formError,
  marketSymbol,
  validators,
  inputIncrements,
  minAssetOrderSize,
  className,
}: Props) {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const {
    assetAmountInputRegister,
    quoteAmountInputRegister,
    priceInputRegister,
    fractionInputsDisabled,
    onFractionChange,
    onFocusAmountSource,
    showPriceInput,
    priceType,
    percentageAmount,
    showStopMarketInfoTooltip,
    errorTooltips,
  } = useOrderFormInputs({
    formError,
    validators,
    minAssetOrderSize,
    inputIncrements,
  });

  return (
    <div className={joinClassNames('flex flex-col gap-y-2', className)}>
      <div className="flex flex-col gap-y-2">
        {showPriceInput && (
          <TradeInput
            {...priceInputRegister}
            id={priceInputRegister.name}
            label={priceType === 'limit' ? 'Price' : 'Trigger'}
            definitionId={
              showStopMarketInfoTooltip ? 'tradingStopMarketInfo' : undefined
            }
            step={inputIncrements.price?.toString()}
            symbol={undefined}
            error={errorTooltips.price}
          />
        )}
        <TradeInput
          {...assetAmountInputRegister}
          id={assetAmountInputRegister.name}
          label="Amount"
          symbol={marketSymbol}
          step={inputIncrements.size?.toString()}
          error={errorTooltips.assetAmount}
          onFocus={() => onFocusAmountSource('asset')}
        />
      </div>
      <TradeInput
        {...quoteAmountInputRegister}
        id={quoteAmountInputRegister.name}
        label="Total"
        symbol={primaryQuoteToken.symbol}
        step={0.01}
        error={errorTooltips.quoteAmount}
        onFocus={() => onFocusAmountSource('quote')}
      />
      <RangeSlider
        min={0}
        max={1}
        step={0.05}
        value={percentageAmount}
        disabled={fractionInputsDisabled}
        renderValue={(value) =>
          formatNumber(value, {
            formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_INT,
          })
        }
        onValueChange={onFractionChange}
      />
      <FractionAmountButtons
        disabled={fractionInputsDisabled}
        selectedFraction={percentageAmount}
        onFractionSelected={onFractionChange}
      />
    </div>
  );
}
