import { IndexerMatchEvent } from '@vertex-protocol/indexer-client';
import { calcPreMatchEventBalanceAmount } from 'client/utils/calcs/calcPreMatchEventBalanceAmount';
import { safeDiv } from 'client/utils/safeDiv';

/**
 * Reduce position events are trades that decrease the position size
 * @param event
 */
export function isReducePositionMatchEvent(event: IndexerMatchEvent) {
  const baseFilled = event.baseFilled;
  const preEventBalanceAmount = calcPreMatchEventBalanceAmount(event);

  // Reducing position occurs when base filled is opposite sign of pre-balance for the event
  return safeDiv(baseFilled, preEventBalanceAmount).lt(0);
}
