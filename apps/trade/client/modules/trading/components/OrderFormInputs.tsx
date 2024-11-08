import { BigDecimal } from '@vertex-protocol/client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { RangeSlider } from 'client/modules/trading/components/RangeSlider';
import { TradeInput } from 'client/modules/trading/components/TradeInput';
import { useOrderFormInputs } from 'client/modules/trading/hooks/useOrderFormInputs';
import {
  OrderFormError,
  OrderFormValidators,
} from 'client/modules/trading/types';

interface Props extends WithClassnames {
  formError: OrderFormError | undefined;
  validators: OrderFormValidators;
  baseSymbol: string | undefined;
  quoteSymbol: string | undefined;
  inputIncrements: {
    price: BigDecimal | undefined;
    size: BigDecimal | undefined;
  };
  minAssetOrderSize: BigDecimal | undefined;
}

export function OrderFormInputs({
  formError,
  baseSymbol,
  quoteSymbol,
  validators,
  inputIncrements,
  minAssetOrderSize,
  className,
}: Props) {
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
    errorTooltips,
  } = useOrderFormInputs({
    formError,
    validators,
    minAssetOrderSize,
    inputIncrements,
  });

  return (
    <div className={joinClassNames('flex flex-col gap-y-3', className)}>
      <div className="flex flex-col gap-y-2">
        {showPriceInput && (
          <TradeInput
            {...priceInputRegister}
            id={priceInputRegister.name}
            label={priceType === 'limit' ? 'Price' : 'Trigger'}
            step={inputIncrements.price?.toString()}
            symbol={undefined}
            error={errorTooltips.price}
          />
        )}
        <TradeInput
          {...assetAmountInputRegister}
          id={assetAmountInputRegister.name}
          label="Amount"
          symbol={baseSymbol}
          step={inputIncrements.size?.toString()}
          error={errorTooltips.assetAmount}
          onFocus={() => onFocusAmountSource('asset')}
        />
        <TradeInput
          {...quoteAmountInputRegister}
          id={quoteAmountInputRegister.name}
          label="Total"
          symbol={quoteSymbol}
          step={0.01}
          error={errorTooltips.quoteAmount}
          onFocus={() => onFocusAmountSource('quote')}
        />
      </div>
      <RangeSlider
        className="pr-5"
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
