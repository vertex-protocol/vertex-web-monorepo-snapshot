import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Pill } from '@vertex-protocol/web-ui';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';

interface Props extends TableCellProps {
  amount: BigDecimal;
}

export function LpEventTypeCell({ amount, ...rest }: Props) {
  const isProvide = amount.gt(0);
  return (
    <TableCell {...rest}>
      <Pill color="white">
        {/* Inner `span` to maintain bg color and gradient text */}
        <span
          className={joinClassNames(
            'font-medium',
            isProvide ? 'text-negative' : 'text-positive',
          )}
        >
          {isProvide ? 'Provide' : 'Withdraw'}
        </span>
      </Pill>
    </TableCell>
  );
}
