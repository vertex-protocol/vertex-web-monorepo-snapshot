import { SpotBalance } from '@vertex-protocol/client';
import {
  calcPerpBalanceValue,
  PerpBalanceWithProduct,
} from '@vertex-protocol/contracts';

/**
 * Calculates the "net margin" in an isolated perp position, which is the amount of deposited quote + unsettled pnl
 * @param baseBalance
 * @param quoteBalance
 */
export function calcIsoPositionNetMargin(
  baseBalance: PerpBalanceWithProduct,
  quoteBalance: SpotBalance,
) {
  const totalMargin = quoteBalance.amount;
  const unsettledQuote = calcPerpBalanceValue(baseBalance);

  return totalMargin.plus(unsettledQuote);
}
