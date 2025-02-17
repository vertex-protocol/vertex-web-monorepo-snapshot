import { useMutation } from '@tanstack/react-query';
import { usePlaceOrderMutationFn } from 'client/hooks/execute/placeOrder/usePlaceOrderMutationFn';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  OPEN_TRIGGER_ORDER_QUERY_KEYS,
  PLACE_ENGINE_ORDER_QUERY_KEYS,
} from 'client/hooks/execute/util/refetchQueryKeys';
import { useExecuteInValidContext } from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchOpenEngineOrders } from 'client/hooks/execute/util/useRefetchOpenEngineOrders';
import { useRefetchQueries } from 'client/hooks/execute/util/useRefetchQueries';

export function useExecutePlaceOrder() {
  const placeOrderMutationFn = usePlaceOrderMutationFn();
  const refetchOpenTriggerOrderQueries = useRefetchQueries(
    OPEN_TRIGGER_ORDER_QUERY_KEYS,
  );
  const refetchPlaceEngineOrderRelatedQueries = useRefetchQueries(
    PLACE_ENGINE_ORDER_QUERY_KEYS,
  );
  const refetchOpenEngineOrders = useRefetchOpenEngineOrders();

  const mutationFn = useExecuteInValidContext(placeOrderMutationFn);

  return useMutation({
    mutationFn,
    onSuccess(_, variables) {
      if (variables.priceType === 'stop') {
        refetchOpenTriggerOrderQueries();
      } else {
        refetchPlaceEngineOrderRelatedQueries();
        // Only need to refetch open orders when placing a limit order
        if (variables.priceType === 'limit') {
          refetchOpenEngineOrders([variables.productId]);
        }
      }
    },
    onError(error, variables) {
      logExecuteError('PlaceOrder', error, variables);
    },
  });
}
