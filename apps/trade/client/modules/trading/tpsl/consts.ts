import { toBigDecimal } from '@vertex-protocol/client';

/**
 * A large number used as the size for TP/SL orders, which allows for limit orders
 * to be placed against the corresponding position without cancelling the TP/SL.
 *
 * The number is large enough to cover all potential trades without being so large
 * that it causes overflows on the BE.
 */
export const TP_SL_ORDER_SIZE_WITH_DECIMALS = toBigDecimal('1e27');
