import { joinClassNames } from '@vertex-protocol/web-common';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import {
  MarginManagerDropdownAction,
  MarginManagerTableActionsDropdown,
} from 'client/pages/Portfolio/subpages/MarginManager/tables/components/MarginManagerTableActionsDropdown';
import { useCallback } from 'react';

interface Props extends TableCellProps {
  actions: MarginManagerDropdownAction[];
}

export function MarginManagerActionsCell({
  className,
  actions,
  ...rest
}: Props) {
  const showDialogForProduct = useShowDialogForProduct();
  const pushTradePage = usePushTradePage();

  const performOnClickAction = useCallback(
    ({ type, productId }: MarginManagerDropdownAction) => {
      if (type === 'trade_spot' || type === 'trade_perp') {
        pushTradePage({ productId });
      } else {
        showDialogForProduct({
          dialogType: type,
          productId,
        });
      }
    },
    [pushTradePage, showDialogForProduct],
  );

  return (
    <TableCell
      className={joinClassNames(
        'group pointer-events-auto flex items-center justify-end gap-x-3 pl-3 pr-4',
        className,
      )}
      {...rest}
    >
      <MarginManagerTableActionsDropdown
        performOnClickAction={performOnClickAction}
        actions={actions}
      />
    </TableCell>
  );
}
