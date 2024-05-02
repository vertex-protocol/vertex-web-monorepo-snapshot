import { BigDecimal } from '@vertex-protocol/client';
import { BigDecimals } from './BigDecimals';

/**
 * Util to safely divide two numbers or BigDecimals.
 * @param denominator
 * @param numerator
 * @returns A number or BigDecimal based on the input's type.
 */
export function safeDiv<TValue extends number | BigDecimal>(
  numerator: TValue,
  denominator: TValue,
): TValue {
  // The casts below are safe because type(numerator) === type(denominator)
  if (typeof denominator === 'number') {
    const typedNumerator = numerator as number;

    return (denominator === 0 ? 0 : typedNumerator / denominator) as TValue;
  }

  const typedNumerator = numerator as BigDecimal;

  return (
    denominator.isZero() ? BigDecimals.ZERO : typedNumerator.div(denominator)
  ) as TValue;
}
