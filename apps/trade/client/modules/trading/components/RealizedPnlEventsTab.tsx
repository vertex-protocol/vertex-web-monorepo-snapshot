import { PaginatedRealizedPnlEventsTable } from 'client/modules/tables/PaginatedRealizedPnlEventsTable';
import { useSelectedFilterByTradingTableTabSetting } from 'client/modules/trading/components/TradingTableTabs/hooks/useSelectedFilterByTradingTableTabSetting';
import { RealizedPnlEventsFilterOptionID } from 'client/modules/trading/components/TradingTableTabs/types';
import {
  TradingTabFilterOption,
  TradingTabFilters,
} from 'client/modules/trading/layout/types';
import { MarketFilter } from 'client/types/MarketFilter';
import { useMemo } from 'react';

const realizedPnlEventsFilterOptions: TradingTabFilterOption<RealizedPnlEventsFilterOptionID>[] =
  [
    {
      id: 'all',
      name: 'All Markets',
    },
    {
      id: 'current_market',
      name: 'This Market',
    },
  ];

export const realizedPnlEventsTableFilters: TradingTabFilters<RealizedPnlEventsFilterOptionID> =
  {
    options: realizedPnlEventsFilterOptions,
    tradingTableTab: 'realizedPnlEvents',
  };

const PERP_ONLY_FILTER: MarketFilter = {
  marketCategory: 'perp',
};

interface Props {
  enableUserFiltering: boolean;
  defaultFilter: MarketFilter;
  productId: number | undefined;
  isDesktop: boolean;
}

export function RealizedPnlEventsTab({
  enableUserFiltering,
  productId,
  defaultFilter,
  isDesktop,
}: Props) {
  const { selectedFilter } =
    useSelectedFilterByTradingTableTabSetting<RealizedPnlEventsFilterOptionID>({
      tradingTableTab: 'realizedPnlEvents',
    });

  const userFilter = useMemo((): MarketFilter => {
    switch (selectedFilter) {
      case 'all':
        return PERP_ONLY_FILTER;
      case 'current_market':
        return productId ? { productIds: [productId] } : PERP_ONLY_FILTER;
    }
  }, [selectedFilter, productId]);

  return (
    <PaginatedRealizedPnlEventsTable
      marketFilter={enableUserFiltering ? userFilter : defaultFilter}
      pageSize={isDesktop ? 10 : 5}
      showPagination={!isDesktop}
    />
  );
}
