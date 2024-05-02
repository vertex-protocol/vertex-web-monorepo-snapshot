import { Header } from '@tanstack/react-table';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { FavoriteButton } from 'client/components/FavoriteButton';

interface FavoriteHeaderCellProps<T> extends TableCellProps {
  header: Header<T, any>;
  disableFavoriteButton: boolean;
}

export function FavoriteHeaderCell<T>({
  header,
  disableFavoriteButton,
}: FavoriteHeaderCellProps<T>) {
  const isSorted = header.column.getIsSorted() === 'asc';

  return (
    <TableCell className="pointer-events-auto">
      <FavoriteButton
        size={12}
        // Adding padding to increase touch target
        className="p-1.5"
        isFavorited={isSorted}
        disabled={disableFavoriteButton}
        onClick={() => {
          header.column.toggleSorting(isSorted ? undefined : false);
        }}
      />
    </TableCell>
  );
}
