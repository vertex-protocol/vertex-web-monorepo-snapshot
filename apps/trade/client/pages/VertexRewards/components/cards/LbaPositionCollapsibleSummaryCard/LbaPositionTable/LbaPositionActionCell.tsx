import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

interface Props extends TableCellProps {
  unlockedValueUsd: BigDecimal | undefined;
}

export function LbaPositionActionCell({
  unlockedValueUsd,
  className,
  ...rest
}: Props) {
  const isConnected = useIsConnected();
  const { show } = useDialog();
  const isDisabled =
    !isConnected || !unlockedValueUsd || unlockedValueUsd?.isZero();

  return (
    <TableCell
      className={joinClassNames('pointer-events-auto', className)}
      {...rest}
    >
      <SecondaryButton
        title="Withdraw Liquidity"
        size="xs"
        disabled={isDisabled}
        onClick={() => show({ type: 'withdraw_lba_liquidity', params: {} })}
      >
        Withdraw Liq.
      </SecondaryButton>
    </TableCell>
  );
}
