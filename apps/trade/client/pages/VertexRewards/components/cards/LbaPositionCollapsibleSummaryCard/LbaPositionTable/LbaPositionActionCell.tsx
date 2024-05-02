import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

interface Props extends TableCellProps {
  unlockedValueUsd: BigDecimal | undefined;
}

export function LbaPositionActionCell({
  unlockedValueUsd,
  className,
  ...rest
}: Props) {
  const userActionState = useUserActionState();
  const { show } = useDialog();
  const isDisabled =
    userActionState === 'block_all' ||
    !unlockedValueUsd ||
    unlockedValueUsd?.isZero();

  return (
    <TableCell
      className={joinClassNames('pointer-events-auto', className)}
      {...rest}
    >
      <SecondaryButton
        size="md"
        title="Withdraw Liquidity"
        disabled={isDisabled}
        onClick={() => show({ type: 'withdraw_lba_liquidity', params: {} })}
      >
        Withdraw Liq.
      </SecondaryButton>
    </TableCell>
  );
}
