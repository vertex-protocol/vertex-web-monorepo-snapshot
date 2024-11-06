import { TriggerOrderInfo } from '@vertex-protocol/client';
import { useSubaccountOpenTriggerOrders } from 'client/hooks/query/subaccount/useSubaccountOpenTriggerOrders';
import { getTriggerOrderType } from 'client/modules/trading/utils/getTriggerOrderType';
import { useMemo } from 'react';

interface ReduceOnlyTriggerOrders {
  orders: TriggerOrderInfo[];
  takeProfitOrder: TriggerOrderInfo | undefined;
  stopLossOrder: TriggerOrderInfo | undefined;
}

export function useReduceOnlyTriggerOrders() {
  const { data: openTriggerOrders, ...rest } = useSubaccountOpenTriggerOrders();

  const mappedReduceOnlyOrders = useMemo(() => {
    if (!openTriggerOrders) {
      return;
    }

    const reduceOrdersByProductId: Record<
      number,
      ReduceOnlyTriggerOrders | undefined
    > = {};

    Object.entries(openTriggerOrders).forEach(([productId, openOrders]) => {
      const reduceOnlyOrders: TriggerOrderInfo[] = [];
      let takeProfitOrder: TriggerOrderInfo | undefined = undefined;
      let stopLossOrder: TriggerOrderInfo | undefined = undefined;

      openOrders.forEach((order) => {
        const orderType = getTriggerOrderType(order);

        if (orderType === 'stop') {
          return;
        } else if (orderType === 'take_profit') {
          takeProfitOrder = order;
        } else if (orderType === 'stop_loss') {
          stopLossOrder = order;
        }
        reduceOnlyOrders.push(order);
      });

      reduceOrdersByProductId[Number(productId)] = {
        orders: reduceOnlyOrders,
        takeProfitOrder,
        stopLossOrder,
      };
    });

    return reduceOrdersByProductId;
  }, [openTriggerOrders]);

  return {
    data: mappedReduceOnlyOrders,
    ...rest,
  };
}
