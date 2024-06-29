import { BigDecimal } from '@vertex-protocol/utils';
import {
  percentageValidator,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { BaseOrderFormValues } from 'client/modules/trading/types';
import { toSafeFormPercentage } from 'client/utils/form/toSafeFormPercentage';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { roundToDecimalPlaces, roundToString } from 'client/utils/rounding';
import { PrimitiveAtom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Params {
  form: UseFormReturn<BaseOrderFormValues>;
  productId: number | undefined;
  priceInputAtom: PrimitiveAtom<BigDecimal | undefined>;
  maxAssetOrderSize: BigDecimal | undefined;
  inputConversionPrice: BigDecimal | undefined;
  roundPrice: (price: BigDecimal) => BigDecimal;
  roundAmount: (amount: BigDecimal) => BigDecimal;
}

/**
 * Side effects for syncing inputs. Makes the following assumptions:
 * - There is no validation for % amount
 * - The form is in the `onTouched` mode, so we must "touch" the fields that we set in order for subsequent validation to occur on change
 */
export function useOrderFormOnChangeSideEffects({
  form,
  productId,
  priceInputAtom,
  maxAssetOrderSize,
  inputConversionPrice,
  roundPrice,
  roundAmount,
}: Params) {
  // Update price input on atom value change (from clicking on chart / OB etc)
  const [priceInputAtomValue, setPriceInputAtomValue] = useAtom(priceInputAtom);
  useEffect(
    () => {
      if (priceInputAtomValue != null) {
        form.setValue('price', roundPrice(priceInputAtomValue).toString(), {
          shouldValidate: true,
          shouldTouch: true,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [priceInputAtomValue],
  );

  const priceInput = form.watch('price');
  const assetInput = form.watch('assetAmount');
  const percentageInput = form.watch('percentageAmount');
  const quoteInput = form.watch('quoteAmount');
  const amountSource = form.watch('amountSource');
  const timeInForceType = form.watch('timeInForceType');
  const priceType = form.watch('priceType');

  // When priceInput changes, reset priceInputAtomValue to undefined
  // Required so that BaseOrderFormValues.price will correctly update for ALL price levels
  useEffect(() => {
    setPriceInputAtomValue(undefined);
  }, [priceInput, setPriceInputAtomValue]);

  // Update based on max order size change
  useEffect(
    () => {
      // Fire only when we have the necessary data
      if (!inputConversionPrice || !maxAssetOrderSize) {
        return;
      }

      // Asset as source of truth
      const validAssetAmount = parseValidNumber(assetInput);
      if (amountSource === 'asset' && validAssetAmount) {
        // We want to set the asset input to run validation
        form.setValue('assetAmount', assetInput, {
          shouldValidate: true,
          shouldTouch: true,
        });
        form.setValue(
          'quoteAmount',
          toQuoteInput(validAssetAmount.multipliedBy(inputConversionPrice)),
          { shouldValidate: true, shouldTouch: true },
        );
        form.setValue(
          'percentageAmount',
          toSafePercentageAmount(maxAssetOrderSize, assetInput),
        );
      }

      // Quote as source of truth, similar logic to above
      const validQuoteAmount = parseValidNumber(quoteInput);
      if (amountSource === 'quote' && validQuoteAmount) {
        form.setValue('quoteAmount', quoteInput, {
          shouldValidate: true,
          shouldTouch: true,
        });
        const assetAmountInput = toAssetInputValue(
          validQuoteAmount.div(inputConversionPrice),
          roundAmount,
        ).toString();
        form.setValue('assetAmount', assetAmountInput, {
          shouldValidate: true,
          shouldTouch: true,
        });
        form.setValue(
          'percentageAmount',
          toSafePercentageAmount(maxAssetOrderSize, assetAmountInput),
        );
      }

      // Percentage as source of truth
      const validPercentageAmount = safeParseForData(
        percentageValidator,
        percentageInput,
      );
      if (amountSource === 'percentage' && validPercentageAmount) {
        const assetAmount = toAssetInputValue(
          maxAssetOrderSize.multipliedBy(validPercentageAmount),
          roundAmount,
        );
        form.setValue('assetAmount', assetAmount.toString(), {
          shouldValidate: true,
          shouldTouch: true,
        });
        form.setValue(
          'quoteAmount',
          toQuoteInput(assetAmount.multipliedBy(inputConversionPrice)),
          {
            shouldValidate: true,
            shouldTouch: true,
          },
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxAssetOrderSize],
  );

  // Reset the form on product ID change
  // This needs to be placed AFTER the max order size change above. Hooks run sequentially, so if placed before,
  // the max order size change (caused by product ID change further up the change) will fire after the form reset,
  // essentially nullifying the reset as it still has the "stale" form values.
  useEffect(
    () => {
      form.reset();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productId],
  );

  // Asset amount change listener
  useEffect(
    () => {
      if (amountSource !== 'asset') {
        return;
      }

      const parsedAssetInput = parseValidNumber(assetInput);
      if (parsedAssetInput && inputConversionPrice) {
        form.setValue(
          'quoteAmount',
          toQuoteInput(parsedAssetInput.multipliedBy(inputConversionPrice)),
          {
            shouldValidate: true,
            shouldTouch: true,
          },
        );
        form.setValue(
          'percentageAmount',
          toSafePercentageAmount(maxAssetOrderSize, assetInput),
        );
      } else {
        form.resetField('quoteAmount');
        form.setValue('percentageAmount', 0);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [assetInput],
  );

  // Percentage amount change listener
  useEffect(
    () => {
      if (amountSource !== 'percentage') {
        return;
      }

      if (maxAssetOrderSize && inputConversionPrice && percentageInput) {
        const assetAmount = toAssetInputValue(
          maxAssetOrderSize.multipliedBy(percentageInput),
          roundAmount,
        );
        form.setValue('assetAmount', assetAmount.toString(), {
          shouldValidate: true,
          shouldTouch: true,
        });
        form.setValue(
          'quoteAmount',
          toQuoteInput(assetAmount.multipliedBy(inputConversionPrice)),
          {
            shouldValidate: true,
            shouldTouch: true,
          },
        );
      } else {
        form.resetField('assetAmount');
        form.resetField('quoteAmount');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [percentageInput],
  );

  // Quote amount change listener
  useEffect(
    () => {
      if (amountSource !== 'quote') {
        return;
      }

      const parsedQuoteInput = parseValidNumber(quoteInput);
      if (parsedQuoteInput && inputConversionPrice) {
        const assetAmountInput = toAssetInputValue(
          parsedQuoteInput.div(inputConversionPrice),
          roundAmount,
        ).toString();
        form.setValue('assetAmount', assetAmountInput, {
          shouldValidate: true,
          shouldTouch: true,
        });
        form.setValue(
          'percentageAmount',
          toSafePercentageAmount(maxAssetOrderSize, assetAmountInput),
        );
      } else {
        form.resetField('assetAmount');
        form.setValue('percentageAmount', 0);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [quoteInput],
  );

  // Update conversion on limit price change (ignore market price changes as they can occur frequently), use asset amount as a source of truth
  // Only need to set quote amount as percentage amount is based on asset input
  useEffect(
    () => {
      const parsedAssetInput = parseValidNumber(assetInput);
      if (parsedAssetInput && inputConversionPrice) {
        form.setValue(
          'quoteAmount',
          toQuoteInput(parsedAssetInput.multipliedBy(inputConversionPrice)),
        );
      } else {
        form.resetField('quoteAmount');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [priceInput],
  );

  // Reset advanced order settings on timeInForceType or priceType change
  useEffect(() => {
    form.setValue('timeInForceInDays', '');
    form.setValue('reduceOnly', false);
    form.setValue('postOnly', false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeInForceType, priceType]);

  // Reset timeInForceType on priceType change
  useEffect(() => {
    form.setValue('timeInForceType', 'good_until');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceType]);
}

/**
 * Creates a well-formatted asset input value. If rounding produces a zero, then rounds up to ensure that
 * we don't populate the input with "0" if the user has _some_ available small balance
 *
 * @param value - the value to format
 * @param roundToSizeIncrement - fn to round to the market size increment
 */
function toAssetInputValue(
  value: BigDecimal,
  roundToSizeIncrement: (value: BigDecimal) => BigDecimal,
) {
  const roundedValue = roundToSizeIncrement(value);
  if (roundedValue.gt(0)) {
    return roundedValue;
  }
  return roundToDecimalPlaces(value, 6, BigDecimal.ROUND_UP);
}

function toQuoteInput(value: BigDecimal) {
  return roundToString(value, 2);
}

function toSafePercentageAmount(
  maxOrderSize: BigDecimal | undefined,
  assetAmountInput: string,
) {
  const assetAmount = parseValidNumber(assetAmountInput);
  return toSafeFormPercentage(assetAmount, maxOrderSize);
}

function parseValidNumber(value: string): BigDecimal | undefined {
  return safeParseForData(positiveBigDecimalValidator, value);
}
