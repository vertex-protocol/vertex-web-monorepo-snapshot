import {
  joinClassNames,
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { memo } from 'react';

function Item({
  label,
  symbol,
  className,
}: WithClassnames<{
  label: string;
  symbol?: string;
}>) {
  return (
    <div
      className={joinClassNames(
        'text-text-tertiary text-3xs flex flex-1 items-center gap-x-1',
        className,
      )}
    >
      {label}
      <span>{symbol}</span>
    </div>
  );
}

function Container({ className, children }: WithChildren<WithClassnames>) {
  return (
    <div className={mergeClassNames('flex gap-x-1 px-4 py-2', className)}>
      {children}
    </div>
  );
}

export const MarketOrdersHeaderRow = {
  Container: memo(Container),
  Item: memo(Item),
};
