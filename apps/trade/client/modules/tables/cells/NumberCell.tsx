import { BigDecimal } from '@vertex-protocol/utils';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { NumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
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
