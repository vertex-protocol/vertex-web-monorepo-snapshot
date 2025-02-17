import { OpenEngineOrdersTable } from 'client/modules/tables/OpenEngineOrdersTable';
import { MobileTradingTabEngineOrders } from 'client/modules/trading/components/MobileTradingTab/MobileTradingTabEngineOrders';
import { useSelectedFilterByTradingTableTabSetting } from 'client/modules/trading/components/TradingTableTabs/hooks/useSelectedFilterByTradingTableTabSetting';
import { OpenOrdersFilterOptionID } from 'client/modules/trading/components/TradingTableTabs/types';
import {
  TradingTabFilterOption,
  TradingTabFilters,
} from 'client/modules/trading/layout/types';
import { MarketFilter } from 'client/types/MarketFilter';
import { useMemo } from 'react';

const openEngineOrdersFilterOptions: TradingTabFilterOption<OpenOrdersFilterOptionID>[] =
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

export const openEngineOrdersTableFilters: TradingTabFilters<OpenOrdersFilterOptionID> =
  {
    options: openEngineOrdersFilterOptions,
    tradingTableTab: 'openEngineOrders',
  };

export function OpenEngineOrdersTab({
  productId,
  isDesktop,
}: {
  productId: number | undefined;
  isDesktop?: boolean;
}) {
  const { selectedFilter } =
    useSelectedFilterByTradingTableTabSetting<OpenOrdersFilterOptionID>({
      tradingTableTab: 'openEngineOrders',
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
    return <OpenEngineOrdersTable marketFilter={userFilter} />;
  }

  return (
    <MobileTradingTabEngineOrders
      marketFilter={userFilter}
      tradingTabFilters={openEngineOrdersTableFilters}
    />
  );
}
