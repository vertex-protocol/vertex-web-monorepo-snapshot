import { PlaceOrderPriceType } from 'client/modules/trading/types';
import { useSubaccountSummary } from 'client/hooks/query/subaccount/useSubaccountSummary';

interface Params {
  priceType: PlaceOrderPriceType;
}

export function useOrderFormEnableMaxSizeLogic({ priceType }: Params) {
  const { data: subaccountSummary } = useSubaccountSummary();
  const isNegativeInitialHealth =
    subaccountSummary?.health.initial.health.lt(0) ?? false;

  // FOK (market) orders can exceed max. order size if the user is negative initial health & the order increases initial health
  const isMarketOrderWithNegativeInitialHealth =
    priceType === 'market' && isNegativeInitialHealth;

  // Stop orders have delayed execution, so max sizes don't mean much
  const isStopOrder = priceType === 'stop';

  // Deriving `disabled` is slightly easier to reason about
  const disabled = isMarketOrderWithNegativeInitialHealth || isStopOrder;

  return !disabled;
}
