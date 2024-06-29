import { BigDecimal } from '@vertex-protocol/client';
import { Icons } from '@vertex-protocol/web-ui';
import { AmountWithSymbol } from 'client/components/AmountWithSymbol';
import { StackedTableCell } from 'client/components/DataTable/cells/StackedTableCell';
import { TableCellProps } from 'client/components/DataTable/cells/TableCell';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { formatNumber } from '@vertex-protocol/react-client';
import {
  TimeFormatSpecifier,
  formatTimestamp,
} from 'client/utils/formatTimestamp';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';

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
          {isBurned && <Icons.SiFireship size={12} className="text-negative" />}
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
