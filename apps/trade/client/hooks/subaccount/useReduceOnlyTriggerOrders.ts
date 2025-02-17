import { TriggerOrderInfo } from '@vertex-protocol/client';
import { useSubaccountOpenTriggerOrders } from 'client/hooks/query/subaccount/useSubaccountOpenTriggerOrders';
import { getTriggerOrderType } from 'client/modules/trading/utils/getTriggerOrderType';
import { getIsIsoTriggerOrder } from 'client/modules/trading/utils/isoOrderChecks';
import { useMemo } from 'react';

interface TpSlOrders {
  takeProfitOrder: TriggerOrderInfo | undefined;
  stopLossOrder: TriggerOrderInfo | undefined;
}

interface ReduceOnlyTriggerOrdersForProduct {
  orders: TriggerOrderInfo[];
  iso: TpSlOrders;
  cross: TpSlOrders;
}

export function useReduceOnlyTriggerOrders() {
  const { data: openTriggerOrders, ...rest } = useSubaccountOpenTriggerOrders();

  const mappedReduceOnlyOrders = useMemo(() => {
    if (!openTriggerOrders) {
      return;
    }

    const reduceOrdersByProductId: Record<
      number,
      ReduceOnlyTriggerOrdersForProduct | undefined
    > = {};

    Object.entries(openTriggerOrders).forEach(([productId, openOrders]) => {
      const reduceOnlyOrders: TriggerOrderInfo[] = [];
      const isoTpSlOrders: TpSlOrders = {
        takeProfitOrder: undefined,
        stopLossOrder: undefined,
      };
      const crossTpSlOrders: TpSlOrders = {
        takeProfitOrder: undefined,
        stopLossOrder: undefined,
      };

      openOrders.forEach((order) => {
        const orderType = getTriggerOrderType(order);
        const isIso = getIsIsoTriggerOrder(order);

        if (orderType === 'stop') {
          return;
        } else if (orderType === 'take_profit') {
          if (isIso) {
            isoTpSlOrders.takeProfitOrder = order;
          } else {
            crossTpSlOrders.takeProfitOrder = order;
          }
        } else if (orderType === 'stop_loss') {
          if (isIso) {
            isoTpSlOrders.stopLossOrder = order;
          } else {
            crossTpSlOrders.stopLossOrder = order;
          }
        }
        reduceOnlyOrders.push(order);
      });

      reduceOrdersByProductId[Number(productId)] = {
        orders: reduceOnlyOrders,
        iso: isoTpSlOrders,
        cross: crossTpSlOrders,
      };
    });

    return reduceOrdersByProductId;
  }, [openTriggerOrders]);

  return {
    data: mappedReduceOnlyOrders,
    ...rest,
  };
}
