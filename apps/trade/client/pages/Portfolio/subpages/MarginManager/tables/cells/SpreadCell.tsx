import {
  CustomNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { Icons } from '@vertex-protocol/web-ui';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { signDependentValue } from 'client/utils/signDependentValue';

interface Props extends TableCellProps {
  amount: BigDecimal;
  symbol: string;
}

export function SpreadCell({ className, symbol, amount, ...rest }: Props) {
  const formattedAmount = formatNumber(amount.abs(), {
    formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
  });

  return (
    <TableCell className={className} {...rest}>
      <div className="flex items-center gap-x-1">
        {signDependentValue(amount, {
          positive: <Icons.CaretUpFill size={10} className="text-positive" />,
          negative: <Icons.CaretDownFill size={10} className="text-negative" />,
          zero: null,
        })}
        {formattedAmount}{' '}
        <div className="text-text-tertiary text-3xs">{symbol}</div>
      </div>
    </TableCell>
  );
}
