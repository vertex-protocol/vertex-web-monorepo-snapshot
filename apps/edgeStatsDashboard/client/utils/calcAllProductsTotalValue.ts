import { BigDecimal, sumBigDecimalBy } from '@vertex-protocol/client';
import { MappedNullable } from 'client/utils/types';

/**
 * @param valueByProductId
 * @returns sums of all products values to single total value.
 */
export function calcAllProductsTotalValue<
  TValue extends Record<number, BigDecimal> | undefined,
>(valueByProductId: TValue): MappedNullable<TValue, BigDecimal> {
  if (!valueByProductId) {
    return undefined as MappedNullable<TValue, never>;
  }

  return sumBigDecimalBy(
    Object.values(valueByProductId),
    (value) => value,
  ) as MappedNullable<TValue, BigDecimal>;
}
