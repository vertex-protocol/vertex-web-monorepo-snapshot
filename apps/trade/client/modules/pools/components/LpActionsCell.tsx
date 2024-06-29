import { CellContext } from '@tanstack/react-table';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { getTableButtonOnClickHandler } from 'client/modules/tables/utils/getTableButtonOnClickHandler';
import { LpTableItem } from '../hooks/useLpTable';

export function LpActionsCell(context: CellContext<LpTableItem, any>) {
  const show = useShowDialogForProduct();
  const userActionState = useUserActionState();
  const disableProvide = userActionState !== 'allow_all';
  const disableWithdraw = userActionState === 'block_all';

  return (
    <TableCell className="pointer-events-auto grid w-full grid-cols-2 gap-x-2 pr-4">
      <SecondaryButton
        size="sm"
        title="Provide"
        className="w-full"
        disabled={disableProvide}
        onClick={getTableButtonOnClickHandler(() => {
          show({
            dialogType: 'provide_liquidity',
            productId: context.row.original.productId,
          });
        })}
      >
        Provide
      </SecondaryButton>
      <SecondaryButton
        size="sm"
        title="Withdraw"
        className="w-full"
        disabled={disableWithdraw}
        onClick={getTableButtonOnClickHandler(() => {
          show({
            dialogType: 'withdraw_liquidity',
            productId: context.row.original.productId,
          });
        })}
      >
        Withdraw
      </SecondaryButton>
    </TableCell>
  );
}
