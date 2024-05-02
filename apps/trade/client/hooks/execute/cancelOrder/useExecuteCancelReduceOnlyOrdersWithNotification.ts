import { useReduceOnlyTriggerOrders } from 'client/hooks/subaccount/useReduceOnlyTriggerOrders';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useIsSingleSignatureSession } from 'client/modules/singleSignatureSessions/hooks/useIsSingleSignatureSession';
import { useCallback } from 'react';
import { CancellableOrder } from './types';
import { useExecuteCancelOrders } from './useExecuteCancelOrders';

export function useExecuteCancelReduceOnlyOrdersWithNotification() {
  const { data: reduceOnlyOrdersData } = useReduceOnlyTriggerOrders();
  const { dispatchNotification } = useNotificationManagerContext();
  const executeCancelOrders = useExecuteCancelOrders();
  const isSingleSignatureSession = useIsSingleSignatureSession();

  const cancelReduceOnlyOrdersWithNotification = useCallback(
    (productIds: number[]) => {
      if (!isSingleSignatureSession || !reduceOnlyOrdersData) {
        return;
      }

      const reduceOnlyOrdersToCancel: CancellableOrder[] = [];
      productIds.forEach((productId) => {
        reduceOnlyOrdersData[productId]?.orders.forEach(({ order }) => {
          reduceOnlyOrdersToCancel.push({
            isTrigger: true,
            productId: order.productId,
            digest: order.digest,
          });
        });
      });

      if (!reduceOnlyOrdersToCancel.length) {
        return;
      }

      const serverExecutionResult = executeCancelOrders.mutateAsync({
        orders: reduceOnlyOrdersToCancel,
      });

      dispatchNotification({
        type: 'action_error_handler',
        data: {
          errorNotificationTitle: 'Cancel TP/SL Orders Failed',
          executionData: {
            serverExecutionResult: serverExecutionResult,
          },
        },
      });
    },
    [
      dispatchNotification,
      executeCancelOrders,
      isSingleSignatureSession,
      reduceOnlyOrdersData,
    ],
  );

  return {
    cancelReduceOnlyOrdersWithNotification,
    ...executeCancelOrders,
  };
}
