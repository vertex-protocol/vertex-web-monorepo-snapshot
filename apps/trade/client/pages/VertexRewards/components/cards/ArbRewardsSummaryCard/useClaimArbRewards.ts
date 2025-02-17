import { asyncResult } from '@vertex-protocol/utils';
import { useExecuteClaimFoundationRewards } from 'client/hooks/execute/foundationToken/useExecuteClaimFoundationRewards';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useGetConfirmedTx } from 'client/hooks/util/useGetConfirmedTx';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useCallback } from 'react';

/**
 * Util hook for claiming ARB Rewards
 */
export function useClaimArbRewards() {
  const { show } = useDialog();
  const { dispatchNotification } = useNotificationManagerContext();
  const getConfirmedTx = useGetConfirmedTx();

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
        errorNotificationTitle: 'ARB Rewards Claim Failed',
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
          title: `ARB Claimed`,
          description: `You have claimed all available ARB incentives. You will receive the funds directly in your wallet. To use your ARB rewards in Vertex, you will need to deposit first.`,
        },
      });
    }
  }, [dispatchNotification, getConfirmedTx, mutation, show]);

  return {
    claim,
    isLoading,
    isSuccess,
  };
}
