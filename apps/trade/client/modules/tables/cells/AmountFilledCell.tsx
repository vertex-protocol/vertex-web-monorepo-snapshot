import {
  formatNumber,
  NumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames } from '@vertex-protocol/web-common';
import { AmountWithSymbol } from 'client/components/AmountWithSymbol';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';

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
        'flex flex-col items-stretch justify-center gap-y-0.5',
        className,
      )}
    >
      <AmountWithSymbol formattedSize={formattedAmountFilled} symbol={symbol} />
      <div className="text-text-tertiary text-2xs">{`(${formattedPercentageFilled})`}</div>
    </TableCell>
  );
}
