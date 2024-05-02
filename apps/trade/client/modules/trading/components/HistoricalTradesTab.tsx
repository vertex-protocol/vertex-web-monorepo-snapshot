import { ProductEngineType } from '@vertex-protocol/contracts';
import { PaginatedHistoricalTradesTable } from 'client/modules/tables/PaginatedHistoricalTradesTable';
import {
  TradingTabFilterOption,
  TradingTabFilters,
} from 'client/modules/trading/layout/types';
import { historicalTradesSelectedFilterIdAtom } from 'client/store/trading/commonTradingStore';
import { HistoricalTradesFilterOptionID } from 'client/store/trading/types';
import { MarketFilter } from 'client/types/MarketFilter';
import { useAtom } from 'jotai';
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
    valueAtom: historicalTradesSelectedFilterIdAtom,
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
  const [historicalTradesSelectedFilterId] = useAtom(
    historicalTradesSelectedFilterIdAtom,
  );

  const userFilter = useMemo((): MarketFilter | undefined => {
    switch (historicalTradesSelectedFilterId) {
      case 'all':
        return;
      case 'spot_only':
        return { marketType: ProductEngineType.SPOT };
      case 'perp_only':
        return { marketType: ProductEngineType.PERP };
      case 'current_market':
        return productId ? { productIds: [productId] } : undefined;
    }
  }, [historicalTradesSelectedFilterId, productId]);

  return (
    <PaginatedHistoricalTradesTable
      marketFilter={enableUserFiltering ? userFilter : defaultFilter}
      pageSize={isDesktop ? 10 : 5}
      showPagination={!isDesktop}
    />
  );
}
