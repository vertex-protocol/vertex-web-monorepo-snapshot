import { useSubaccountCountIndicators } from 'client/hooks/subaccount/useSubaccountCountIndicators';
import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { LpBalancesTable } from 'client/modules/pools/components/LpBalancesTable';
import { PerpPositionsTable } from 'client/modules/tables/PerpPositionsTable';
import { SpotBalancesTable } from 'client/modules/tables/SpotBalancesTable';
import { ReactNode, useMemo } from 'react';

type OverviewTabID = 'balances' | 'perp_positions' | 'pools';

interface OverviewTab {
  id: OverviewTabID;
  label: string;
  associatedCount?: number;
  content: ReactNode;
}

export function useOverviewTabs() {
  const { numPerpPositions, numLpPositions } = useSubaccountCountIndicators();
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
      {
        id: 'pools',
        label: 'Pools',
        associatedCount: numLpPositions,
        content: <LpBalancesTable showZeroBalances={false} />,
      },
    ],
    [numLpPositions, numPerpPositions],
  );

  const { selectedTabId, setSelectedUntypedTabId, tabs } =
    useTabs(overviewTabs);

  return {
    selectedTabId,
    setSelectedUntypedTabId,
    tabs,
  };
}
