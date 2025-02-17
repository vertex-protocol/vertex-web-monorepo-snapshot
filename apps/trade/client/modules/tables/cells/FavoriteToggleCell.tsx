import {
  WithClassnames,
  joinClassNames,
  mergeClassNames,
} from '@vertex-protocol/web-common';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { FavoriteButton } from 'client/components/ActionButtons/FavoriteButton';
import { getTableButtonOnClickHandler } from 'client/modules/tables/utils/getTableButtonOnClickHandler';

interface Props extends WithClassnames {
  isFavorited: boolean;
  disabled: boolean;
  toggleIsFavorited: (marketId: number) => void;
  productId: number;
  favoriteButtonSize: number;
  favoriteButtonClassName?: string;
}

export function FavoriteToggleCell({
  isFavorited,
  disabled,
  toggleIsFavorited,
  productId,
  className,
  favoriteButtonSize,
  favoriteButtonClassName,
}: Props) {
  return (
    <TableCell className={joinClassNames('pointer-events-auto', className)}>
      <FavoriteButton
        size={favoriteButtonSize}
        className={mergeClassNames('p-1.5', favoriteButtonClassName)}
        isFavorited={isFavorited}
        disabled={disabled}
        onClick={getTableButtonOnClickHandler(() => {
          toggleIsFavorited(productId);
        })}
      />
    </TableCell>
  );
}
