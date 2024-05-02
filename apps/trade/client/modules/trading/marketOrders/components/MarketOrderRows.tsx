import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { range } from 'lodash';
import { Fragment } from 'react';

interface RowIdentifiable {
  id: string;
}

interface Props<TRow extends RowIdentifiable> extends WithClassnames {
  rows: TRow[] | undefined;
  numRows: number;
  renderRow: (row: TRow) => React.ReactNode;
  skeletonRow: React.ReactNode;
}

export function MarketOrderRows<TRow extends RowIdentifiable>({
  rows,
  numRows,
  skeletonRow,
  renderRow,
  className,
}: Props<TRow>) {
  const content = (() => {
    if (!rows?.length) {
      return range(numRows).map((_, index) => (
        <Fragment key={index}>{skeletonRow}</Fragment>
      ));
    }

    return rows.slice(0, numRows).map((row) => {
      return <Fragment key={row.id}>{renderRow(row)}</Fragment>;
    });
  })();

  return (
    <div className={mergeClassNames('flex flex-col gap-y-0.5', className)}>
      {content}
    </div>
  );
}
