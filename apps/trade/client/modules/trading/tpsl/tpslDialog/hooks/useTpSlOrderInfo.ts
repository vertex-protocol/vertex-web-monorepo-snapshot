import {
  toBigDecimal,
  TriggerCriteriaType,
  TriggerOrderInfo,
} from '@vertex-protocol/client';
import { BigDecimals, removeDecimals } from '@vertex-protocol/utils';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSubaccountIndexerSnapshot } from 'client/hooks/subaccount/useSubaccountIndexerSnapshot';
import { calcIndexerSummaryUnrealizedPnl } from 'client/utils/calcs/pnlCalcs';
import { safeDiv } from 'client/utils/safeDiv';
import { useMemo } from 'react';
import { getIsTriggerPriceAbove } from '../../triggerCriteriaUtils';
import { TpSlOrderInfo, TriggerCriteriaPriceType } from '../types';

interface Params {
  productId: number;
  relevantOrder: TriggerOrderInfo;
}

export function useTpSlOrderInfo({
  productId,
  relevantOrder,
}: Params): TpSlOrderInfo {
  const quotePrice = usePrimaryQuotePriceUsd();
  const { data: indexerSnapshot } = useSubaccountIndexerSnapshot();

  return useMemo(() => {
    const triggerPrice = toBigDecimal(
      relevantOrder.order.triggerCriteria.triggerPrice,
    );

    const amountCloseSize = relevantOrder.order.amount.abs();

    const unrealizedPnl = (() => {
      const indexerSnapshotBalance = indexerSnapshot?.balances.find(
        (indexerBalance) => {
          return indexerBalance.productId === productId;
        },
      );

      if (!indexerSnapshotBalance) {
        return BigDecimals.ZERO;
      }

      // Adjust to fraction of unrealizedPnl in case when TP/SL is set before limit order is fully filled (TP/SL Order Amount < Position Size).
      const fractionToClose = safeDiv(
        amountCloseSize,
        indexerSnapshotBalance.state.postBalance.amount.abs(),
      );

      const unrealizedPnl = calcIndexerSummaryUnrealizedPnl(
        indexerSnapshotBalance,
        triggerPrice,
      ).times(fractionToClose);

      return removeDecimals(unrealizedPnl);
    })();

    return {
      productId: relevantOrder.order.productId,
      triggerPrice,
      isTriggerPriceAbove: getIsTriggerPriceAbove(
        relevantOrder.order.triggerCriteria.type,
      ),
      triggerCriteriaPriceType: getTriggerCriteriaPriceType(
        relevantOrder.order.triggerCriteria.type,
      ),
      amountCloseSize: removeDecimals(amountCloseSize),
      estimatedPnlUsd: unrealizedPnl.multipliedBy(quotePrice),
    };
  }, [indexerSnapshot?.balances, productId, quotePrice, relevantOrder]);
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
