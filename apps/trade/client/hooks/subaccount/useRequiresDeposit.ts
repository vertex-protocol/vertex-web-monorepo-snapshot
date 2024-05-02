import { useDerivedSubaccountOverview } from 'client/hooks/subaccount/useDerivedSubaccountOverview';

/**
 * Returns true if the current account requires a deposit
 */
export function useRequiresDeposit() {
  const { data: subaccountOverview } = useDerivedSubaccountOverview();

  // There are precision errors associated with the conversion to X18 within the backend, so we have
  // dust even if the user has withdrawn all their funds, hence the 1e-6
  return (
    subaccountOverview != null && subaccountOverview?.portfolioValueUsd.lt(1e-6)
  );
}
