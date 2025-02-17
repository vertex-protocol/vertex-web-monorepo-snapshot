import { BigDecimal } from '@vertex-protocol/client';
import { calcAllProductsTotalValue } from 'client/utils/calcAllProductsTotalValue';
import { calcDecimalAdjustedUsdValue } from 'client/utils/calcDecimalAdjustedUsdValue';
import { MappedNullable } from 'client/utils/types';

/**
 * @param valueByProductId
 * @param primaryQuotePriceUsd
 * @returns decimal adjusted total value in USD
 */
export function calcTotalDecimalAdjustedValueUsd<
  TValue extends Record<number, BigDecimal> | undefined,
>(
  valueByProductId: TValue,
  primaryQuotePriceUsd: BigDecimal,
): MappedNullable<TValue, BigDecimal> {
  return calcDecimalAdjustedUsdValue(
    calcAllProductsTotalValue(valueByProductId),
    primaryQuotePriceUsd,
  );
}
