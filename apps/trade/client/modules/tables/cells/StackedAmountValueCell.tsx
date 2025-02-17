import {
  CustomNumberFormatSpecifier,
  formatNumber,
  NumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { StackedTableCell } from 'client/components/DataTable/cells/StackedTableCell';
import { TableCellProps } from 'client/components/DataTable/cells/TableCell';

interface Props extends TableCellProps {
  symbol: string;
  size: BigDecimal | undefined;
  // Defaults to NUMBER_AUTO
  sizeFormatSpecifier?: string | NumberFormatSpecifier;
  // Defaults to CURRENCY_2DP
  valueFormatSpecifier?: string | NumberFormatSpecifier;
  valueUsd: BigDecimal | undefined;
}

export function StackedAmountValueCell({
  symbol,
  size,
  sizeFormatSpecifier,
  valueFormatSpecifier,
  valueUsd,
  className,
  ...rest
}: Props) {
  const formattedSize = formatNumber(size, {
    formatSpecifier:
      sizeFormatSpecifier ?? CustomNumberFormatSpecifier.NUMBER_AUTO,
  });
  const formattedValue = formatNumber(valueUsd, {
    formatSpecifier:
      valueFormatSpecifier ?? PresetNumberFormatSpecifier.CURRENCY_2DP,
  });

  return (
    <StackedTableCell
      className={className}
      top={
        <div className="flex items-baseline gap-x-1">
          {formattedSize}
          <span className="text-3xs">{symbol}</span>
        </div>
      }
      bottom={formattedValue}
      {...rest}
    />
  );
}
