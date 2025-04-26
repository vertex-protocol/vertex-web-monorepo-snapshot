import { CancelOrdersWithNotificationParams } from 'client/hooks/execute/cancelOrder/types';
import { useExecuteCancelOrders } from 'client/hooks/execute/cancelOrder/useExecuteCancelOrders';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { useCallback } from 'react';

export function useExecuteCancelOrdersWithNotification() {
  const { dispatchNotification } = useNotificationManagerContext();
  const { mutateAsync, ...rest } = useExecuteCancelOrders();
  const { data: allMarketsStaticData } = useAllMarketsStaticData();

  const cancelOrdersWithNotification = useCallback(
    async (params: CancelOrdersWithNotificationParams) => {
      const serverExecutionResult = mutateAsync(params);
      params.orders.forEach((order) => {
        const marketStaticData =
          allMarketsStaticData?.allMarkets?.[order.productId];

        if (!marketStaticData) {
          return;
        }

        const { symbol, icon } = getSharedProductMetadata(
          marketStaticData.metadata,
        );

        dispatchNotification({
          type: 'cancel_order',
          data: {
            cancelOrderParams: {
              orderType: order.orderType,
              decimalAdjustedAmount: order.decimalAdjustedTotalAmount,
              metadata: {
                marketName: marketStaticData.metadata.marketName,
                symbol,
                icon,
                priceIncrement: marketStaticData.priceIncrement,
              },
              type: marketStaticData.type,
            },
            serverExecutionResult,
          },
        });
      });

      return serverExecutionResult;
    },
    [allMarketsStaticData?.allMarkets, dispatchNotification, mutateAsync],
  );

  return {
    cancelOrdersWithNotification,
    ...rest,
  };
}
