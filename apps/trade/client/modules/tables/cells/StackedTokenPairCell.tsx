import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { StackedTokenPairLabel } from 'client/modules/pools/components/StackedTokenPairLabel';
import { PairMetadata } from 'client/modules/pools/types';

interface Props extends TableCellProps {
  metadata?: PairMetadata;
}

export function StackedTokenPairCell({ metadata, ...rest }: Props) {
  return (
    <TableCell {...rest}>
      <StackedTokenPairLabel metadata={metadata} />
    </TableCell>
  );
}
