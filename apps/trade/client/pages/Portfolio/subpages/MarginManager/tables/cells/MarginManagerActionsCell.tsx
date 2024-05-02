import { joinClassNames } from '@vertex-protocol/web-common';
import {
  TableCellProps,
  TableCell,
} from 'client/components/DataTable/cells/TableCell';
import {
  MarginManagerPopoverAction,
  MarginManagerTableActionsPopover,
} from '../components/MarginManagerTableActionsPopover';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { useCallback } from 'react';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';

interface Props extends TableCellProps {
  actions: MarginManagerPopoverAction[];
}

export function MarginManagerActionsCell({
  className,
  actions,
  ...rest
}: Props) {
  const showDialogForProduct = useShowDialogForProduct();
  const pushTradePage = usePushTradePage();

  const performOnClickAction = useCallback(
    ({ type, productId }: MarginManagerPopoverAction) => {
      if (type === 'trade_spot' || type === 'trade_perp') {
        pushTradePage({ productId });
      } else {
        showDialogForProduct({ dialogType: type, productId });
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
      <MarginManagerTableActionsPopover
        performOnClickAction={performOnClickAction}
        actions={actions}
      />
    </TableCell>
  );
}
