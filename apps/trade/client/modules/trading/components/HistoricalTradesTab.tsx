import { PaginatedHistoricalTradesTable } from 'client/modules/tables/PaginatedHistoricalTradesTable';
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
  enableUserFiltering,
  productId,
  defaultFilter,
  isDesktop,
}: {
  enableUserFiltering: boolean;
  defaultFilter: MarketFilter | undefined;
  productId: number | undefined;
  isDesktop: boolean;
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

  return (
    <PaginatedHistoricalTradesTable
      marketFilter={enableUserFiltering ? userFilter : defaultFilter}
      pageSize={isDesktop ? 10 : 5}
      showPagination={!isDesktop}
    />
  );
}
