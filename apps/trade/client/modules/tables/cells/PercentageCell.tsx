import { BigDecimal } from '@vertex-protocol/utils';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import {
  NumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';

interface Props extends TableCellProps {
  fraction: BigDecimal;
  formatSpecifier?: NumberFormatSpecifier;
}

export function PercentageCell({
  fraction,
  formatSpecifier = PresetNumberFormatSpecifier.PERCENTAGE_2DP,
  ...rest
}: Props) {
  const formattedPercentage = formatNumber(fraction, {
    formatSpecifier,
  });

  return <TableCell {...rest}>{formattedPercentage}</TableCell>;
}
