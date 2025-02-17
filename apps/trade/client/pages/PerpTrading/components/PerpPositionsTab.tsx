import { PerpPositionsTable } from 'client/modules/tables/PerpPositionsTable';
import { MobileTradingTabPositions } from 'client/modules/trading/components/MobileTradingTab/MobileTradingTabPositions/MobileTradingTabPositions';
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
  productId,
  isDesktop,
}: {
  productId: number | undefined;
  isDesktop?: boolean;
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

  if (isDesktop) {
    return <PerpPositionsTable marketFilter={userFilter} />;
  }

  return (
    <MobileTradingTabPositions
      marketFilter={userFilter}
      // If there's no `productId` we're currently on a spot market and ignore user filtering.
      tradingTabFilters={productId ? positionsTableFilters : undefined}
    />
  );
}
