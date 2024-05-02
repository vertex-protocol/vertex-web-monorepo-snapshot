import { useReduceOnlyTriggerOrders } from 'client/hooks/subaccount/useReduceOnlyTriggerOrders';

export function useHasTpSlOrders(productId: number | undefined) {
  const { data: reduceOnlyOrderData } = useReduceOnlyTriggerOrders();

  if (!productId) {
    return false;
  }

  return (
    !!reduceOnlyOrderData?.[productId]?.stopLossOrder ||
    !!reduceOnlyOrderData?.[productId]?.takeProfitOrder
  );
}
