import { asyncResult, removeDecimals } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { useExecuteWithdrawUnstakedVrtx } from 'client/hooks/execute/vrtxToken/useExecuteWithdrawUnstakedVrtx';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useAccountStakingState } from 'client/hooks/query/vrtxToken/useAccountStakingState';
import { useGetConfirmedTxPromise } from 'client/hooks/util/useGetConfirmedTxPromise';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useStakingHistoryUrl } from 'client/pages/VertexToken/components/StakingStatsCard/hooks/useStakingHistoryUrl';
import { calcTimeOfMaxStakingScore } from 'client/utils/calcs/stakingV1Calcs';
import { useCallback } from 'react';

export function useStakingMoreDetails() {
  const { show } = useDialog();
  const { dispatchNotification } = useNotificationManagerContext();
  const { data: accountStakingState } = useAccountStakingState();
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const isConnected = useIsConnected();
  const stakingHistoryUrl = useStakingHistoryUrl();

  const vrtxDecimals = protocolTokenMetadata.token.tokenDecimals;

  const accountUnstakedClaimable = removeDecimals(
    accountStakingState?.unstakedClaimable,
    vrtxDecimals,
  );

  const maxScoreTimeMillis = (() => {
    if (!accountStakingState?.lastActionTime) {
      return;
    }

    return calcTimeOfMaxStakingScore(accountStakingState.lastActionTime)
      .multipliedBy(1000)
      .toNumber();
  })();

  const claimButtonDisabled =
    !accountUnstakedClaimable ||
    accountUnstakedClaimable?.isZero() ||
    !isConnected;

  /**
   * Mutation
   */
  const mutation = useExecuteWithdrawUnstakedVrtx();

  const { isLoading, isSuccess } = useOnChainMutationStatus({
    mutationStatus: mutation.status,
    txResponse: mutation.data,
  });

  useRunWithDelayOnCondition({
    condition: isSuccess,
    fn: mutation.reset,
  });

  const getConfirmedTxPromise = useGetConfirmedTxPromise();
  const onWithdrawUnstaked = useCallback(async () => {
    const txResponsePromise = mutation.mutateAsync({});

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Withdraw Unstaked VRTX Failed',
        executionData: {
          txResponsePromise,
        },
      },
    });

    // Await the tx here as well so we can show the success dialog
    const [, txError] = await asyncResult(
      getConfirmedTxPromise(txResponsePromise),
    );

    if (!txError) {
      show({
        type: 'action_success',
        params: {
          title: `Unstaked ${protocolTokenMetadata.token.symbol} Claimed`,
          description: `You have successfully claimed your unstaked ${protocolTokenMetadata.token.symbol}. You will receive the claimed ${protocolTokenMetadata.token.symbol} directly in your wallet.`,
        },
      });
    }
  }, [
    dispatchNotification,
    getConfirmedTxPromise,
    mutation,
    protocolTokenMetadata,
    show,
  ]);

  return {
    accountUnstakedClaimable,
    accountUnstakedLocked: removeDecimals(
      accountStakingState?.unstakedLocked,
      vrtxDecimals,
    ),
    lastStakeTimeMillis: accountStakingState?.lastStakeTime
      ?.multipliedBy(1000)
      .toNumber(),
    lastUnstakeTimeMillis: accountStakingState?.lastUnstakeTime
      ?.multipliedBy(1000)
      .toNumber(),
    maxScoreTimeMillis,
    stakingHistoryUrl,
    claimButtonDisabled,
    onWithdrawUnstaked,
    withdrawUnstakedIsLoading: isLoading,
    withdrawUnstakedIsSuccess: isSuccess,
  };
}
