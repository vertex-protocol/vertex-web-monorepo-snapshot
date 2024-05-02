import { useMutation } from '@tanstack/react-query';
import { getOrderNonce } from '@vertex-protocol/contracts';
import { asyncResult } from '@vertex-protocol/web-common';
import {
  CancellableOrder,
  CancelOrdersParams,
  CancelOrdersResult,
} from 'client/hooks/execute/cancelOrder/types';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  MAX_SIZE_QUERY_KEYS,
  OPEN_TRIGGER_ORDER_QUERY_KEYS,
} from 'client/hooks/execute/util/refetchQueryKeys';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchOpenEngineOrders } from 'client/hooks/execute/util/useRefetchOpenEngineOrders';
import { useRefetchQueries } from 'client/hooks/execute/util/useRefetchQueries';
import { useGetRecvTime } from 'client/hooks/util/useGetRecvTime';
import { partition } from 'lodash';
import { useCallback } from 'react';

// These include subaccount queries related to a possible order execution, but does not include open orders
// which are refetched via another hook
const ENGINE_ORDER_RELATED_REFETCH_QUERY_KEYS = [...MAX_SIZE_QUERY_KEYS];

function partitionOrdersToCancel(orders: CancellableOrder[]) {
  const [triggerOrdersToCancel, engineOrdersToCancel] = partition(
    orders,
    ({ isTrigger }) => isTrigger,
  );

  return {
    triggerOrdersToCancel,
    engineOrdersToCancel,
  };
}

export function useExecuteCancelOrders() {
  const refetchOpenTriggerOrderQueries = useRefetchQueries(
    OPEN_TRIGGER_ORDER_QUERY_KEYS,
  );
  const refetchEngineOrderRelatedQueries = useRefetchQueries(
    ENGINE_ORDER_RELATED_REFETCH_QUERY_KEYS,
  );
  const refetchOpenEngineOrders = useRefetchOpenEngineOrders();

  const getRecvTime = useGetRecvTime();

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (
        params: CancelOrdersParams,
        context: ValidExecuteContext,
      ): Promise<CancelOrdersResult> => {
        const result: CancelOrdersResult = {};

        const { triggerOrdersToCancel, engineOrdersToCancel } =
          partitionOrdersToCancel(params.orders);

        const nonce = getOrderNonce(await getRecvTime());

        // Engine should execute first as these orders are more important for cancellation
        // We use asyncResult in both cases to ensure that both requests are made
        if (engineOrdersToCancel.length) {
          result.engine = await asyncResult(
            context.vertexClient.market.cancelOrders({
              subaccountOwner: context.subaccount.address,
              subaccountName: context.subaccount.name,
              chainId: context.primaryChain.id,
              productIds: engineOrdersToCancel.map((order) => order.productId),
              digests: engineOrdersToCancel.map((order) => order.digest),
              nonce,
            }),
          );
        }

        if (triggerOrdersToCancel.length) {
          result.trigger = await asyncResult(
            context.vertexClient.market.cancelTriggerOrders({
              subaccountOwner: context.subaccount.address,
              subaccountName: context.subaccount.name,
              chainId: context.primaryChain.id,
              productIds: triggerOrdersToCancel.map((order) => order.productId),
              digests: triggerOrdersToCancel.map((order) => order.digest),
              nonce,
            }),
          );
        }

        // If there are any errors, propagate them up
        if (result.engine?.[1]) {
          throw result.engine[1];
        }
        if (result.trigger?.[1]) {
          throw result.trigger[1];
        }

        return result;
      },
      [getRecvTime],
    ),
  );

  return useMutation({
    mutationFn,
    onSuccess(data, variables) {
      if (data.trigger) {
        refetchOpenTriggerOrderQueries();
      }
      if (data.engine) {
        refetchEngineOrderRelatedQueries();
        const engineOrderProductIds = new Set(
          partitionOrdersToCancel(variables.orders).engineOrdersToCancel.map(
            (order) => order.productId,
          ),
        );
        refetchOpenEngineOrders(Array.from(engineOrderProductIds.values()));
      }
    },
    onError(error, variables) {
      logExecuteError('CancelOrders', error, variables);
    },
  });
}
