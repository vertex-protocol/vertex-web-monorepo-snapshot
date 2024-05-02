import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames } from '@vertex-protocol/web-common';
import { StackedTableCell } from 'client/components/DataTable/cells/StackedTableCell';
import { TableCellProps } from 'client/components/DataTable/cells/TableCell';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import { signDependentValue } from 'client/utils/signDependentValue';

interface Props extends TableCellProps {
  pnl: BigDecimal;
  pnlFrac: BigDecimal;
}

export function PerpStackedPnlCell({
  pnl,
  pnlFrac,
  className,
  ...rest
}: Props) {
  const color = signDependentValue(pnl, {
    positive: 'text-positive',
    negative: 'text-negative',
    zero: 'text-text-primary',
  });
  const formattedPnlFrac = formatNumber(pnlFrac, {
    formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
  });
  const formattedPnl = formatNumber(pnl, {
    formatSpecifier: CustomNumberFormatSpecifier.SIGNED_CURRENCY_2DP,
  });

  return (
    <StackedTableCell
      className={className}
      top={<div className={color}>{formattedPnl}</div>}
      bottom={
        <div className={joinClassNames(color, 'text-3xs')}>
          ({formattedPnlFrac})
        </div>
      }
      {...rest}
    />
  );
}
