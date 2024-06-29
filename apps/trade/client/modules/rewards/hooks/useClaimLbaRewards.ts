import { asyncResult } from '@vertex-protocol/utils';
import { useExecuteClaimLbaRewards } from 'client/hooks/execute/vrtxToken/useExecuteClaimLbaRewards';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useGetConfirmedTxPromise } from 'client/hooks/util/useGetConfirmedTxPromise';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import { useCallback } from 'react';

/**
 * Util hook for claiming LBA Rewards
 */
export function useClaimLbaRewards() {
  const { dispatchNotification } = useNotificationManagerContext();
  const getConfirmedTxPromise = useGetConfirmedTxPromise();
  const { show } = useDialog();

  const mutation = useExecuteClaimLbaRewards();
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
        errorNotificationTitle: 'LBA Rewards Claim Failed',
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
          title: 'LBA Rewards Claimed',
          description: `You have claimed all LBA rewards. You will receive the claimed ${VRTX_TOKEN_INFO.symbol} directly in your wallet.`,
          cta: {
            label: 'Stake Claimed Rewards',
            onClick: () => {
              show({
                type: 'stake_vrtx',
                params: {},
              });
            },
          },
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
