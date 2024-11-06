import { useMutation } from '@tanstack/react-query';
import { useModifyOrderMutationFn } from 'client/hooks/execute/modifyOrder/useModifyOrderMutationFn';
import { PLACE_ENGINE_ORDER_QUERY_KEYS } from 'client/hooks/execute/placeOrder/placeEngineOrderQueryKeys';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import { OPEN_TRIGGER_ORDER_QUERY_KEYS } from 'client/hooks/execute/util/refetchQueryKeys';
import { useExecuteInValidContext } from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchOpenEngineOrders } from 'client/hooks/execute/util/useRefetchOpenEngineOrders';
import { useRefetchQueries } from 'client/hooks/execute/util/useRefetchQueries';

export function useExecuteModifyOrder() {
  const cancelAndPlaceOrderMutationFn = useModifyOrderMutationFn();
  const refetchOpenTriggerOrderQueries = useRefetchQueries(
    OPEN_TRIGGER_ORDER_QUERY_KEYS,
  );
  const refetchPlaceEngineOrderRelatedQueries = useRefetchQueries(
    PLACE_ENGINE_ORDER_QUERY_KEYS,
  );
  const refetchOpenEngineOrders = useRefetchOpenEngineOrders();

  const mutationFn = useExecuteInValidContext(cancelAndPlaceOrderMutationFn);

  return useMutation({
    mutationFn,
    onSuccess(_data, variables) {
      if (variables.isTrigger) {
        refetchOpenTriggerOrderQueries();
      } else {
        refetchPlaceEngineOrderRelatedQueries();
        refetchOpenEngineOrders([variables.productId]);
      }
    },
    onError(error, variables) {
      logExecuteError('ModifyOrder', error, variables);
    },
  });
}
