import { useSubaccountCountIndicators } from 'client/hooks/subaccount/useSubaccountCountIndicators';
import { TabIdentifiable } from 'client/hooks/ui/tabs/types';
import { useAtomControlledTabs } from 'client/hooks/ui/tabs/useAtomControlledTabs';
import { OpenEngineOrdersTable } from 'client/modules/tables/OpenEngineOrdersTable';
import { OpenTriggerOrdersTable } from 'client/modules/tables/OpenTriggerOrdersTable';
import { PortfolioOpenOrdersTabID } from 'client/pages/Portfolio/subpages/OpenOrders/types';
import { portfolioOpenOrdersTabIdAtom } from 'client/store/portfolioStore';
import { ReactNode, useMemo } from 'react';

interface PortfolioOpenOrderTab
  extends TabIdentifiable<PortfolioOpenOrdersTabID> {
  label: string;
  content: ReactNode;
  associatedCount: number;
}

export function usePortfolioOpenOrderTabs() {
  const countIndicators = useSubaccountCountIndicators();

  const tabs = useMemo((): PortfolioOpenOrderTab[] => {
    return [
      {
        id: 'engine_orders',
        label: 'Limit Orders',
        content: <OpenEngineOrdersTable hasBackground />,
        associatedCount: countIndicators.numOpenEngineOrders,
      },
      {
        id: 'trigger_orders',
        label: 'Trigger Orders',
        content: <OpenTriggerOrdersTable hasBackground />,
        associatedCount: countIndicators.numOpenTriggerOrders,
      },
    ];
  }, [
    countIndicators.numOpenEngineOrders,
    countIndicators.numOpenTriggerOrders,
  ]);

  const { selectedTabId, setSelectedTabId } = useAtomControlledTabs(
    tabs,
    portfolioOpenOrdersTabIdAtom,
  );

  return {
    openOrderTabs: tabs,
    selectedTabId,
    setSelectedTabId,
  };
}
