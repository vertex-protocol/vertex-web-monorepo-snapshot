import { ProductEngineType } from '@vertex-protocol/client';
import { TabIdentifiable } from 'client/hooks/ui/tabs/types';
import { useAtomControlledTabs } from 'client/hooks/ui/tabs/useAtomControlledTabs';
import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { PaginatedHistoricalTradesTable } from 'client/modules/tables/PaginatedHistoricalTradesTable';
import { PaginatedRealizedPnlEventsTable } from 'client/modules/tables/PaginatedRealizedPnlEventsTable';
import { HistoricalLiquidationsTable } from 'client/pages/Portfolio/subpages/History/components/HistoricalLiquidationsTable';
import { HistoricalTriggerOrdersTable } from 'client/pages/Portfolio/subpages/History/components/HistoricalTriggerOrdersTable';
import { portfolioHistoryTabIdAtom } from 'client/store/portfolioStore';
import { xor } from 'lodash';
import { ReactNode, useCallback, useMemo } from 'react';
import { HistoricalDepositsTable } from '../components/HistoricalDepositsTable';
import { HistoricalLpEventsTable } from '../components/HistoricalLpEventsTable';
import { HistoricalPnlAccountingTable } from '../components/HistoricalPnlAccountingTable';
import { HistoricalSettlementsTable } from '../components/HistoricalSettlementsTable';
import { HistoricalWithdrawalsTable } from '../components/HistoricalWithdrawalsTable';

export type PortfolioHistoryTabID =
  | 'trades'
  | 'deposits'
  | 'withdrawals'
  | 'pools'
  | 'liquidations'
  | 'settlements'
  | 'trigger_orders'
  | 'realized_pnl_events'
  | 'pnl_accounting_events';

export interface PortfolioHistoryTab
  extends TabIdentifiable<PortfolioHistoryTabID> {
  label: string;
  content: ReactNode;
}

interface UsePortfolioHistoryTabs {
  toggleOptionalTabId: (tabId: PortfolioHistoryTabID) => void;
  selectedTabId: PortfolioHistoryTabID;
  setSelectedUntypedTabId: (id: string) => void;
  setSelectedTabId: (id: PortfolioHistoryTabID) => void;
  tabs: PortfolioHistoryTab[];
  enabledOptionalTabIds: PortfolioHistoryTabID[];
}

const PERP_ONLY_FILTER = {
  marketType: ProductEngineType.PERP,
};

export const OPTIONAL_HISTORY_TABS: PortfolioHistoryTab[] = [
  {
    id: 'trigger_orders',
    label: 'Trigger Orders',
    content: <HistoricalTriggerOrdersTable />,
  },
  {
    id: 'settlements',
    label: 'Settlements',
    content: <HistoricalSettlementsTable />,
  },
  {
    id: 'pnl_accounting_events',
    label: 'PnL Accounting',
    content: <HistoricalPnlAccountingTable />,
  },
];

export function usePortfolioHistoryTabs(): UsePortfolioHistoryTabs {
  const { savedUserSettings, setSavedUserSettings } = useSavedUserSettings();

  const enabledOptionalTabIds =
    savedUserSettings.portfolio.enabledOptionalHistoryTabIds;

  const toggleOptionalTabId = useCallback(
    (tabId: PortfolioHistoryTabID) => {
      setSavedUserSettings((prev) => {
        // Toggle tabId from array.
        prev.portfolio.enabledOptionalHistoryTabIds = xor(
          prev.portfolio.enabledOptionalHistoryTabIds,
          [tabId],
        );

        return prev;
      });
    },
    [setSavedUserSettings],
  );

  const tabs: PortfolioHistoryTab[] = useMemo(() => {
    const enabledOptionalTabs = OPTIONAL_HISTORY_TABS.filter(
      (optionalHistoryTab) =>
        enabledOptionalTabIds.includes(optionalHistoryTab.id),
    );

    return [
      {
        id: 'trades',
        label: 'Trades',
        content: (
          <PaginatedHistoricalTradesTable
            hasBackground
            showPagination
            pageSize={10}
          />
        ),
      },
      {
        id: 'realized_pnl_events',
        label: 'Realized PnL',
        content: (
          <PaginatedRealizedPnlEventsTable
            hasBackground
            showPagination
            marketFilter={PERP_ONLY_FILTER}
            pageSize={10}
          />
        ),
      },
      {
        id: 'deposits',
        label: 'Deposits',
        content: <HistoricalDepositsTable />,
      },
      {
        id: 'withdrawals',
        label: 'Withdrawals',
        content: <HistoricalWithdrawalsTable />,
      },
      {
        id: 'pools',
        label: 'Pools',
        content: <HistoricalLpEventsTable />,
      },
      {
        id: 'liquidations',
        label: 'Liquidations',
        content: <HistoricalLiquidationsTable />,
      },
      ...enabledOptionalTabs,
    ];
  }, [enabledOptionalTabIds]);

  const { selectedTabId, setSelectedTabId, setSelectedUntypedTabId } =
    useAtomControlledTabs(tabs, portfolioHistoryTabIdAtom);

  return {
    enabledOptionalTabIds,
    toggleOptionalTabId,
    tabs,
    selectedTabId,
    setSelectedTabId,
    setSelectedUntypedTabId,
  };
}
