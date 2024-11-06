import { SecondaryButton } from '@vertex-protocol/web-ui';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { getTableButtonOnClickHandler } from 'client/modules/tables/utils/getTableButtonOnClickHandler';

interface Props {
  productId: number;
}

export function MoneyMarketActionsCell({ productId }: Props) {
  const isConnected = useIsConnected();
  const isDepositDisabled = !isConnected;
  const isBorrowDisabled = !isConnected;
  const showDialogForProduct = useShowDialogForProduct();

  return (
    <TableCell className="pointer-events-auto grid w-full grid-cols-2 gap-x-2 pr-4">
      <SecondaryButton
        title="Deposit"
        size="sm"
        disabled={isDepositDisabled}
        onClick={getTableButtonOnClickHandler(() => {
          showDialogForProduct({
            dialogType: 'deposit',
            productId: productId,
          });
        })}
      >
        Deposit
      </SecondaryButton>
      <SecondaryButton
        title="Borrow"
        size="sm"
        disabled={isBorrowDisabled}
        onClick={getTableButtonOnClickHandler(() => {
          showDialogForProduct({
            dialogType: 'borrow',
            productId: productId,
          });
        })}
      >
        Borrow
      </SecondaryButton>
    </TableCell>
  );
}
