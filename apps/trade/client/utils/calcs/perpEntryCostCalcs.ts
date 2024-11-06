import { BigDecimal, IndexerSnapshotBalance } from '@vertex-protocol/client';
import { BigDecimals } from '@vertex-protocol/utils';

export function calcPerpEntryCostBeforeLeverage(
  longWeightInitial: BigDecimal,
  netEntryUnrealized: BigDecimal,
) {
  // Ex. if weight is 0.9, this is 0.1 (adjusts from entry cost INCLUDING 10x leverage)
  const leverageAdjustment = BigDecimals.ONE.minus(longWeightInitial);

  return netEntryUnrealized.abs().multipliedBy(leverageAdjustment);
}

// The entry "cost" (absolute value) is the amount of USDC used to enter the position BEFORE leverage
export function calcIndexerUnrealizedPerpEntryCost(
  indexerBalance: IndexerSnapshotBalance,
) {
  return calcPerpEntryCostBeforeLeverage(
    indexerBalance.state.market.product.longWeightInitial,
    indexerBalance.trackedVars.netEntryUnrealized,
  );
}

// The entry "cost" (absolute value) is the amount of USDC used to enter the position BEFORE leverage
export function calcIndexerCumulativePerpEntryCost(
  indexerBalance: IndexerSnapshotBalance,
) {
  return calcPerpEntryCostBeforeLeverage(
    indexerBalance.state.market.product.longWeightInitial,
    indexerBalance.trackedVars.netEntryCumulative,
  );
}
