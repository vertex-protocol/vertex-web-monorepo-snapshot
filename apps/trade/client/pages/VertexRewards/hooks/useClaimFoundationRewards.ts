import { asyncResult } from '@vertex-protocol/utils';
import { useExecuteClaimFoundationRewards } from 'client/hooks/execute/foundationToken/useExecuteClaimFoundationRewards';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useGetConfirmedTx } from 'client/hooks/util/useGetConfirmedTx';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useFoundationToken } from 'client/modules/rewards/hooks/useFoundationToken';
import { useCallback } from 'react';

/**
 * Util hook for claiming foundation rewards
 */
export function useClaimFoundationRewards() {
  const { show } = useDialog();
  const { dispatchNotification } = useNotificationManagerContext();
  const getConfirmedTx = useGetConfirmedTx();
  const { symbol: foundationTokenSymbol } = useFoundationToken();

  const mutation = useExecuteClaimFoundationRewards();
  const { isLoading, isSuccess } = useOnChainMutationStatus({
    mutationStatus: mutation.status,
    txHash: mutation.data,
  });
  useRunWithDelayOnCondition({
    condition: isSuccess,
    fn: mutation.reset,
  });

  const claim = useCallback(async () => {
    const txHashPromise = mutation.mutateAsync({});

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: `${foundationTokenSymbol} Rewards Claim Failed`,
        executionData: {
          txHashPromise,
        },
      },
    });

    // Await the tx here as well so we can show the success dialog
    const [, txError] = await asyncResult(getConfirmedTx(txHashPromise));

    if (!txError) {
      show({
        type: 'action_success',
        params: {
          title: `Claim Successful!`,
          description: `Rewards are distributed as ${foundationTokenSymbol} and sent directly to your wallet.`,
        },
      });
    }
  }, [
    dispatchNotification,
    foundationTokenSymbol,
    getConfirmedTx,
    mutation,
    show,
  ]);

  return {
    claim,
    isLoading,
    isSuccess,
  };
}
