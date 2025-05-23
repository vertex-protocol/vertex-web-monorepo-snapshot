import { PaginatedHistoricalTradesTable } from 'client/modules/tables/PaginatedHistoricalTradesTable';
import { MobileTradingTabHistoricalTrades } from 'client/modules/trading/components/MobileTradingTab/MobileTradingTabHistoricalTrades';
import { useSelectedFilterByTradingTableTabSetting } from 'client/modules/trading/components/TradingTableTabs/hooks/useSelectedFilterByTradingTableTabSetting';
import { HistoricalTradesFilterOptionID } from 'client/modules/trading/components/TradingTableTabs/types';
import {
  TradingTabFilterOption,
  TradingTabFilters,
} from 'client/modules/trading/layout/types';
import { MarketFilter } from 'client/types/MarketFilter';
import { useMemo } from 'react';

const historicalTradesFilterOptions: TradingTabFilterOption<HistoricalTradesFilterOptionID>[] =
  [
    {
      id: 'all',
      name: 'All Markets',
    },
    {
      id: 'spot_only',
      name: 'Spot Only',
    },
    {
      id: 'perp_only',
      name: 'Perp Only',
    },
    {
      id: 'current_market',
      name: 'This Market',
    },
  ];

export const historicalTradesTableFilters: TradingTabFilters<HistoricalTradesFilterOptionID> =
  {
    options: historicalTradesFilterOptions,
    tradingTableTab: 'historicalTrades',
  };

export function HistoricalTradesTab({
  productId,
  isDesktop,
}: {
  productId: number | undefined;
  isDesktop?: boolean;
}) {
  const { selectedFilter } =
    useSelectedFilterByTradingTableTabSetting<HistoricalTradesFilterOptionID>({
      tradingTableTab: 'historicalTrades',
    });

  const userFilter = useMemo((): MarketFilter | undefined => {
    switch (selectedFilter) {
      case 'all':
        return;
      case 'spot_only':
        return { marketCategory: 'spot' };
      case 'perp_only':
        return { marketCategory: 'perp' };
      case 'current_market':
        return productId ? { productIds: [productId] } : undefined;
    }
  }, [selectedFilter, productId]);

  if (isDesktop) {
    return (
      <PaginatedHistoricalTradesTable marketFilter={userFilter} pageSize={10} />
    );
  }

  return (
    <MobileTradingTabHistoricalTrades
      marketFilter={userFilter}
      tradingTabFilters={historicalTradesTableFilters}
    />
  );
}
