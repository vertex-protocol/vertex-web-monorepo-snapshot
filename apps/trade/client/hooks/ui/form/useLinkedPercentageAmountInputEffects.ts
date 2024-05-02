import { BigDecimal } from '@vertex-protocol/utils';
import { LinkedPercentageAmountFormValues } from 'client/types/linkedPercentageAmountFormTypes';
import { toSafeFormPercentage } from 'client/utils/form/toSafeFormPercentage';
import { roundToString } from 'client/utils/rounding';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Params<T extends LinkedPercentageAmountFormValues> {
  // Side effects run on changes of valid amounts
  validAmount: BigDecimal | undefined;
  validPercentageAmount: number | undefined;
  // Percentages are based on this maximum amount
  maxAmount: BigDecimal | undefined;
  form: UseFormReturn<T>;
}

/**
 * Handles conversion between percentage and absolute amounts
 */
export function useLinkedPercentageAmountInputEffects<
  T extends LinkedPercentageAmountFormValues,
>({ validPercentageAmount, validAmount, maxAmount, form }: Params<T>) {
  // React hook form doesn't work too well with constrained generics, so force cast here
  const typedForm =
    form as unknown as UseFormReturn<LinkedPercentageAmountFormValues>;

  const amountSource = typedForm.watch('amountSource');
  const { resetField, setValue } = typedForm;

  // Triggered when user changes the amount input
  useEffect(() => {
    if (amountSource !== 'absolute') {
      return;
    }
    setValue('percentageAmount', toSafeFormPercentage(validAmount, maxAmount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validAmount]);

  // Triggered when user changes the percentage input
  useEffect(() => {
    if (amountSource !== 'percentage') {
      return;
    }
    if (maxAmount != null && validPercentageAmount != null) {
      // Use a more specific amount when the user selects 100% - this is to be more accurate with
      // the effects of `resolvePercentageAmountSubmitValue`, which will use the _exact_ maximum amount if 100% is selected
      const decimals = validPercentageAmount === 1 ? 8 : 4;
      setValue(
        'amount',
        roundToString(maxAmount.multipliedBy(validPercentageAmount), decimals),
        { shouldValidate: true },
      );
    } else {
      resetField('amount');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validPercentageAmount]);
}
