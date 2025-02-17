import { VRTX_TOKEN_INFO } from '@vertex-protocol/react-client';
import { asyncResult } from '@vertex-protocol/utils';
import { useExecuteClaimLbaRewards } from 'client/hooks/execute/vrtxToken/useExecuteClaimLbaRewards';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useGetConfirmedTx } from 'client/hooks/util/useGetConfirmedTx';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useCallback } from 'react';

/**
 * Util hook for claiming LBA Rewards
 */
export function useClaimLbaRewards() {
  const { dispatchNotification } = useNotificationManagerContext();
  const getConfirmedTx = useGetConfirmedTx();
  const { show } = useDialog();

  const mutation = useExecuteClaimLbaRewards();
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
        errorNotificationTitle: 'LBA Rewards Claim Failed',
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
          title: 'LBA Rewards Claimed',
          description: `You have claimed all LBA rewards. You will receive the claimed ${VRTX_TOKEN_INFO.symbol} directly in your wallet.`,
          cta: {
            label: 'Stake Claimed Rewards',
            onClick: () => {
              show({
                type: 'stake_v2_vrtx',
                params: {},
              });
            },
          },
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
