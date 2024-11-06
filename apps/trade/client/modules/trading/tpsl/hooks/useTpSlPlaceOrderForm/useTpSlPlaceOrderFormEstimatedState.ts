import {
  BalanceSide,
  BigDecimal,
  BigDecimals,
  IndexerSnapshotBalance,
} from '@vertex-protocol/client';
import { removeDecimals } from '@vertex-protocol/utils';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { TpSlPlaceOrderFormPositionChanges } from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/types';
import { calcUnrealizedPnl } from 'client/utils/calcs/pnlCalcs';
import { useMemo } from 'react';

interface UseTpSlPlaceOrderFormEstimatedState {
  positionAmount: BigDecimal;
  positionNetEntry: BigDecimal;
  estimatedPnlUsd: BigDecimal | undefined;
  positionSide: BalanceSide | undefined;
}

interface Params {
  validTriggerPrice: BigDecimal | undefined;
  indexerSnapshotBalance: IndexerSnapshotBalance | undefined;
  positionChanges: TpSlPlaceOrderFormPositionChanges | undefined;
}

export function useTpSlPlaceOrderFormEstimatedState({
  validTriggerPrice,
  indexerSnapshotBalance,
  positionChanges,
}: Params): UseTpSlPlaceOrderFormEstimatedState {
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  // Estimated amount is any current position amount + form amount.
  const positionAmount = useMemo(() => {
    return removeDecimals(
      indexerSnapshotBalance?.state.postBalance.amount ?? BigDecimals.ZERO,
    ).plus(positionChanges?.assetAmountDelta ?? BigDecimals.ZERO);
  }, [
    indexerSnapshotBalance?.state.postBalance.amount,
    positionChanges?.assetAmountDelta,
  ]);

  // Estimated entry is any current entry + initial estimated entry for order.
  const positionNetEntry = useMemo(() => {
    return (
      removeDecimals(indexerSnapshotBalance?.trackedVars.netEntryUnrealized) ??
      BigDecimals.ZERO
    ).plus(positionChanges?.netEntryAmountDelta ?? BigDecimals.ZERO);
  }, [
    indexerSnapshotBalance?.trackedVars.netEntryUnrealized,
    positionChanges?.netEntryAmountDelta,
  ]);

  const estimatedPnlUsd = useMemo(() => {
    if (!positionAmount || !validTriggerPrice || !positionNetEntry) {
      return;
    }

    return calcUnrealizedPnl(
      positionAmount,
      validTriggerPrice,
      positionNetEntry,
    ).multipliedBy(primaryQuotePriceUsd);
  }, [
    positionAmount,
    positionNetEntry,
    primaryQuotePriceUsd,
    validTriggerPrice,
  ]);

  // The order side resulting from the order may be different than that of the form.
  // So we use the estimated amount to determine if we're going to be long / short.
  const positionSide = (() => {
    if (!positionAmount) {
      return;
    }

    return positionAmount.isPositive() ? 'long' : 'short';
  })();

  return {
    positionAmount,
    positionNetEntry,
    estimatedPnlUsd,
    positionSide,
  };
}
