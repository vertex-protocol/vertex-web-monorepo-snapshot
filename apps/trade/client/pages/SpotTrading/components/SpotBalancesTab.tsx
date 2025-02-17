import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { SpotBalancesTable } from 'client/modules/tables/SpotBalancesTable';
import { MobileTradingTabSpotBalances } from 'client/modules/trading/components/MobileTradingTab/MobileTradingTabSpotBalances/MobileTradingTabSpotBalances';
import { useSelectedFilterByTradingTableTabSetting } from 'client/modules/trading/components/TradingTableTabs/hooks/useSelectedFilterByTradingTableTabSetting';
import { BalancesFilterOptionID } from 'client/modules/trading/components/TradingTableTabs/types';
import {
  TradingTabFilterOption,
  TradingTabFilters,
} from 'client/modules/trading/layout/types';
import { MarketFilter } from 'client/types/MarketFilter';
import { useMemo } from 'react';

const balancesFilterOptions: TradingTabFilterOption<BalancesFilterOptionID>[] =
  [
    {
      id: 'all',
      name: 'All Assets',
    },
    {
      id: 'nonzero',
      name: 'Your Balances',
    },
    {
      id: 'current_market',
      name: 'This Market',
    },
  ];

export const balancesTableFilters: TradingTabFilters<BalancesFilterOptionID> = {
  options: balancesFilterOptions,
  tradingTableTab: 'balances',
};

export function SpotBalancesTab({
  productId,
  isDesktop,
}: {
  productId: number | undefined;
  isDesktop?: boolean;
}) {
  const { selectedFilter } =
    useSelectedFilterByTradingTableTabSetting<BalancesFilterOptionID>({
      tradingTableTab: 'balances',
    });

  const userFilter = useMemo((): MarketFilter | undefined => {
    switch (selectedFilter) {
      case 'all':
        return;
      case 'nonzero':
        return { amount: 'nonzero' };
      case 'current_market':
        return productId
          ? { productIds: [productId, QUOTE_PRODUCT_ID] }
          : undefined;
    }
  }, [selectedFilter, productId]);

  if (isDesktop) {
    return <SpotBalancesTable marketFilter={userFilter} />;
  }

  return (
    <MobileTradingTabSpotBalances
      marketFilter={userFilter}
      // If there's no `productId` we're currently on a perp market and ignore user filtering.
      tradingTabFilters={productId ? balancesTableFilters : undefined}
    />
  );
}
