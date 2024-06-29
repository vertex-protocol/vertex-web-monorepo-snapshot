import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';
import { TableCell } from './TableCell';

export function StackedTableCell({
  top,
  bottom,
  className,
  ...rest
}: WithClassnames<{
  top: ReactNode;
  bottom: ReactNode;
}>) {
  return (
    <TableCell
      className={mergeClassNames(
        'flex flex-col items-start justify-center gap-y-1',
        className,
      )}
      {...rest}
    >
      <div className="text-text-primary">{top}</div>
      <div className="text-text-tertiary">{bottom}</div>
    </TableCell>
  );
}
