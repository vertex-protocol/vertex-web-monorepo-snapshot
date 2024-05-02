import { ProductEngineType } from '@vertex-protocol/contracts';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { TabButton } from '@vertex-protocol/web-ui';

const FILTERS = ['all', 'perp', 'spot'] as const;

const filterToProductInfo = {
  all: {
    type: undefined,
    label: 'All',
  },
  perp: {
    type: ProductEngineType.PERP,
    label: 'Perps',
  },
  spot: {
    type: ProductEngineType.SPOT,
    label: 'Spot',
  },
};

export function ProductFilterTabs({
  marketType,
  setMarketType,
  className,
}: WithClassnames<{
  marketType?: ProductEngineType;
  setMarketType: (newType?: ProductEngineType) => void;
}>) {
  return (
    <div className={joinClassNames('flex items-center gap-x-1', className)}>
      {FILTERS.map((filter) => (
        <TabButton
          key={filter}
          size="sm"
          onClick={() => setMarketType(filterToProductInfo[filter].type)}
          active={marketType === filterToProductInfo[filter].type}
          className="text-xs capitalize"
        >
          {filterToProductInfo[filter].label}
        </TabButton>
      ))}
    </div>
  );
}
