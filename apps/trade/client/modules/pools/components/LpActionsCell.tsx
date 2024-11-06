import { CellContext } from '@tanstack/react-table';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { LpTableItem } from 'client/modules/pools/hooks/useLpTable';
import { getTableButtonOnClickHandler } from 'client/modules/tables/utils/getTableButtonOnClickHandler';

export function LpActionsCell(context: CellContext<LpTableItem, any>) {
  const showDialogForProduct = useShowDialogForProduct();
  const isConnected = useIsConnected();

  return (
    <TableCell className="pointer-events-auto grid w-full grid-cols-2 gap-x-2 pr-4">
      <SecondaryButton
        size="sm"
        title="Provide"
        className="w-full"
        disabled={!isConnected}
        onClick={getTableButtonOnClickHandler(() => {
          showDialogForProduct({
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
        disabled={!isConnected}
        onClick={getTableButtonOnClickHandler(() => {
          showDialogForProduct({
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
