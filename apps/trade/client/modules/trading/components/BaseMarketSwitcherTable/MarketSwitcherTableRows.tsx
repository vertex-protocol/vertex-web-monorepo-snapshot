import { Row, flexRender } from '@tanstack/react-table';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { getStateOverlayClassNames, Button } from '@vertex-protocol/web-ui';
import { MarketSwitcherItem } from 'client/modules/trading/hooks/useMarketSwitcher/types';
import Link from 'next/link';

interface Props extends WithClassnames {
  rows: Row<MarketSwitcherItem>[];
  onRowClick: () => void;
  rowClassName: string;
}

export function MarketSwitcherTableRows({
  rows,
  onRowClick,
  className,
  rowClassName,
}: Props) {
  const hoverStateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'base',
  });

  return (
    <div
      className={joinClassNames(
        'no-scrollbar flex flex-col overflow-y-auto',
        className,
      )}
    >
      {rows.map((row) => (
        <Button
          key={row.id}
          as={Link}
          className={joinClassNames(
            'rounded',
            hoverStateOverlayClassNames,
            rowClassName,
          )}
          href={row.original.href}
          onClick={onRowClick}
        >
          {row.getVisibleCells().map((cell) => (
            <div
              key={cell.id}
              className={cell.column.columnDef.meta?.cellContainerClassName}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ))}
        </Button>
      ))}
    </div>
  );
}
