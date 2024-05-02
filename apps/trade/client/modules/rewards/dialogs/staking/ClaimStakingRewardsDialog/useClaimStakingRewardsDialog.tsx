import { BigDecimal } from '@vertex-protocol/utils';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useExecuteClaimAndStakeStakingRewards } from 'client/hooks/execute/vrtxToken/useExecuteClaimAndStakeStakingRewards';
import { useExecuteClaimStakingRewards } from 'client/hooks/execute/vrtxToken/useExecuteClaimStakingRewards';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useAccountStakingState } from 'client/hooks/query/vrtxToken/useAccountStakingState';
import { useEstimatedSwapAmountFromStakingRewards } from 'client/hooks/query/vrtxToken/useEstimatedSwapAmountFromStakingRewards';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { safeDiv } from 'client/utils/safeDiv';
import { useCallback, useMemo, useState } from 'react';
import { ClaimAndStakeRadioID } from '../components/StakingRadioGroup';
import { BaseClaimAndStakeHookReturn } from '../types';

interface UseClaimStakingRewardsDialog extends BaseClaimAndStakeHookReturn {
  claimableStakingRewards: BigDecimal | undefined;
  conversionPrice: BigDecimal | undefined;
  canClaimAndStake: boolean;
}

export function useClaimStakingRewardsDialog(): UseClaimStakingRewardsDialog {
  const { dispatchNotification } = useNotificationManagerContext();
  const { data: accountStakingState } = useAccountStakingState();
  const { data: estimatedVrtxSwapAmountWithDecimals } =
    useEstimatedSwapAmountFromStakingRewards();
  const { primaryQuoteToken, protocolToken } = useVertexMetadataContext();
  const { hide } = useDialog();

  const [selectedRadioId, setSelectedRadioId] =
    useState<ClaimAndStakeRadioID>();

  // Mutations
  const executeClaimAndStake = useExecuteClaimAndStakeStakingRewards();
  const executeClaim = useExecuteClaimStakingRewards();

  const execute =
    selectedRadioId === 'claim_and_stake' ? executeClaimAndStake : executeClaim;

  // On chain receipt status
  const { isLoading, isSuccess } = useOnChainMutationStatus({
    mutationStatus: execute.status,
    txResponse: execute.data,
  });

  useRunWithDelayOnCondition({
    condition: isSuccess,
    fn: hide,
  });

  // Estimated output amount of VRTX from USDC swap
  const estimatedVrtxSwapAmount = useMemo(() => {
    return removeDecimals(
      estimatedVrtxSwapAmountWithDecimals,
      protocolToken.tokenDecimals,
    );
  }, [estimatedVrtxSwapAmountWithDecimals, protocolToken.tokenDecimals]);

  // Current amount of claimable USDC rewards
  const claimableStakingRewards = useMemo(() => {
    return removeDecimals(
      accountStakingState?.claimableRewards,
      primaryQuoteToken.tokenDecimals,
    );
  }, [accountStakingState?.claimableRewards, primaryQuoteToken.tokenDecimals]);

  const hasClaimableStakingRewards = claimableStakingRewards?.gt(0);

  // Claim and stake swaps are available for under 5000 USDC
  const canClaimAndStake = Boolean(claimableStakingRewards?.lte(5000));

  // Current & estimated staking amounts
  const { currentAmountStaked, estimatedAmountStaked } = useMemo(() => {
    const currentAmountStaked = removeDecimals(
      accountStakingState?.amountStaked,
      protocolToken.tokenDecimals,
    );

    if (!estimatedVrtxSwapAmount) {
      return {
        currentAmountStaked,
        estimatedAmountStaked: currentAmountStaked,
      };
    }

    return {
      currentAmountStaked,
      estimatedAmountStaked: currentAmountStaked?.plus(estimatedVrtxSwapAmount),
    };
  }, [
    estimatedVrtxSwapAmount,
    protocolToken.tokenDecimals,
    accountStakingState?.amountStaked,
  ]);

  // Conversion price for the estimated VRTX swap amount
  // ex. Estimated VRTX swap amount / claimableStakingRewards = USDC conversion price
  const conversionPrice = useMemo(() => {
    // If there are no claimable rewards, swap estimation gives 0, which isn't a valid representation of the price, so we return undefined
    if (
      !claimableStakingRewards ||
      !estimatedVrtxSwapAmount ||
      claimableStakingRewards.isZero()
    ) {
      return;
    }
    return safeDiv(claimableStakingRewards, estimatedVrtxSwapAmount);
  }, [claimableStakingRewards, estimatedVrtxSwapAmount]);

  // Action button state
  const actionButtonState = useMemo((): BaseActionButtonState => {
    if (isSuccess) {
      return 'success';
    } else if (isLoading) {
      return 'loading';
      // Disable the submit button if the user hasn't selected a radio button.
      // Briefly after the success state, `hasClaimableStakingRewards` can be false.
      // So we need to check for that race condition as well.
    } else if (!selectedRadioId || !hasClaimableStakingRewards) {
      return 'disabled';
    } else {
      return 'idle';
    }
  }, [isSuccess, isLoading, selectedRadioId, hasClaimableStakingRewards]);

  const onSubmit = useCallback(() => {
    const txResponsePromise = execute.mutateAsync({});

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Claim and Stake Failed',
        executionData: { txResponsePromise },
      },
    });
  }, [dispatchNotification, execute]);

  return {
    selectedRadioId,
    conversionPrice,
    canClaimAndStake,
    claimableStakingRewards,
    currentAmountStaked,
    estimatedAmountStaked,
    actionButtonState,
    disableRadioButtons:
      !hasClaimableStakingRewards || actionButtonState === 'loading',
    usdcSymbol: primaryQuoteToken.symbol,
    protocolTokenSymbol: protocolToken.symbol,
    setSelectedRadioId,
    onSubmit,
    onClose: hide,
  };
}
