import { OpenTriggerOrdersTable } from 'client/modules/tables/OpenTriggerOrdersTable';
import { MobileTradingTabTriggerOrders } from 'client/modules/trading/components/MobileTradingTab/MobileTradingTabTriggerOrders';
import { useSelectedFilterByTradingTableTabSetting } from 'client/modules/trading/components/TradingTableTabs/hooks/useSelectedFilterByTradingTableTabSetting';
import { OpenOrdersFilterOptionID } from 'client/modules/trading/components/TradingTableTabs/types';
import {
  TradingTabFilterOption,
  TradingTabFilters,
} from 'client/modules/trading/layout/types';
import { MarketFilter } from 'client/types/MarketFilter';
import { useMemo } from 'react';

const openTriggerOrdersFilterOptions: TradingTabFilterOption<OpenOrdersFilterOptionID>[] =
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

export const openTriggerOrdersTableFilters: TradingTabFilters<OpenOrdersFilterOptionID> =
  {
    options: openTriggerOrdersFilterOptions,
    tradingTableTab: 'openTriggerOrders',
  };

export function OpenTriggerOrdersTab({
  productId,
  isDesktop,
}: {
  productId: number | undefined;
  isDesktop?: boolean;
}) {
  const { selectedFilter } =
    useSelectedFilterByTradingTableTabSetting<OpenOrdersFilterOptionID>({
      tradingTableTab: 'openTriggerOrders',
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
    return <OpenTriggerOrdersTable marketFilter={userFilter} />;
  }

  return (
    <MobileTradingTabTriggerOrders
      marketFilter={userFilter}
      tradingTabFilters={openTriggerOrdersTableFilters}
    />
  );
}
