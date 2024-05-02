import { BigDecimal } from '@vertex-protocol/utils';
import { roundToDecimalPlaces } from 'client/utils/rounding';
import { clamp } from 'lodash';

/**
 * A form util that creates a safe percentage ranging from 0 to 1 and guards against div by zeros
 * @param numerator
 * @param denominator
 */
export function toSafeFormPercentage(
  numerator: BigDecimal | undefined,
  denominator: BigDecimal | undefined,
) {
  if (!numerator || !denominator || denominator.isZero()) {
    return 0;
  }

  const percentage = roundToDecimalPlaces(
    numerator.div(denominator),
    4,
  ).toNumber();
  return clamp(percentage, 0, 1);
}
