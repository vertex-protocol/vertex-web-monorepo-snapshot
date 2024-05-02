import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useCallback } from 'react';
import { useExecuteClaimArbRewards } from 'client/hooks/execute/vrtxToken/useExecuteClaimArbRewards';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { asyncResult } from '@vertex-protocol/web-common';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { getConfirmedTxPromise } from 'client/utils/getConfirmedTxPromise';

/**
 * Util hook for claiming ARB Rewards
 */
export function useClaimArbRewards() {
  const { show } = useDialog();
  const { dispatchNotification } = useNotificationManagerContext();

  const mutation = useExecuteClaimArbRewards();
  const { isLoading, isSuccess } = useOnChainMutationStatus({
    mutationStatus: mutation.status,
    txResponse: mutation.data,
  });
  useRunWithDelayOnCondition({
    condition: isSuccess,
    fn: mutation.reset,
  });

  const claim = useCallback(async () => {
    const txResponsePromise = mutation.mutateAsync({});

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'ARB Rewards Claim Failed',
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
          title: `ARB Claimed`,
          description: `You have claimed all available ARB incentives. You will receive the funds directly in your wallet. To use your ARB rewards in Vertex, you will need to deposit first.`,
        },
      });
    }
  }, [dispatchNotification, mutation, show]);

  return {
    claim,
    isLoading,
    isSuccess,
  };
}
