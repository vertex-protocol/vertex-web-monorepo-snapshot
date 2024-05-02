import { Icons } from '@vertex-protocol/web-ui';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';

interface Props extends TableCellProps {
  isPending: boolean;
}

export function WithdrawalStatusCell({ isPending, ...rest }: Props) {
  const cellContent = isPending ? (
    <>
      <Icons.MdAccessTime size={16} className="text-accent" />
      Pending
    </>
  ) : (
    <>
      <Icons.MdCheckCircleOutline size={16} className="text-positive" />
      Confirmed
    </>
  );

  return (
    <TableCell {...rest}>
      <div className="flex items-center gap-x-1">{cellContent}</div>
    </TableCell>
  );
}
