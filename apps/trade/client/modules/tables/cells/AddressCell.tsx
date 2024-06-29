import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { getTruncatedAddress } from 'client/utils/getTruncatedAddress';

interface Props extends TableCellProps {
  address: string;
}

export function AddressCell({ address, className }: Props) {
  return (
    <TableCell className={className}>
      {getTruncatedAddress(address, 4)}
    </TableCell>
  );
}
