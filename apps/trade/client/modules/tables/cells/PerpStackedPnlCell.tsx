import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames } from '@vertex-protocol/web-common';
import { StackedTableCell } from 'client/components/DataTable/cells/StackedTableCell';
import { TableCellProps } from 'client/components/DataTable/cells/TableCell';
import { getSignDependentColorClassName } from 'client/utils/ui/getSignDependentColorClassName';

interface Props extends TableCellProps {
  pnl: BigDecimal | undefined;
  pnlFrac: BigDecimal | undefined;
}

export function PerpStackedPnlCell({
  pnl,
  pnlFrac,
  className,
  ...rest
}: Props) {
  const color = getSignDependentColorClassName(pnl);
  const formattedPnlFrac = formatNumber(pnlFrac, {
    formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
  });
  const formattedPnl = formatNumber(pnl, {
    formatSpecifier: CustomNumberFormatSpecifier.SIGNED_CURRENCY_2DP,
  });

  return (
    <StackedTableCell
      className={className}
      top={<span className={color}>{formattedPnl}</span>}
      bottom={
        // Skip rendering here so we show only a single `-` when we don't have data
        pnl && (
          <span className={joinClassNames(color, 'text-2xs')}>
            ({formattedPnlFrac})
          </span>
        )
      }
      {...rest}
    />
  );
}
