import { useSubaccountSummary } from 'client/hooks/query/subaccount/subaccountSummary/useSubaccountSummary';
import { MarginMode } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { PlaceOrderPriceType } from 'client/modules/trading/types';

interface Params {
  priceType: PlaceOrderPriceType;
  // Pass null here if margin mode is irrelevant (i.e for spot)
  marginMode: MarginMode | null;
}

export function useOrderFormEnableMaxSizeLogic({
  priceType,
  marginMode,
}: Params) {
  const { data: subaccountSummary } = useSubaccountSummary();
  const isNegativeInitialHealth =
    subaccountSummary?.health.initial.health.lt(0) ?? false;

  // FOK (market) orders can exceed max. order size if the user is negative initial health & the order increases initial health
  const isMarketOrderWithNegativeInitialHealth =
    priceType === 'market' && isNegativeInitialHealth;

  // Stop orders have delayed execution, so max sizes don't mean much
  const isStopOrder = priceType === 'stop';

  // Deriving `disabled` is slightly easier to reason about
  const disabled =
    isMarketOrderWithNegativeInitialHealth ||
    isStopOrder ||
    // Max sizes are always accurate for isolated workflows
    marginMode?.mode === 'isolated';

  return !disabled;
}
