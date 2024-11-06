import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { SpotBalancesTable } from 'client/modules/tables/SpotBalancesTable';
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
  enableUserFiltering,
  defaultFilter,
  productId,
}: {
  enableUserFiltering: boolean;
  defaultFilter: MarketFilter | undefined;
  productId: number | undefined;
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

  return (
    <SpotBalancesTable
      marketFilter={enableUserFiltering ? userFilter : defaultFilter}
    />
  );
}
