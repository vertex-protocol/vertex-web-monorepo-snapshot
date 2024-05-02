import {
  calcPerpBalanceValue,
  PerpBalanceWithProduct,
} from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';

/**
 * This is the same calculation as `calcBalanceMarginUsed` from the SDK, but removes the health impact
 * of unsettled pnl (unsettled pnl = perp position value (not notional!)). Uses initial health
 *
 * @param position
 */
export function calcPositionMarginWithoutPnl(position: PerpBalanceWithProduct) {
  const withoutUnsettledPnl = position.healthContributions.initial.minus(
    calcPerpBalanceValue(position),
  );
  return BigDecimal.max(0, withoutUnsettledPnl.negated());
}
