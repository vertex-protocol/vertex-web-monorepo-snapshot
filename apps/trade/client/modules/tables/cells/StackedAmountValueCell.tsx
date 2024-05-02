import { BigDecimal } from '@vertex-protocol/utils';
import { StackedTableCell } from 'client/components/DataTable/cells/StackedTableCell';
import { TableCellProps } from 'client/components/DataTable/cells/TableCell';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import {
  CustomNumberFormatSpecifier,
  NumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';

interface Props extends TableCellProps {
  symbol: string;
  size: BigDecimal;
  // Defaults to NUMBER_AUTO
  sizeFormatSpecifier?: string | NumberFormatSpecifier;
  value: BigDecimal;
}

export function StackedAmountValueCell({
  symbol,
  size,
  sizeFormatSpecifier,
  value,
  className,
  ...rest
}: Props) {
  const formattedSize = formatNumber(size, {
    formatSpecifier:
      sizeFormatSpecifier ?? CustomNumberFormatSpecifier.NUMBER_AUTO,
  });
  const formattedValue = formatNumber(value, {
    formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
  });

  return (
    <StackedTableCell
      className={className}
      top={
        <div className="flex items-baseline gap-x-1">
          {formattedSize}
          <span className="text-text-tertiary text-3xs">{symbol}</span>
        </div>
      }
      bottom={formattedValue}
      {...rest}
    />
  );
}
