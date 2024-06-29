import { BigDecimal } from '@vertex-protocol/utils';
import { formatNumber } from '@vertex-protocol/react-client';
import { NumberFormatSpecifier } from '@vertex-protocol/react-client';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';

interface Props extends TableCellProps {
  value: BigDecimal;
  formatSpecifier: NumberFormatSpecifier | string;
}

export function NumberCell({ value, formatSpecifier, ...rest }: Props) {
  const formattedValue = formatNumber(value, {
    formatSpecifier: formatSpecifier,
  });
  return <TableCell {...rest}>{formattedValue}</TableCell>;
}
