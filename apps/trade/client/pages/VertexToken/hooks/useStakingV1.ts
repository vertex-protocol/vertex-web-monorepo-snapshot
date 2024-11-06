import { removeDecimals } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { useExecuteClaimStakingRewards } from 'client/hooks/execute/vrtxToken/useExecuteClaimStakingRewards';
import { useExecuteWithdrawUnstakedVrtx } from 'client/hooks/execute/vrtxToken/useExecuteWithdrawUnstakedVrtx';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useAccountStakingState } from 'client/hooks/query/vrtxToken/useAccountStakingState';
import { useStakingMigrationState } from 'client/hooks/query/vrtxToken/useStakingMigrationState';
import { useStakingState } from 'client/hooks/query/vrtxToken/useStakingState';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useCallback } from 'react';

export function useStakingV1() {
  const { data: accountStakingState } = useAccountStakingState();
  const { data: stakingState } = useStakingState();
  const { data: stakingMigrationState } = useStakingMigrationState();
  const {
    primaryQuoteToken: { tokenDecimals: quoteDecimals, symbol: quoteSymbol },
    protocolTokenMetadata: {
      token: {
        tokenDecimals: protocolTokenDecimals,
        symbol: protocolTokenSymbol,
      },
    },
  } = useVertexMetadataContext();
  const { show } = useDialog();
  const { dispatchNotification } = useNotificationManagerContext();

  const unlockTimeMillis = (() => {
    if (
      !accountStakingState?.lastUnstakeTime ||
      !stakingState?.unstakeUnlockTimeIntervalMillis
    ) {
      return undefined;
    }
    return accountStakingState?.lastUnstakeTime
      ?.plus(stakingState?.unstakeUnlockTimeIntervalMillis)
      .multipliedBy(1000);
  })();

  /**
   * Withdraw Claimable Mutation
   */
  const executeWithdrawUnstakedVrtx = useExecuteWithdrawUnstakedVrtx();

  const {
    isLoading: withdrawUnstakedIsLoading,
    isSuccess: withdrawUnstakedIsSuccess,
  } = useOnChainMutationStatus({
    mutationStatus: executeWithdrawUnstakedVrtx.status,
    txResponse: executeWithdrawUnstakedVrtx.data,
  });

  useRunWithDelayOnCondition({
    condition: withdrawUnstakedIsSuccess,
    fn: () =>
      show({
        type: 'action_success',
        params: {
          title: `Unstaked ${protocolTokenSymbol} Claimed`,
          description: `You have successfully claimed your unstaked ${protocolTokenSymbol}. You will receive the claimed ${protocolTokenSymbol} directly in your wallet.`,
        },
      }),
  });

  const withdrawClaimable = useCallback(async () => {
    const txResponsePromise = executeWithdrawUnstakedVrtx.mutateAsync({});

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Withdraw Unstaked VRTX Failed',
        executionData: {
          txResponsePromise,
        },
      },
    });
  }, [dispatchNotification, executeWithdrawUnstakedVrtx]);

  /**
   * Claim rewards mutation
   */
  const executeClaimStakingRewards = useExecuteClaimStakingRewards();

  const {
    isLoading: claimStakingRewardsIsLoading,
    isSuccess: claimStakingRewardsIsSuccess,
  } = useOnChainMutationStatus({
    mutationStatus: executeClaimStakingRewards.status,
    txResponse: executeClaimStakingRewards.data,
  });

  useRunWithDelayOnCondition({
    condition: claimStakingRewardsIsSuccess,
    fn: () =>
      show({
        type: 'action_success',
        params: {
          title: `${quoteSymbol} Rewards Claimed`,
          description: `You have successfully claimed your ${quoteSymbol} staking rewards. You will receive the claimed ${quoteSymbol} directly in your wallet.`,
        },
      }),
  });

  const claimStakingRewards = useCallback(async () => {
    const txResponsePromise = executeClaimStakingRewards.mutateAsync({});

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Claim staking rewards VRTX Failed',
        executionData: {
          txResponsePromise,
        },
      },
    });
  }, [dispatchNotification, executeClaimStakingRewards]);

  return {
    accountUsdcRewardsEarned: removeDecimals(
      accountStakingState?.totalRewards,
      quoteDecimals,
    ),
    accountUsdcRewardsClaimable: removeDecimals(
      accountStakingState?.claimableRewards,
      quoteDecimals,
    ),
    amountStaked: removeDecimals(
      accountStakingState?.amountStaked,
      protocolTokenDecimals,
    ),
    accountUnstakedClaimable: removeDecimals(
      accountStakingState?.unstakedClaimable,
      protocolTokenDecimals,
    ),
    bonusDeadlineMillis:
      stakingMigrationState?.v2BonusDeadlineMillis.toNumber(),
    unlockTimeMillis: unlockTimeMillis?.toNumber(),
    migrationBonus: removeDecimals(
      stakingMigrationState?.v2MigrationBonus,
      protocolTokenDecimals,
    ),
    showRewardsCard: accountStakingState?.claimableRewards.gt(0),
    showPositionCard: accountStakingState?.amountStaked.gt(0),
    showUnstakedCard:
      accountStakingState?.unstakedLocked.gt(0) ||
      accountStakingState?.unstakedClaimable.gt(0),
    withdrawUnstakedIsLoading,
    withdrawClaimable,
    claimStakingRewardsIsLoading,
    claimStakingRewards,
  };
}
