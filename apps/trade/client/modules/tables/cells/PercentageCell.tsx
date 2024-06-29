import {
  NumberFormatSpecifier,
  PresetNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';

interface Props extends TableCellProps {
  fraction: BigDecimal;
  formatSpecifier?: NumberFormatSpecifier;
}

export function PercentageCell({ fraction, formatSpecifier, ...rest }: Props) {
  const formattedPercentage = formatNumber(fraction, {
    formatSpecifier:
      formatSpecifier ?? PresetNumberFormatSpecifier.PERCENTAGE_2DP,
  });

  return <TableCell {...rest}>{formattedPercentage}</TableCell>;
}
