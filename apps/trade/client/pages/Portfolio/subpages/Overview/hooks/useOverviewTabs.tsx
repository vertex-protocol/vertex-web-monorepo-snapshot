import { useSubaccountCountIndicators } from 'client/hooks/subaccount/useSubaccountCountIndicators';
import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { PerpPositionsTable } from 'client/modules/tables/PerpPositionsTable';
import { SpotBalancesTable } from 'client/modules/tables/SpotBalancesTable';
import { ReactNode, useMemo } from 'react';

type OverviewTabID = 'balances' | 'perp_positions';

interface OverviewTab {
  id: OverviewTabID;
  label: string;
  associatedCount?: number;
  content: ReactNode;
}

export function useOverviewTabs() {
  const { numPerpPositions } = useSubaccountCountIndicators();
  const overviewTabs = useMemo(
    (): OverviewTab[] => [
      {
        id: 'perp_positions',
        label: 'Positions',
        associatedCount: numPerpPositions,
        content: <PerpPositionsTable hasBackground />,
      },
      {
        id: 'balances',
        label: 'Balances',
        content: <SpotBalancesTable hasBackground />,
      },
    ],
    [numPerpPositions],
  );

  const { selectedTabId, setSelectedUntypedTabId, tabs } =
    useTabs(overviewTabs);

  return {
    selectedTabId,
    setSelectedUntypedTabId,
    tabs,
  };
}
