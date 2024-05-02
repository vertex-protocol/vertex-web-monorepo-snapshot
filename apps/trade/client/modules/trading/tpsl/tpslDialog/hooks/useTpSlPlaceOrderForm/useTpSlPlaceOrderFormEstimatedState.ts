import { BigDecimal, IndexerSnapshotBalance } from '@vertex-protocol/client';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { calcIndexerSummaryUnrealizedPnl } from 'client/utils/calcs/pnlCalcs';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { useMemo } from 'react';

interface Params {
  validTriggerPrice: BigDecimal | undefined;
  indexerSnapshotBalance: IndexerSnapshotBalance | undefined;
}

export function useTpSlPlaceOrderFormEstimatedState({
  validTriggerPrice,
  indexerSnapshotBalance,
}: Params) {
  const quotePrice = useQuotePriceUsd();

  const unrealizedPnl = useMemo(() => {
    if (!validTriggerPrice || !indexerSnapshotBalance) {
      return;
    }

    const unrealizedPnl = calcIndexerSummaryUnrealizedPnl(
      indexerSnapshotBalance,
      validTriggerPrice,
    );

    return removeDecimals(unrealizedPnl);
  }, [validTriggerPrice, indexerSnapshotBalance]);

  return {
    unrealizedPnlUsd: unrealizedPnl?.multipliedBy(quotePrice),
  };
}
