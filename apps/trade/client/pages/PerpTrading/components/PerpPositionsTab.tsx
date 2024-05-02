import { PerpPositionsTable } from 'client/modules/tables/PerpPositionsTable';
import {
  TradingTabFilterOption,
  TradingTabFilters,
} from 'client/modules/trading/layout/types';
import {
  PositionsFilterOptionID,
  positionsSelectedFilterIdAtom,
} from 'client/store/trading/perpTradingStore';
import { MarketFilter } from 'client/types/MarketFilter';
import { useAtom } from 'jotai';
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
    valueAtom: positionsSelectedFilterIdAtom,
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
  const [positionsSelectedFilterId] = useAtom(positionsSelectedFilterIdAtom);

  const userFilter = useMemo((): MarketFilter | undefined => {
    switch (positionsSelectedFilterId) {
      case 'all':
        return;
      case 'current_market':
        return productId ? { productIds: [productId] } : undefined;
    }
  }, [positionsSelectedFilterId, productId]);

  return (
    <PerpPositionsTable
      marketFilter={enableUserFiltering ? userFilter : defaultFilter}
    />
  );
}
