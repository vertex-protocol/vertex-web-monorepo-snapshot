import { BigDecimal, removeDecimals } from '@vertex-protocol/client';
import { TP_SL_ORDER_SIZE_WITH_DECIMALS } from 'client/modules/trading/tpsl/consts';

/**
 * Checks if the absolute value of the passed in amount is equal to the value
 * used for the size of TP/SL orders.
 */
export function isTpSlOrderSize(decimalAdjustedAmount: BigDecimal | undefined) {
  const decimalAdjustedTpSlOrderSize = removeDecimals(
    TP_SL_ORDER_SIZE_WITH_DECIMALS,
  );

  return decimalAdjustedAmount?.abs().eq(decimalAdjustedTpSlOrderSize);
}
