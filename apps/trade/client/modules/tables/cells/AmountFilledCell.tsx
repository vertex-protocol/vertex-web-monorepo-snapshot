import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames } from '@vertex-protocol/web-common';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import {
  NumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';

interface Props extends TableCellProps {
  amountFilled: BigDecimal;
  fractionFilled: BigDecimal;
  symbol: string;
  amountFormatSpecifier: NumberFormatSpecifier | string;
}

export function AmountFilledCell({
  amountFilled,
  fractionFilled,
  symbol,
  amountFormatSpecifier,
  className,
  ...rest
}: Props) {
  const formattedAmountFilled = formatNumber(amountFilled.abs(), {
    formatSpecifier: amountFormatSpecifier,
  });
  const formattedPercentageFilled = formatNumber(fractionFilled, {
    formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
  });
  return (
    <TableCell
      {...rest}
      className={joinClassNames(
        'flex flex-col items-stretch justify-center',
        className,
      )}
    >
      <div className="text-text-primary flex items-center gap-x-1">
        {formattedAmountFilled}
        <span className="text-text-tertiary text-3xs">{symbol}</span>
      </div>
      <div className="text-text-tertiary text-3xs">{`(${formattedPercentageFilled})`}</div>
    </TableCell>
  );
}
