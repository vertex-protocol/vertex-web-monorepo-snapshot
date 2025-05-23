import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { removeDecimals } from '@vertex-protocol/utils';
import { useExecuteClaimAndStakeLiquidTokens } from 'client/hooks/execute/vrtxToken/useExecuteClaimAndStakeLiquidTokens';
import { useExecuteClaimLiquidTokens } from 'client/hooks/execute/vrtxToken/useExecuteClaimLiquidTokens';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useAccountStakingV2State } from 'client/hooks/query/vrtxToken/useAccountStakingV2State';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { ClaimAndStakeRadioID } from 'client/modules/rewards/dialogs/ClaimTradingRewardsDialog/ClaimAndStakeRadioGroup';
import { ClaimTradingRewardsDialogParams } from 'client/modules/rewards/dialogs/ClaimTradingRewardsDialog/types';
import { BaseClaimAndStakeHookReturn } from 'client/modules/rewards/dialogs/types';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useCallback, useMemo, useState } from 'react';

export function useClaimTradingRewardsDialog({
  epochNumber,
  claimableRewards,
}: ClaimTradingRewardsDialogParams): BaseClaimAndStakeHookReturn {
  const { dispatchNotification } = useNotificationManagerContext();
  const { data: accountStakingV2State } = useAccountStakingV2State();
  const { protocolTokenMetadata, primaryQuoteToken } =
    useVertexMetadataContext();
  const { hide } = useDialog();

  const [selectedRadioId, setSelectedRadioId] =
    useState<ClaimAndStakeRadioID>();

  // Mutations
  const executeClaimAndStake = useExecuteClaimAndStakeLiquidTokens();
  const executeClaim = useExecuteClaimLiquidTokens();

  const execute =
    selectedRadioId === 'claim_and_stake' ? executeClaimAndStake : executeClaim;

  // On chain receipt status
  const { isLoading, isSuccess } = useOnChainMutationStatus({
    mutationStatus: execute.status,
    txHash: execute.data,
  });

  useRunWithDelayOnCondition({
    condition: isSuccess,
    fn: hide,
  });

  const hasClaimableRewards = claimableRewards?.gt(0);

  // Current & estimated staking amounts
  const { currentAmountStaked, estimatedAmountStaked } = useMemo(() => {
    const currentAmountStaked = removeDecimals(
      accountStakingV2State?.currentBalance,
      protocolTokenMetadata.token.tokenDecimals,
    );

    if (!currentAmountStaked || !claimableRewards) {
      return {
        currentAmountStaked,
        estimatedAmountStaked: currentAmountStaked,
      };
    }

    return {
      currentAmountStaked,
      estimatedAmountStaked: claimableRewards.plus(currentAmountStaked),
    };
  }, [
    claimableRewards,
    protocolTokenMetadata.token.tokenDecimals,
    accountStakingV2State?.currentBalance,
  ]);

  // Action button state
  const actionButtonState = useMemo((): BaseActionButtonState => {
    if (isSuccess) {
      return 'success';
    } else if (isLoading) {
      return 'loading';
      // Disable the submit button if the user hasn't selected a radio button.
      // Briefly after the success state, `hasClaimableRewards` can be false.
      // So we need to check for that race condition as well.
    } else if (!selectedRadioId || !hasClaimableRewards) {
      return 'disabled';
    } else {
      return 'idle';
    }
  }, [isSuccess, isLoading, selectedRadioId, hasClaimableRewards]);

  const onSubmit = useCallback(() => {
    const txHashPromise = execute.mutateAsync({
      claimAll: true,
      epoch: epochNumber,
    });

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Claim and Stake Failed',
        executionData: { txHashPromise },
      },
    });
  }, [epochNumber, dispatchNotification, execute]);

  return {
    selectedRadioId,
    currentAmountStaked,
    estimatedAmountStaked,
    actionButtonState,
    protocolTokenSymbol: protocolTokenMetadata.token.symbol,
    usdcSymbol: primaryQuoteToken.symbol,
    disableRadioButtons:
      !hasClaimableRewards || actionButtonState === 'loading',
    setSelectedRadioId,
    onSubmit,
    onClose: hide,
  };
}
