import { asyncResult } from '@vertex-protocol/utils';
import { useExecuteClaimFoundationRewards } from 'client/hooks/execute/foundationToken/useExecuteClaimFoundationRewards';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useGetConfirmedTxPromise } from 'client/hooks/util/useGetConfirmedTxPromise';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useCallback } from 'react';

/**
 * Util hook for claiming Mantle Rewards
 */
export function useClaimMantleRewards() {
  const { show } = useDialog();
  const { dispatchNotification } = useNotificationManagerContext();
  const getConfirmedTxPromise = useGetConfirmedTxPromise();

  const mutation = useExecuteClaimFoundationRewards();
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
        errorNotificationTitle: 'MNT Rewards Claim Failed',
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
          title: `wMNT Claimed`,
          description: `You have claimed all available MNT incentives. Rewards are distributed as wMNT and sent directly to your wallet. To use your wMNT in Vertex, you will need to deposit first.`,
        },
      });
    }
  }, [dispatchNotification, getConfirmedTxPromise, mutation, show]);

  return {
    claim,
    isLoading,
    isSuccess,
  };
}
