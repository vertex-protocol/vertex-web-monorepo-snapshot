import { PerpPositionsTable } from 'client/modules/tables/PerpPositionsTable';
import { useSelectedFilterByTradingTableTabSetting } from 'client/modules/trading/components/TradingTableTabs/hooks/useSelectedFilterByTradingTableTabSetting';
import { PositionsFilterOptionID } from 'client/modules/trading/components/TradingTableTabs/types';
import {
  TradingTabFilterOption,
  TradingTabFilters,
} from 'client/modules/trading/layout/types';
import { MarketFilter } from 'client/types/MarketFilter';
import { useMemo } from 'react';

const positionsFilterOptions: TradingTabFilterOption<PositionsFilterOptionID>[] =
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

export const positionsTableFilters: TradingTabFilters<PositionsFilterOptionID> =
  {
    options: positionsFilterOptions,
    tradingTableTab: 'positions',
  };

export function PerpPositionsTab({
  enableUserFiltering,
  defaultFilter,
  productId,
}: {
  enableUserFiltering: boolean;
  defaultFilter: MarketFilter | undefined;
  productId: number | undefined;
}) {
  const { selectedFilter } =
    useSelectedFilterByTradingTableTabSetting<PositionsFilterOptionID>({
      tradingTableTab: 'positions',
    });

  const userFilter = useMemo((): MarketFilter | undefined => {
    switch (selectedFilter) {
      case 'all':
        return;
      case 'current_market':
        return productId ? { productIds: [productId] } : undefined;
    }
  }, [selectedFilter, productId]);

  return (
    <PerpPositionsTable
      marketFilter={enableUserFiltering ? userFilter : defaultFilter}
    />
  );
}
