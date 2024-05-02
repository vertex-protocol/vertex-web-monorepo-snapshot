import {
  BaseOrderFormValues,
  OrderFormError,
  OrderFormValidators,
} from 'client/modules/trading/types';
import { useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { BigDecimal } from '@vertex-protocol/client';
import { useOrderFormAssetAmountErrorTooltipContent } from './useOrderFormAssetAmountErrorTooltipContent';
import { useOrderFormPriceErrorTooltipContent } from './useOrderFormPriceErrorTooltipContent';
import { useOrderFormQuoteAmountErrorTooltipContent } from './useOrderFormQuoteAmountErrorTooltipContent';

interface Params {
  formError: OrderFormError | undefined;
  validators: OrderFormValidators;
  minAssetOrderSize: BigDecimal | undefined;
  inputIncrements: {
    price: BigDecimal | undefined;
    size: BigDecimal | undefined;
  };
}

export function useOrderFormInputs({
  formError,
  validators,
  inputIncrements,
  minAssetOrderSize,
}: Params) {
  const form = useFormContext<BaseOrderFormValues>();

  const { register, setValue, formState, watch, getValues } = form;

  const assetAmountErrorTooltipContent =
    useOrderFormAssetAmountErrorTooltipContent({
      formError,
      sizeIncrement: inputIncrements.size,
      minAssetOrderSize,
    });

  const priceErrorTooltipContent = useOrderFormPriceErrorTooltipContent({
    formError,
    priceIncrement: inputIncrements.price,
  });

  const quoteAmountErrorTooltipContent =
    useOrderFormQuoteAmountErrorTooltipContent({
      formError,
    });

  const {
    assetAmountInputRegister,
    quoteAmountInputRegister,
    priceInputRegister,
  } = useMemo(() => {
    return {
      assetAmountInputRegister: register('assetAmount', {
        validate: validators.amount,
      }),
      quoteAmountInputRegister: register('quoteAmount', {
        validate: validators.quoteAmount,
      }),
      priceInputRegister: register('price', {
        validate: validators.price,
      }),
    };
  }, [register, validators]);

  const percentageAmount = watch('percentageAmount');
  const amountSource = watch('amountSource');
  const priceType = watch('priceType');

  const showPriceInput = priceType === 'limit' || priceType === 'stop';

  // Max size queries require a price to be set if the price is configurable, so disable the fraction inputs if the price is not set
  const fractionInputsDisabled = showPriceInput && !getValues('price');

  // This fires only on direct change, not when `useForm` triggers a value change, so this is safe to do
  const onFractionChange = useCallback(
    (fractionAmount: number) => {
      if (amountSource !== 'percentage') {
        setValue('amountSource', 'percentage');
      }
      setValue('percentageAmount', fractionAmount);
    },
    [amountSource, setValue],
  );

  const onFocusAmountSource = useCallback(
    (source: BaseOrderFormValues['amountSource']) => {
      setValue('amountSource', source);
    },
    [setValue],
  );

  return {
    assetAmountInputRegister,
    quoteAmountInputRegister,
    priceInputRegister,
    percentageAmount,
    errors: formState.errors,
    fractionInputsDisabled,
    showPriceInput,
    priceType,
    errorTooltips: {
      assetAmount: assetAmountErrorTooltipContent,
      price: priceErrorTooltipContent,
      quoteAmount: quoteAmountErrorTooltipContent,
    },
    showStopMarketInfoTooltip: priceType === 'stop',
    onFractionChange,
    onFocusAmountSource,
  };
}
