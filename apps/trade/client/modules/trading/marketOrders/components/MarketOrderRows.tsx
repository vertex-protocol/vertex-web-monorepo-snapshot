import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { ScrollShadowsContainer } from '@vertex-protocol/web-ui';
import { range } from 'lodash';
import { Fragment, ReactNode } from 'react';

interface RowIdentifiable {
  id: string;
}

interface Props<TRow extends RowIdentifiable> extends WithClassnames {
  rows: TRow[] | undefined;
  numRows: number;
  renderRow: (row: TRow) => ReactNode;
  skeletonRow: ReactNode;
  reverseRows?: boolean;
}

export function MarketOrderRows<TRow extends RowIdentifiable>({
  rows,
  numRows,
  skeletonRow,
  renderRow,
  className,
  reverseRows,
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
    <ScrollShadowsContainer
      className={mergeClassNames(
        'flex gap-y-0.5',
        reverseRows ? 'flex-col-reverse' : 'flex-col',
        className,
      )}
      isReversed={reverseRows}
      shadowSize={14}
    >
      {content}
    </ScrollShadowsContainer>
  );
}
