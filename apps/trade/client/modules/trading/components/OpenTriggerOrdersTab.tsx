import { ProductEngineType } from '@vertex-protocol/contracts';
import { OpenTriggerOrdersTable } from 'client/modules/tables/OpenTriggerOrdersTable';
import {
  TradingTabFilterOption,
  TradingTabFilters,
} from 'client/modules/trading/layout/types';
import { openTriggerOrdersSelectedFilterIdAtom } from 'client/store/trading/commonTradingStore';
import { OpenOrdersFilterOptionID } from 'client/store/trading/types';
import { MarketFilter } from 'client/types/MarketFilter';
import { useAtom } from 'jotai';
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
    valueAtom: openTriggerOrdersSelectedFilterIdAtom,
  };

export function OpenTriggerOrdersTab({
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
  const [openTriggerOrdersSelectedFilterId] = useAtom(
    openTriggerOrdersSelectedFilterIdAtom,
  );

  const userFilter = useMemo((): MarketFilter | undefined => {
    switch (openTriggerOrdersSelectedFilterId) {
      case 'all':
        return;
      case 'spot_only':
        return { marketType: ProductEngineType.SPOT };
      case 'perp_only':
        return { marketType: ProductEngineType.PERP };
      case 'current_market':
        return productId ? { productIds: [productId] } : undefined;
    }
  }, [openTriggerOrdersSelectedFilterId, productId]);

  return (
    <OpenTriggerOrdersTable
      marketFilter={enableUserFiltering ? userFilter : defaultFilter}
      pageSize={isDesktop ? undefined : 5}
    />
  );
}
