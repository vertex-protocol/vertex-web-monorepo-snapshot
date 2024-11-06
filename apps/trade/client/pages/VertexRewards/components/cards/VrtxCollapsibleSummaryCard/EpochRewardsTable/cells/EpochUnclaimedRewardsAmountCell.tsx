import { BigDecimal } from '@vertex-protocol/client';
import { VRTX_TOKEN_INFO } from '@vertex-protocol/metadata';
import {
  CustomNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import {
  formatTimestamp,
  Icons,
  TimeFormatSpecifier,
} from '@vertex-protocol/web-ui';
import { AmountWithSymbol } from 'client/components/AmountWithSymbol';
import { StackedTableCell } from 'client/components/DataTable/cells/StackedTableCell';
import { TableCellProps } from 'client/components/DataTable/cells/TableCell';

interface Props extends TableCellProps {
  amount: BigDecimal | undefined;
  claimDeadlineMillis: number | undefined;
  isPastClaimDeadline: boolean;
  isCurrent: boolean;
}

export function EpochUnclaimedRewardsAmountCell({
  amount,
  claimDeadlineMillis,
  isPastClaimDeadline,
  isCurrent,
  ...rest
}: Props) {
  const isBurned = isPastClaimDeadline && !isCurrent;
  const amountClassName = isBurned
    ? 'line-through text-text-tertiary'
    : undefined;

  return (
    <StackedTableCell
      top={
        <div className="flex items-center gap-x-1">
          {isBurned && <Icons.FireFill size={12} className="text-negative" />}
          <AmountWithSymbol
            formattedSize={formatNumber(amount, {
              formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
            })}
            symbol={VRTX_TOKEN_INFO.symbol}
            className={amountClassName}
          />
        </div>
      }
      bottom={formatTimestamp(claimDeadlineMillis, {
        formatSpecifier: TimeFormatSpecifier.MMM_D_HH_12H_O,
      })}
      {...rest}
    />
  );
}
