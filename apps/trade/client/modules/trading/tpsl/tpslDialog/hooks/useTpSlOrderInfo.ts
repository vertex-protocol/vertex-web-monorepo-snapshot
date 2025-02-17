import {
  toBigDecimal,
  TriggerCriteriaType,
  TriggerOrderInfo,
} from '@vertex-protocol/client';
import { BigDecimals, removeDecimals } from '@vertex-protocol/utils';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSubaccountIndexerSnapshot } from 'client/hooks/subaccount/useSubaccountIndexerSnapshot';
import {
  TpSlOrderInfo,
  TriggerCriteriaPriceType,
} from 'client/modules/trading/tpsl/tpslDialog/types';
import { getIsTriggerPriceAbove } from 'client/modules/trading/tpsl/triggerCriteriaUtils';
import { getIsIsoTriggerOrder } from 'client/modules/trading/utils/isoOrderChecks';
import { calcIndexerSummaryUnrealizedPnl } from 'client/utils/calcs/pnlCalcs';
import { useMemo } from 'react';

interface Params {
  productId: number;
  existingTpSlOrder: TriggerOrderInfo;
}

export function useTpSlOrderInfo({
  productId,
  existingTpSlOrder,
}: Params): TpSlOrderInfo {
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const { data: indexerSnapshot } = useSubaccountIndexerSnapshot();

  return useMemo(() => {
    const triggerPrice = toBigDecimal(
      existingTpSlOrder.order.triggerCriteria.triggerPrice,
    );

    const amountCloseSize = existingTpSlOrder.order.amount.abs();
    const isIso = getIsIsoTriggerOrder(existingTpSlOrder);

    const unrealizedPnl = (() => {
      const indexerSnapshotBalance = indexerSnapshot?.balances.find(
        (indexerBalance) => {
          const matchesMarginMode = indexerBalance.isolated === isIso;
          return indexerBalance.productId === productId && matchesMarginMode;
        },
      );

      if (!indexerSnapshotBalance) {
        return BigDecimals.ZERO;
      }

      // Due to us using a max number for TP/SL order size, we can assume 100%
      // of the order is closed and use this value directly.
      const unrealizedPnl = calcIndexerSummaryUnrealizedPnl(
        indexerSnapshotBalance,
        triggerPrice,
      );

      return removeDecimals(unrealizedPnl);
    })();

    return {
      productId: existingTpSlOrder.order.productId,
      triggerPrice,
      isTriggerPriceAbove: getIsTriggerPriceAbove(
        existingTpSlOrder.order.triggerCriteria.type,
      ),
      triggerCriteriaPriceType: getTriggerCriteriaPriceType(
        existingTpSlOrder.order.triggerCriteria.type,
      ),
      amountCloseSize: removeDecimals(amountCloseSize),
      estimatedPnlUsd: unrealizedPnl.multipliedBy(primaryQuotePriceUsd),
    };
  }, [
    existingTpSlOrder,
    primaryQuotePriceUsd,
    indexerSnapshot?.balances,
    productId,
  ]);
}

function getTriggerCriteriaPriceType(
  triggerCriteriaType: TriggerCriteriaType,
): TriggerCriteriaPriceType {
  if (
    triggerCriteriaType === 'oracle_price_above' ||
    triggerCriteriaType === 'oracle_price_below'
  ) {
    return 'oracle_price';
  }

  return 'last_price';
}
