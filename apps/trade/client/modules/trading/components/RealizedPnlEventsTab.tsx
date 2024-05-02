import { ProductEngineType } from '@vertex-protocol/client';
import { PaginatedRealizedPnlEventsTable } from 'client/modules/tables/PaginatedRealizedPnlEventsTable';
import {
  TradingTabFilterOption,
  TradingTabFilters,
} from 'client/modules/trading/layout/types';
import { realizedPnlEventsSelectedFilterIdAtom } from 'client/store/trading/commonTradingStore';
import { RealizedPnlEventsFilterOptionID } from 'client/store/trading/types';
import { MarketFilter } from 'client/types/MarketFilter';
import { useAtom } from 'jotai';
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
    valueAtom: realizedPnlEventsSelectedFilterIdAtom,
  };

const PERP_ONLY_FILTER = {
  marketType: ProductEngineType.PERP,
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
  const [realizedPnlEventsSelectedFilterId] = useAtom(
    realizedPnlEventsSelectedFilterIdAtom,
  );

  const userFilter = useMemo((): MarketFilter => {
    switch (realizedPnlEventsSelectedFilterId) {
      case 'all':
        return PERP_ONLY_FILTER;
      case 'current_market':
        return productId ? { productIds: [productId] } : PERP_ONLY_FILTER;
    }
  }, [realizedPnlEventsSelectedFilterId, productId]);

  return (
    <PaginatedRealizedPnlEventsTable
      marketFilter={enableUserFiltering ? userFilter : defaultFilter}
      pageSize={isDesktop ? 10 : 5}
      showPagination={!isDesktop}
    />
  );
}
