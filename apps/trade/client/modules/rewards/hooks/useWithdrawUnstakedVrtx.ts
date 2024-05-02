import { useExecuteWithdrawUnstakedVrtx } from 'client/hooks/execute/vrtxToken/useExecuteWithdrawUnstakedVrtx';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { asyncResult } from '@vertex-protocol/web-common';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import { useCallback } from 'react';
import { getConfirmedTxPromise } from 'client/utils/getConfirmedTxPromise';

/**
 * Util hook for withdrawing unlocked unstaked VRTX
 */
export function useWithdrawUnstakedVrtx() {
  const { dispatchNotification } = useNotificationManagerContext();
  const { show } = useDialog();

  const mutation = useExecuteWithdrawUnstakedVrtx();
  const { isLoading, isSuccess } = useOnChainMutationStatus({
    mutationStatus: mutation.status,
    txResponse: mutation.data,
  });
  useRunWithDelayOnCondition({
    condition: isSuccess,
    fn: mutation.reset,
  });

  const withdraw = useCallback(async () => {
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
          title: `Unstaked ${VRTX_TOKEN_INFO.symbol} Claimed`,
          description: `You have successfully claimed your unstaked ${VRTX_TOKEN_INFO.symbol}. You will receive the claimed ${VRTX_TOKEN_INFO.symbol} directly in your wallet.`,
        },
      });
    }
  }, [dispatchNotification, mutation, show]);

  return {
    withdraw,
    isLoading,
    isSuccess,
  };
}
