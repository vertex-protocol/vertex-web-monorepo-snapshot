import { LinkedPercentageAmountFormValues } from 'client/types/linkedPercentageAmountFormTypes';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';

/**
 * A util function that takes the submitted form values and resolves the amount to submit, essentially
 * taking the _exact_ maxValue if percentage amount is 1 (100%)
 *
 * @param formValues
 * @param maxValue
 */
export function resolvePercentageAmountSubmitValue(
  formValues: LinkedPercentageAmountFormValues,
  maxValue: BigDecimal | undefined,
) {
  if (formValues.percentageAmount === 1 && maxValue != null) {
    return maxValue;
  }
  return toBigDecimal(formValues.amount);
}
