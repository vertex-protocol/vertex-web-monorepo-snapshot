import { joinClassNames } from '@vertex-protocol/web-common';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { EpochRewardsTableData } from '../useEpochRewardsTable';

type Props = TableCellProps &
  Pick<
    EpochRewardsTableData,
    | 'epochNumber'
    | 'isCurrent'
    | 'isPastClaimDeadline'
    | 'rewardsUnclaimed'
    | 'rewardsEarned'
  >;

export function EpochRewardsLiquidClaimActionCell({
  epochNumber,
  isCurrent,
  isPastClaimDeadline,
  rewardsEarned,
  rewardsUnclaimed,
  className,
  ...rest
}: Props) {
  const { show } = useDialog();
  const userActionState = useUserActionState();

  const hasClaimedRewards = rewardsEarned?.gt(0) && rewardsUnclaimed?.isZero();

  const canClaim =
    !isCurrent && !isPastClaimDeadline && rewardsUnclaimed?.gt(0);

  const isDisabled = !canClaim || userActionState === 'block_all';

  const buttonLabel = (() => {
    if (isCurrent) {
      return 'Pending';
    }
    if (isPastClaimDeadline) {
      return 'Claim Ended';
    }
    if (hasClaimedRewards) {
      return 'Claimed';
    }
    return 'Claim';
  })();

  return (
    <TableCell
      className={joinClassNames('pointer-events-auto', className)}
      {...rest}
    >
      <PrimaryButton
        size="sm"
        title="Claim"
        disabled={isDisabled}
        onClick={() => {
          if (!rewardsUnclaimed) {
            return;
          }
          show({
            type: 'claim_vrtx_trading_rewards',
            params: {
              epochNumber,
              claimableRewards: rewardsUnclaimed,
            },
          });
        }}
        className="flex-1"
      >
        {buttonLabel}
      </PrimaryButton>
    </TableCell>
  );
}
