import { TabIdentifiable } from 'client/hooks/ui/tabs/types';
import { useAtomControlledTabs } from 'client/hooks/ui/tabs/useAtomControlledTabs';
import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { PaginatedHistoricalTradesTable } from 'client/modules/tables/PaginatedHistoricalTradesTable';
import { PaginatedRealizedPnlEventsTable } from 'client/modules/tables/PaginatedRealizedPnlEventsTable';
import { HistoricalDepositsTable } from 'client/pages/Portfolio/subpages/History/components/HistoricalDepositsTable';
import { HistoricalLiquidationsTable } from 'client/pages/Portfolio/subpages/History/components/HistoricalLiquidationsTable';
import { HistoricalLpEventsTable } from 'client/pages/Portfolio/subpages/History/components/HistoricalLpEventsTable';
import { HistoricalPnlAccountingTable } from 'client/pages/Portfolio/subpages/History/components/HistoricalPnlAccountingTable';
import { HistoricalSettlementsTable } from 'client/pages/Portfolio/subpages/History/components/HistoricalSettlementsTable';
import { HistoricalTransfersTable } from 'client/pages/Portfolio/subpages/History/components/HistoricalTransfersTable';
import { HistoricalTriggerOrdersTable } from 'client/pages/Portfolio/subpages/History/components/HistoricalTriggerOrdersTable';
import { HistoricalWithdrawalsTable } from 'client/pages/Portfolio/subpages/History/components/HistoricalWithdrawalsTable';
import { PortfolioHistoryTabID } from 'client/pages/Portfolio/subpages/History/types';
import { portfolioHistoryTabIdAtom } from 'client/store/portfolioStore';
import { MarketFilter } from 'client/types/MarketFilter';
import { xor } from 'lodash';
import { ReactNode, useCallback, useMemo } from 'react';

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

const PERP_ONLY_FILTER: MarketFilter = {
  marketCategory: 'perp',
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
        id: 'transfers',
        label: 'Transfers',
        content: <HistoricalTransfersTable />,
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
