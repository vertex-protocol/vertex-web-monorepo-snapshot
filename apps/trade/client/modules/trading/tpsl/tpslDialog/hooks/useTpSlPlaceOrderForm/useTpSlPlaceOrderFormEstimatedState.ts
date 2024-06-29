import { BigDecimal, IndexerSnapshotBalance } from '@vertex-protocol/client';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { calcIndexerSummaryUnrealizedPnl } from 'client/utils/calcs/pnlCalcs';
import { removeDecimals } from '@vertex-protocol/utils';
import { useMemo } from 'react';

interface Params {
  validTriggerPrice: BigDecimal | undefined;
  indexerSnapshotBalance: IndexerSnapshotBalance | undefined;
}

export function useTpSlPlaceOrderFormEstimatedState({
  validTriggerPrice,
  indexerSnapshotBalance,
}: Params) {
  const quotePrice = usePrimaryQuotePriceUsd();

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
