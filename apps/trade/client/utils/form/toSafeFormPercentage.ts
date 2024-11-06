import { BigDecimal } from '@vertex-protocol/utils';
import { roundToDecimalPlaces } from 'client/utils/rounding';

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

  if (percentage < 0 || percentage > 1) {
    // Instead of clamping high %'s to 100%, return 0 here to essentially "reset" the form inputs
    // This is to fix a case where if we return 100%, and the user clicks "Max", there will be no UI update because the percentage form value stays at 1
    return 0;
  }

  return percentage;
}
