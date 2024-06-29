import {
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { MouseEventHandler } from 'react';

export interface TableCellProps extends WithChildren, WithClassnames {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function TableCell({ className, children, onClick }: TableCellProps) {
  return (
    <div
      className={mergeClassNames(
        'text-text-primary whitespace-nowrap text-xs',
        'pointer-events-none flex h-full items-center',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
