import { truncateAddress } from '@vertex-protocol/web-common';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';

interface Props extends TableCellProps {
  address: string;
}

export function AddressCell({ address, className }: Props) {
  return (
    <TableCell className={className}>{truncateAddress(address)}</TableCell>
  );
}
