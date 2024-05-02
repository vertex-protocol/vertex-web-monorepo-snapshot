import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { FavoriteButton } from 'client/components/FavoriteButton';
import { getTableButtonOnClickHandler } from 'client/modules/tables/utils/getTableButtonOnClickHandler';

interface Props {
  isFavorited: boolean;
  disabled: boolean;
  toggleIsFavorited: (marketId: number) => void;
  productId: number;
}

export function FavoriteToggleCell({
  isFavorited,
  disabled,
  toggleIsFavorited,
  productId,
}: Props) {
  return (
    <TableCell className="pointer-events-auto">
      <FavoriteButton
        size={15}
        className="p-1.5"
        isFavorited={isFavorited}
        disabled={disabled}
        onClick={getTableButtonOnClickHandler(() => {
          toggleIsFavorited(productId);
        })}
      />
    </TableCell>
  );
}
