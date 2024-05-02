import { IndexerMatchEvent } from '@vertex-protocol/indexer-client';

/**
 * The `amount` for `preBalances` is the pre-tx balance, which is shared across multiple events within the same tx.
 * This calc derives the pre-balance for just the fill event
 * @param event
 */
export function calcPreMatchEventBalanceAmount(event: IndexerMatchEvent) {
  return event.preBalances.base.amount.plus(
    event.cumulativeBaseFilled.minus(event.baseFilled),
  );
}
