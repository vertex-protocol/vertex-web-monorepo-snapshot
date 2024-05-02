import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { SpotBalancesTable } from 'client/modules/tables/SpotBalancesTable';
import {
  TradingTabFilterOption,
  TradingTabFilters,
} from 'client/modules/trading/layout/types';
import {
  BalancesFilterOptionID,
  balancesSelectedFilterIdAtom,
} from 'client/store/trading/spotTradingStore';
import { MarketFilter } from 'client/types/MarketFilter';
import { useAtom } from 'jotai';
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
  valueAtom: balancesSelectedFilterIdAtom,
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
  const [balancesSelectedFilterId] = useAtom(balancesSelectedFilterIdAtom);

  const userFilter = useMemo((): MarketFilter | undefined => {
    switch (balancesSelectedFilterId) {
      case 'all':
        return;
      case 'nonzero':
        return { amount: 'nonzero' };
      case 'current_market':
        return productId
          ? { productIds: [productId, QUOTE_PRODUCT_ID] }
          : undefined;
    }
  }, [balancesSelectedFilterId, productId]);

  return (
    <SpotBalancesTable
      marketFilter={enableUserFiltering ? userFilter : defaultFilter}
    />
  );
}
