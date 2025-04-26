import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { ReactNode } from 'react';

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
        'flex flex-col items-start justify-center gap-y-0.5',
        className,
      )}
      {...rest}
    >
      <div className="text-text-primary">{top}</div>
      <div className="text-text-tertiary">{bottom}</div>
    </TableCell>
  );
}
