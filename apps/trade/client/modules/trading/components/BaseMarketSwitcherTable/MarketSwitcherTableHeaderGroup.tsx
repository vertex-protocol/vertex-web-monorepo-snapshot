import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { WithClassnames } from '@vertex-protocol/web-common';
import { MarketSwitcherItem } from 'client/modules/trading/hooks/useMarketSwitcher/types';

interface Props extends WithClassnames {
  headerGroup: HeaderGroup<MarketSwitcherItem>;
}

export function MarketSwitcherTableHeaderGroup({
  headerGroup,
  className,
}: Props) {
  return (
    <div className={className}>
      {headerGroup.headers.map((header) => (
        <div
          key={header.id}
          className={header.column.columnDef.meta?.cellContainerClassName}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
        </div>
      ))}
    </div>
  );
}
