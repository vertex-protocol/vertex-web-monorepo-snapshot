import { useSubaccountCountIndicators } from 'client/hooks/subaccount/useSubaccountCountIndicators';
import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { PaginatedFundingPaymentsTable } from 'client/modules/tables/PaginatedFundingPaymentsTable';
import { PerpPositionsTable } from 'client/modules/tables/PerpPositionsTable';
import { ReactNode, useMemo } from 'react';

interface PerpPositionsTab {
  id: string;
  label: string;
  associatedCount?: number;
  content: ReactNode;
}

export function usePerpPositionsTabs() {
  const { numPerpPositions } = useSubaccountCountIndicators();

  const perpPositionsTabs: PerpPositionsTab[] = useMemo(() => {
    return [
      {
        id: 'positions',
        label: 'Positions',
        associatedCount: numPerpPositions,
        content: <PerpPositionsTable hasBackground />,
      },
      {
        id: 'funding',
        label: 'Funding',
        content: <PaginatedFundingPaymentsTable />,
      },
    ];
  }, [numPerpPositions]);

  const { selectedTabId, setSelectedUntypedTabId, tabs } =
    useTabs(perpPositionsTabs);

  return {
    selectedTabId,
    setSelectedUntypedTabId,
    tabs,
  };
}
