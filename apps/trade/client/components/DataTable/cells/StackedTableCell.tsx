import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { TableCell } from './TableCell';

export function StackedTableCell({
  top,
  bottom,
  className,
  ...rest
}: WithClassnames<{
  top: React.ReactNode;
  bottom: React.ReactNode;
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
