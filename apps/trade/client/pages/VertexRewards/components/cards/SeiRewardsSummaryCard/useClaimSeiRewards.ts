import { asyncResult } from '@vertex-protocol/utils';
import { useExecuteClaimFoundationRewards } from 'client/hooks/execute/foundationToken/useExecuteClaimFoundationRewards';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useGetConfirmedTxPromise } from 'client/hooks/util/useGetConfirmedTxPromise';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useCallback } from 'react';

export function useClaimSeiRewards() {
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
        errorNotificationTitle: 'SEI Rewards Claim Failed',
        executionData: { txResponsePromise },
      },
    });

    const [, txError] = await asyncResult(
      getConfirmedTxPromise(txResponsePromise),
    );

    if (!txError) {
      show({
        type: 'action_success',
        params: {
          title: `wSEI Claimed`,
          description: `You have claimed all available SEI incentives. Rewards are distributed as wSEI and sent directly to your wallet. To use your wSEI in Vertex, you will need to deposit first.`,
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
