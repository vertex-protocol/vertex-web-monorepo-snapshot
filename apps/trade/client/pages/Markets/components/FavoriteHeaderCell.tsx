import { Header } from '@tanstack/react-table';
import { joinClassNames, mergeClassNames } from '@vertex-protocol/web-common';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { FavoriteButton } from 'client/components/FavoriteButton';

interface FavoriteHeaderCellProps<T> extends TableCellProps {
  header: Header<T, any>;
  disableFavoriteButton: boolean;
  favoriteButtonSize: number;
  favoriteButtonClassName?: string;
}

export function FavoriteHeaderCell<T>({
  header,
  disableFavoriteButton,
  className,
  favoriteButtonSize,
  favoriteButtonClassName,
}: FavoriteHeaderCellProps<T>) {
  const isSorted = header.column.getIsSorted() === 'asc';

  return (
    <TableCell className={joinClassNames('pointer-events-auto', className)}>
      <FavoriteButton
        size={favoriteButtonSize}
        // Adding padding to increase touch target
        className={mergeClassNames('p-1.5', favoriteButtonClassName)}
        isFavorited={isSorted}
        disabled={disableFavoriteButton}
        onClick={() => {
          header.column.toggleSorting(isSorted ? undefined : false);
        }}
      />
    </TableCell>
  );
}
