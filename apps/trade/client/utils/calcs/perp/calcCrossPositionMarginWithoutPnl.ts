import {
  calcPerpBalanceValue,
  PerpBalanceWithProduct,
} from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';

/**
 * Calculates margin used for a single balance excluding the health impact
 * of unsettled pnl (unsettled pnl = perp position value (not notional!)). Uses initial health
 *
 * @param position
 */
export function calcCrossPositionMarginWithoutPnl(
  position: PerpBalanceWithProduct,
) {
  const withoutUnsettledPnl = position.healthContributions.initial.minus(
    calcPerpBalanceValue(position),
  );
  return BigDecimal.max(0, withoutUnsettledPnl.negated());
}
