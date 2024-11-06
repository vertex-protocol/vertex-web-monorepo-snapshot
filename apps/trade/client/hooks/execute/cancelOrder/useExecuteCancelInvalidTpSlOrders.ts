import { MutationOptions, useMutation } from '@tanstack/react-query';
import { ProductEngineType } from '@vertex-protocol/contracts';
import { AnnotatedBalanceWithProduct } from '@vertex-protocol/metadata';
import {
  CancellableOrder,
  CancelOrdersResult,
} from 'client/hooks/execute/cancelOrder/types';
import { useExecuteCancelOrders } from 'client/hooks/execute/cancelOrder/useExecuteCancelOrders';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import {
  SubaccountOpenTriggerOrdersData,
  useSubaccountOpenTriggerOrders,
} from 'client/hooks/query/subaccount/useSubaccountOpenTriggerOrders';
import { useSubaccountSummary } from 'client/hooks/query/subaccount/useSubaccountSummary';
import { getVertexClientHasLinkedSigner } from 'client/hooks/util/useVertexClientHasLinkedSigner';
import { getTriggerOrderType } from 'client/modules/trading/utils/getTriggerOrderType';
import { useCallback } from 'react';
import { EmptyObject } from 'type-fest';

type CancelInvalidTpSlOrdersMutationOptions = Omit<
  MutationOptions<CancelOrdersResult, Error, EmptyObject>,
  'mutationFn'
>;

/**
 * Fetches positions and trigger orders, determines which orders should be cancelled,
 * and then sends the request to cancel them via  `useExecuteCancelOrders`.
 */
export function useExecuteCancelInvalidTpSlOrders(
  options: CancelInvalidTpSlOrdersMutationOptions = {},
) {
  const { mutateAsync: cancelOrdersAsync } = useExecuteCancelOrders();
  const { refetch: refetchOpenTriggerOrders } =
    useSubaccountOpenTriggerOrders();
  const { refetch: refetchSubaccountSummary } = useSubaccountSummary();

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (
        _: EmptyObject,
        context: ValidExecuteContext,
      ): Promise<CancelOrdersResult> => {
        if (!getVertexClientHasLinkedSigner(context.vertexClient)) {
          console.debug(
            '[useExecuteCancelInvalidTpSlOrders] No linked signer, skipping cancellations',
          );
          return {};
        }

        const triggerOrders = (
          await refetchOpenTriggerOrders({
            throwOnError: true,
          })
        ).data;
        const subaccountSummary = (
          await refetchSubaccountSummary({
            throwOnError: true,
          })
        ).data;

        if (!triggerOrders || !subaccountSummary) {
          throw new Error(
            'Failed to fetch data for cancelling invalid TP/SL orders',
          );
        }

        const ordersToCancel = getInvalidTpSlOrdersToCancel(
          subaccountSummary.balances,
          triggerOrders,
        );

        if (!ordersToCancel.length) {
          return {};
        }

        console.debug(
          '[useExecuteCancelInvalidTpSlOrders] Cancelling invalid TP/SL orders',
          ordersToCancel,
        );

        return cancelOrdersAsync({ orders: ordersToCancel });
      },
      [refetchOpenTriggerOrders, refetchSubaccountSummary, cancelOrdersAsync],
    ),
  );

  const { onError, ...otherOptions } = options;

  return useMutation({
    mutationFn,
    onError(error, variables, context) {
      logExecuteError('CancelInvalidTpSlOrders', error, variables);
      onError?.(error, variables, context);
    },
    ...otherOptions,
  });
}

/**
 * Returns an array of invalid TP/SL orders that should be cancelled.
 * Invalid TP/SL orders can result when a user closes a position, the position
 * has been filled due to a TP/SL triggering, or its side has changed.
 *
 * @param balances
 * @param openTriggerOrders
 */
export function getInvalidTpSlOrdersToCancel(
  balances: AnnotatedBalanceWithProduct[],
  openTriggerOrders: SubaccountOpenTriggerOrdersData,
): CancellableOrder[] {
  const ordersToCancel: CancellableOrder[] = [];

  balances.forEach((balance) => {
    if (balance.type !== ProductEngineType.PERP) {
      return;
    }

    const isPositionClosed = balance.amount.isZero();

    openTriggerOrders[balance.productId]?.forEach((triggerOrder) => {
      const triggerOrderType = getTriggerOrderType(triggerOrder);
      if (
        triggerOrderType !== 'stop_loss' &&
        triggerOrderType !== 'take_profit'
      ) {
        return;
      }

      // The TP/SL amount should have the opposite sign of the position amount.
      // Having the same sign indicates the side has changed.
      const isInvalidOrderSide =
        balance.amount.s === triggerOrder.order.amount.s;

      if (isInvalidOrderSide || isPositionClosed) {
        ordersToCancel.push({
          digest: triggerOrder.order.digest,
          isTrigger: true,
          productId: balance.productId,
        });
      }
    });
  });

  return ordersToCancel;
}
