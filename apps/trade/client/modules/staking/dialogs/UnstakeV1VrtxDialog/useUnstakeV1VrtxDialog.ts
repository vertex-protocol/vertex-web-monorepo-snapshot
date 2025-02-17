import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { addDecimals, removeDecimals } from '@vertex-protocol/utils';
import { useExecuteUnstakeVrtx } from 'client/hooks/execute/vrtxToken/useExecuteUnstakeVrtx';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useAccountStakingState } from 'client/hooks/query/vrtxToken/useAccountStakingState';
import { useStakingState } from 'client/hooks/query/vrtxToken/useStakingState';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { now } from 'lodash';
import { useCallback, useMemo } from 'react';

export function useUnstakeV1VrtxDialog() {
  const {
    protocolTokenMetadata: {
      token: {
        tokenDecimals: protocolTokenDecimals,
        symbol: protocolTokenSymbol,
        icon: { asset: protocolTokenIconSrc },
      },
    },
  } = useVertexMetadataContext();
  const { data: accountStakingState } = useAccountStakingState();
  const { data: stakingState } = useStakingState();
  const { dispatchNotification } = useNotificationManagerContext();
  const { hide } = useDialog();

  const { currentBalance, unstakedUnlockTimeMillis } = useMemo(() => {
    const currentBalance = removeDecimals(
      accountStakingState?.amountStaked,
      protocolTokenDecimals,
    );

    // Since we don't have a separate unstake unlock time for V1, so we need display a manual unlock time
    const unstakedUnlockTimeMillis =
      stakingState?.unstakeUnlockTimeIntervalMillis.plus(now()).toNumber();

    return {
      unstakedUnlockTimeMillis,
      currentBalance,
    };
  }, [
    accountStakingState,
    protocolTokenDecimals,
    stakingState?.unstakeUnlockTimeIntervalMillis,
  ]);

  // Mutation
  const executeUnstakeV2Vrtx = useExecuteUnstakeVrtx();
  const unstakeV1VrtxMutation = executeUnstakeV2Vrtx.mutateAsync;

  const { isLoading: isTxLoading, isSuccess: isTxSuccessful } =
    useOnChainMutationStatus({
      mutationStatus: executeUnstakeV2Vrtx.status,
      txHash: executeUnstakeV2Vrtx.data,
    });

  useRunWithDelayOnCondition({
    condition: isTxSuccessful,
    fn: hide,
  });

  const unstakeAll = useCallback(() => {
    if (!currentBalance) {
      return;
    }

    const txHashPromise = unstakeV1VrtxMutation({
      amount: addDecimals(currentBalance, protocolTokenDecimals).toFixed(),
    });

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Unstake V1 VRTX Failed',
        executionData: { txHashPromise },
      },
    });
  }, [
    unstakeV1VrtxMutation,
    dispatchNotification,
    currentBalance,
    protocolTokenDecimals,
  ]);

  // Action button state
  const buttonState = useMemo((): BaseActionButtonState => {
    if (isTxSuccessful) {
      return 'success';
    } else if (isTxLoading) {
      return 'loading';
    } else if (currentBalance?.isZero()) {
      return 'disabled';
    } else {
      return 'idle';
    }
  }, [isTxSuccessful, isTxLoading, currentBalance]);

  return {
    buttonState,
    currentBalance,
    unstakeAll,
    protocolTokenSymbol,
    protocolTokenIconSrc,
    unstakedUnlockTimeMillis,
  };
}
