import { BigDecimal } from '@vertex-protocol/utils';
import { AmountWithSymbol } from 'client/components/AmountWithSymbol';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { formatNumber } from '@vertex-protocol/react-client';
import { NumberFormatSpecifier } from '@vertex-protocol/react-client';
import { isTpSlOrderSize } from 'client/modules/trading/tpsl/utils/isTpSlOrderSize';

interface Props extends TableCellProps {
  amount: BigDecimal | undefined;
  symbol: string | undefined;
  formatSpecifier: NumberFormatSpecifier | string;
}

export function TriggerOrderAmountWithSymbolCell({
  amount,
  symbol,
  formatSpecifier,
  ...rest
}: Props) {
  const isMaxSize = isTpSlOrderSize(amount);

  // Just show "MAX" if this is the max TP/SL order amount.
  const formattedSize = isMaxSize
    ? 'MAX'
    : formatNumber(amount, { formatSpecifier });

  return (
    <TableCell {...rest}>
      <AmountWithSymbol
        formattedSize={formattedSize}
        symbol={isMaxSize ? undefined : symbol}
      />
    </TableCell>
  );
}
