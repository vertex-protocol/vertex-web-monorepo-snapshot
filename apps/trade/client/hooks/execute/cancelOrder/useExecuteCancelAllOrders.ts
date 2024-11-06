import { CancellableOrder } from 'client/hooks/execute/cancelOrder/types';
import { useExecuteCancelOrders } from 'client/hooks/execute/cancelOrder/useExecuteCancelOrders';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { useSubaccountOpenEngineOrders } from 'client/hooks/query/subaccount/useSubaccountOpenEngineOrders';
import { useSubaccountOpenTriggerOrders } from 'client/hooks/query/subaccount/useSubaccountOpenTriggerOrders';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useSyncedRef } from 'client/hooks/util/useSyncedRef';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { MarketFilter } from 'client/types/MarketFilter';
import { useCallback, useMemo } from 'react';

export interface OrdersFilter extends MarketFilter {
  isTrigger: boolean;
}

export function useExecuteCancelAllOrders({
  isTrigger,
  ...selectedFilters
}: OrdersFilter) {
  const {
    mutateAsync: cancelOrders,
    reset: resetExecuteCancelAllOrders,
    status,
  } = useExecuteCancelOrders();

  const { dispatchNotification } = useNotificationManagerContext();
  const { filteredMarkets } = useFilteredMarkets(selectedFilters);
  const { data: engineOrdersData } = useSubaccountOpenEngineOrders();
  const { data: triggerOrdersData } = useSubaccountOpenTriggerOrders();

  const userActionState = useUserActionState();
  const isExecuteDisabled = userActionState === 'block_all';

  const ordersToCancel = useMemo(() => {
    const ordersToCancel: CancellableOrder[] = [];

    if (!filteredMarkets) {
      return ordersToCancel;
    }

    Object.values(filteredMarkets).map((market) => {
      if (isTrigger) {
        triggerOrdersData?.[market.productId]?.forEach(({ order }) => {
          ordersToCancel.push({
            productId: order.productId,
            digest: order.digest,
            isTrigger: true,
          });
        });
      } else {
        engineOrdersData?.[market.productId]?.forEach(
          ({ productId, digest }) => {
            ordersToCancel.push({
              productId,
              digest,
              isTrigger: false,
            });
          },
        );
      }
    });

    return ordersToCancel;
  }, [engineOrdersData, filteredMarkets, isTrigger, triggerOrdersData]);

  // We don't want the callback to reload whenever data reloads. Instead, the fn should just take the latest
  // orders when invoked
  const ordersToCancelRef = useSyncedRef(ordersToCancel);

  const cancelAllOrders = useCallback(async () => {
    const orders = ordersToCancelRef.current;

    if (orders.length) {
      const serverExecutionResult = cancelOrders({
        orders: orders.map((order) => {
          return {
            isTrigger: order.isTrigger,
            productId: order.productId,
            digest: order.digest,
          };
        }),
      });

      dispatchNotification({
        type: 'cancel_multi_orders',
        data: {
          serverExecutionResult,
          numOrders: orders.length,
        },
      });
    }
  }, [cancelOrders, dispatchNotification, ordersToCancelRef]);

  useRunWithDelayOnCondition({
    condition: status === 'success',
    fn: resetExecuteCancelAllOrders,
    delay: 2000,
  });

  return {
    cancelAllOrders,
    status,
    canCancel: Boolean(
      ordersToCancel.length && status !== 'pending' && !isExecuteDisabled,
    ),
  };
}
