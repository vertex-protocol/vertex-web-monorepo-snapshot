import { SecondaryButton } from '@vertex-protocol/web-ui';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { getTableButtonOnClickHandler } from 'client/modules/tables/utils/getTableButtonOnClickHandler';

interface Props {
  productId: number;
}

export function MoneyMarketActionsCell({ productId }: Props) {
  const userActionState = useUserActionState();
  const isDepositDisabled = userActionState === 'block_all';
  const isBorrowDisabled = userActionState !== 'allow_all';
  const showDialogForProduct = useShowDialogForProduct();

  return (
    <TableCell className="pointer-events-auto grid w-full grid-cols-2 gap-x-2 pr-4">
      <SecondaryButton
        size="md"
        title="Deposit"
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
        size="md"
        title="Borrow"
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
