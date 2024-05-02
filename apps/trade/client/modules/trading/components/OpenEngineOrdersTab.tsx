import { ProductEngineType } from '@vertex-protocol/contracts';
import { OpenEngineOrdersTable } from 'client/modules/tables/OpenEngineOrdersTable';
import {
  TradingTabFilterOption,
  TradingTabFilters,
} from 'client/modules/trading/layout/types';
import { openEngineOrdersSelectedFilterIdAtom } from 'client/store/trading/commonTradingStore';
import { OpenOrdersFilterOptionID } from 'client/store/trading/types';
import { MarketFilter } from 'client/types/MarketFilter';
import { useAtom } from 'jotai';
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
    valueAtom: openEngineOrdersSelectedFilterIdAtom,
  };

export function OpenEngineOrdersTab({
  enableUserFiltering,
  productId,
  defaultFilter,
  isDesktop,
}: {
  enableUserFiltering: boolean;
  productId: number | undefined;
  defaultFilter: MarketFilter | undefined;
  isDesktop: boolean;
}) {
  const [openEngineOrdersSelectedFilterId] = useAtom(
    openEngineOrdersSelectedFilterIdAtom,
  );

  const userFilter = useMemo((): MarketFilter | undefined => {
    switch (openEngineOrdersSelectedFilterId) {
      case 'all':
        return;
      case 'spot_only':
        return { marketType: ProductEngineType.SPOT };
      case 'perp_only':
        return { marketType: ProductEngineType.PERP };
      case 'current_market':
        return productId ? { productIds: [productId] } : undefined;
    }
  }, [openEngineOrdersSelectedFilterId, productId]);

  return (
    <OpenEngineOrdersTable
      marketFilter={enableUserFiltering ? userFilter : defaultFilter}
      pageSize={isDesktop ? undefined : 5}
    />
  );
}
