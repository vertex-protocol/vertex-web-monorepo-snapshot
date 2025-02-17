import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames } from '@vertex-protocol/web-common';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { formatNumber } from '@vertex-protocol/react-client';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { signDependentValue } from '@vertex-protocol/react-client';

interface Props extends TableCellProps {
  value: BigDecimal | undefined;
}

export function PnlCell({ value, className }: Props) {
  return (
    <TableCell
      className={joinClassNames(
        signDependentValue(value, {
          positive: 'text-positive',
          negative: 'text-negative',
          zero: 'text-text-primary',
        }),
        className,
      )}
    >
      {formatNumber(value, {
        formatSpecifier: CustomNumberFormatSpecifier.SIGNED_CURRENCY_2DP,
      })}
    </TableCell>
  );
}
