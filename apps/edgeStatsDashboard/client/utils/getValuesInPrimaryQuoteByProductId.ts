import { BigDecimal, BigDecimals, mapValues } from '@vertex-protocol/client';
import { MappedNullable } from 'client/utils/types';

/**
 * @param valueByProductId
 * @param oraclePricesByProductId
 * @returns values in primary quote by productId.
 */
export function getValuesInPrimaryQuoteByProductId<
  TValue extends Record<number, BigDecimal> | undefined,
>(
  valueByProductId: TValue,
  oraclePricesByProductId: Record<number, BigDecimal> | undefined,
) {
  if (!valueByProductId) {
    return undefined as MappedNullable<TValue, never>;
  }

  return mapValues(valueByProductId, (value, productId) => {
    const productIdAsNum = Number(productId);

    return value.times(
      oraclePricesByProductId?.[productIdAsNum] ?? BigDecimals.ZERO,
    );
  }) as MappedNullable<TValue, Record<number, BigDecimal>>;
}
