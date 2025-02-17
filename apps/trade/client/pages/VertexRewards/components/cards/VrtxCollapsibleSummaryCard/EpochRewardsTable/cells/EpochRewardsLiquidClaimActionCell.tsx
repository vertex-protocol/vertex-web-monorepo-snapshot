import { joinClassNames } from '@vertex-protocol/web-common';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { EpochRewardsTableData } from 'client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/EpochRewardsTable/useEpochRewardsTable';

type Props = TableCellProps &
  Pick<
    EpochRewardsTableData,
    | 'epochNumber'
    | 'isCurrent'
    | 'rewardsUnclaimed'
    | 'rewardsEarned'
    | 'isPreLbaAirdropEpoch'
  >;

export function EpochRewardsLiquidClaimActionCell({
  epochNumber,
  isCurrent,
  rewardsEarned,
  rewardsUnclaimed,
  isPreLbaAirdropEpoch,
  className,
  ...rest
}: Props) {
  const isConnected = useIsConnected();
  const { show } = useDialog();

  const hasClaimedRewards = rewardsEarned?.gt(0) && rewardsUnclaimed?.isZero();

  const isProcessing = !rewardsUnclaimed;

  const canClaim = !isCurrent && rewardsUnclaimed?.gt(0);

  const isDisabled = !canClaim || !isConnected;

  const buttonLabel = (() => {
    // Current Epoch
    if (isCurrent) {
      return 'Pending';
    }
    if (isPreLbaAirdropEpoch) {
      return 'Pre-LBA';
    }
    // Recently completed epoch, but we don't have merkle proofs/rewards data yet
    if (isProcessing) {
      return 'Processing';
    }
    // User has claimed rewards
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
        size="xs"
        title={buttonLabel}
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
