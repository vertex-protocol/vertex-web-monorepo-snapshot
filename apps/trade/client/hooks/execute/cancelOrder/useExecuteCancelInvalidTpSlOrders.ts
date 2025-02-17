import { MutationOptions, useMutation } from '@tanstack/react-query';
import { BigDecimal } from '@vertex-protocol/client';
import { ProductEngineType } from '@vertex-protocol/contracts';
import {
  AnnotatedBalanceWithProduct,
  AnnotatedIsolatedPositionWithProduct,
} from '@vertex-protocol/react-client';

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
import { useSubaccountIsolatedPositions } from 'client/hooks/query/subaccount/isolatedPositions/useSubaccountIsolatedPositions';
import { useSubaccountSummary } from 'client/hooks/query/subaccount/subaccountSummary/useSubaccountSummary';
import {
  SubaccountOpenTriggerOrdersData,
  useSubaccountOpenTriggerOrders,
} from 'client/hooks/query/subaccount/useSubaccountOpenTriggerOrders';
import { getVertexClientHasLinkedSigner } from 'client/hooks/util/useVertexClientHasLinkedSigner';
import { getTriggerOrderType } from 'client/modules/trading/utils/getTriggerOrderType';
import { getIsIsoTriggerOrder } from 'client/modules/trading/utils/isoOrderChecks';
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
  const { refetch: refetchIsolatedPositions } =
    useSubaccountIsolatedPositions();

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

        const openTriggerOrders = (
          await refetchOpenTriggerOrders({
            throwOnError: true,
          })
        ).data;
        const subaccountSummary = (
          await refetchSubaccountSummary({
            throwOnError: true,
          })
        ).data;
        const isolatedPositions = (
          await refetchIsolatedPositions({
            throwOnError: true,
          })
        ).data;

        if (!openTriggerOrders || !subaccountSummary || !isolatedPositions) {
          throw new Error(
            'Failed to fetch data for cancelling invalid TP/SL orders',
          );
        }

        const ordersToCancel = getInvalidTpSlOrdersToCancel({
          balances: subaccountSummary.balances,
          isolatedPositions,
          openTriggerOrders,
        });

        if (!ordersToCancel.length) {
          return {};
        }

        console.debug(
          '[useExecuteCancelInvalidTpSlOrders] Cancelling invalid TP/SL orders',
          ordersToCancel,
        );

        return cancelOrdersAsync({ orders: ordersToCancel });
      },
      [
        refetchOpenTriggerOrders,
        refetchSubaccountSummary,
        refetchIsolatedPositions,
        cancelOrdersAsync,
      ],
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

interface GetInvalidTpSlOrdersToCancelParams {
  balances: AnnotatedBalanceWithProduct[];
  isolatedPositions: AnnotatedIsolatedPositionWithProduct[];
  openTriggerOrders: SubaccountOpenTriggerOrdersData;
}

/**
 * Returns an array of invalid TP/SL orders that should be cancelled.
 * Invalid TP/SL orders can result when a user closes a position, the position
 * has been filled due to a TP/SL triggering, or its side has changed.
 */
export function getInvalidTpSlOrdersToCancel({
  balances,
  isolatedPositions,
  openTriggerOrders,
}: GetInvalidTpSlOrdersToCancelParams): CancellableOrder[] {
  const ordersToCancel: CancellableOrder[] = [];

  // Construct all the perp positions that need to be checked
  const perpPositions: {
    productId: number;
    amount: BigDecimal;
    // Defined for iso positions
    isoSubaccountName: string | undefined;
  }[] = [];

  // Check cross balances
  balances.forEach((balance) => {
    if (balance.type === ProductEngineType.PERP) {
      perpPositions.push({
        productId: balance.productId,
        amount: balance.amount,
        isoSubaccountName: undefined,
      });
    }
  });

  // Check isolated positions
  isolatedPositions.forEach((position) => {
    perpPositions.push({
      productId: position.baseBalance.productId,
      amount: position.baseBalance.amount,
      isoSubaccountName: position.subaccount.subaccountName,
    });
  });

  perpPositions.forEach((position) => {
    const isPositionClosed = position.amount.isZero();

    openTriggerOrders[position.productId]?.forEach((triggerOrder) => {
      const triggerOrderType = getTriggerOrderType(triggerOrder);
      if (
        triggerOrderType !== 'stop_loss' &&
        triggerOrderType !== 'take_profit'
      ) {
        return;
      }

      // Check that margin mode matches
      const isIsoTriggerOrder = getIsIsoTriggerOrder(triggerOrder);
      if (!!position.isoSubaccountName !== isIsoTriggerOrder) {
        return;
      }

      // The TP/SL amount should have the opposite sign of the position amount.
      // Having the same sign indicates the side has changed.
      const isInvalidOrderSide =
        position.amount.s === triggerOrder.order.amount.s;

      if (isInvalidOrderSide || isPositionClosed) {
        ordersToCancel.push({
          digest: triggerOrder.order.digest,
          isTrigger: true,
          productId: position.productId,
        });
      }
    });
  });

  return ordersToCancel;
}
