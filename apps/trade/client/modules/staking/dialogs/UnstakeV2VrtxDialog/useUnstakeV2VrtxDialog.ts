import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { BigDecimals, removeDecimals } from '@vertex-protocol/utils';
import { useExecuteUnstakeV2Vrtx } from 'client/hooks/execute/vrtxToken/useExecuteUnstakeV2Vrtx';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useAccountStakingV2State } from 'client/hooks/query/vrtxToken/useAccountStakingV2State';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { millisecondsInDay } from 'date-fns/constants';
import { now } from 'lodash';
import { useCallback, useMemo, useState } from 'react';

export type UnstakeRadioId = 'instant' | 'standard';

export function useUnstakeV2VrtxDialog() {
  const {
    protocolTokenMetadata: {
      token: {
        tokenDecimals: protocolTokenDecimals,
        symbol: protocolTokenSymbol,
        icon: { asset: protocolTokenIconSrc },
      },
    },
  } = useVertexMetadataContext();
  const { data: accountStakingV2State } = useAccountStakingV2State();
  const { dispatchNotification } = useNotificationManagerContext();
  const { hide } = useDialog();

  const [selectedRadioId, setSelectedRadioId] =
    useState<UnstakeRadioId>('standard');

  const {
    currentBalance,
    instantUnstakeReceivedAmountFraction,
    instantUnstakeBurnAmountFraction,
    instantAmountToReceive,
    availableToUnstakeTimeMillis,
    unstakedLockPeriodDays,
  } = useMemo(() => {
    const currentBalance = removeDecimals(
      accountStakingV2State?.currentBalance,
      protocolTokenDecimals,
    );

    const instantUnstakeBurnAmountFraction = removeDecimals(
      accountStakingV2State?.toDistributeRatio.plus(
        accountStakingV2State.toTreasuryRatio,
      ),
    );

    const instantUnstakeReceivedAmountFraction = (() => {
      if (!instantUnstakeBurnAmountFraction) {
        return undefined;
      }

      return BigDecimals.ONE.minus(instantUnstakeBurnAmountFraction);
    })();

    const instantAmountToReceive = (() => {
      if (!instantUnstakeReceivedAmountFraction) {
        return undefined;
      }

      return currentBalance?.multipliedBy(instantUnstakeReceivedAmountFraction);
    })();

    return {
      currentBalance,
      instantUnstakeBurnAmountFraction,
      instantUnstakeReceivedAmountFraction,
      instantAmountToReceive,
      unstakedLockPeriodDays:
        accountStakingV2State?.unstakedLockPeriodMillis?.dividedBy(
          millisecondsInDay,
        ),
      availableToUnstakeTimeMillis:
        accountStakingV2State?.availableToUnstakeTimeMillis?.toNumber(),
    };
  }, [accountStakingV2State, protocolTokenDecimals]);

  // Mutation
  const executeUnstakeV1Vrtx = useExecuteUnstakeV2Vrtx();
  const unstakeV2VrtxMutation = executeUnstakeV1Vrtx.mutateAsync;

  const { isLoading: isTxLoading, isSuccess: isTxSuccessful } =
    useOnChainMutationStatus({
      mutationStatus: executeUnstakeV1Vrtx.status,
      txResponse: executeUnstakeV1Vrtx.data,
    });

  useRunWithDelayOnCondition({
    condition: isTxSuccessful,
    fn: hide,
  });

  const unstakeAll = useCallback(() => {
    const txResponsePromise = unstakeV2VrtxMutation({
      instant: selectedRadioId === 'instant',
    });

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Unstake VRTX Failed',
        executionData: { txResponsePromise },
      },
    });
  }, [unstakeV2VrtxMutation, dispatchNotification, selectedRadioId]);

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

  const disableButtons = currentBalance?.isZero() || isTxLoading;

  return {
    buttonState,
    currentBalance,
    instantAmountToReceive,
    selectedRadioId,
    setSelectedRadioId,
    protocolTokenSymbol,
    protocolTokenIconSrc,
    instantUnstakeBurnAmountFraction,
    instantUnstakeReceivedAmountFraction,
    disableButtons,
    unstakedLockPeriodDays,
    availableToUnstakeTimeMillis,
    showErrorPanel:
      !!accountStakingV2State?.availableToUnstakeTimeMillis?.gt(now()) &&
      selectedRadioId === 'instant',
    unstakeAll,
  };
}
