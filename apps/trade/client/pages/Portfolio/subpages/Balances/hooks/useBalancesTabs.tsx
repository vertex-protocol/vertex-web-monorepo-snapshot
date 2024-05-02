import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { PaginatedInterestPaymentsTable } from 'client/modules/tables/PaginatedInterestPaymentsTable';
import { SpotBalancesTable } from 'client/modules/tables/SpotBalancesTable';

const BALANCES_TABS = [
  {
    id: 'balances',
    label: 'Balances',
    content: <SpotBalancesTable hasBackground />,
  },
  {
    id: 'interest',
    label: 'Interest',
    content: <PaginatedInterestPaymentsTable />,
  },
] as const;

export function useBalancesTabs() {
  const { selectedTabId, setSelectedUntypedTabId, tabs } =
    useTabs(BALANCES_TABS);

  return {
    selectedTabId,
    setSelectedUntypedTabId,
    tabs,
  };
}
