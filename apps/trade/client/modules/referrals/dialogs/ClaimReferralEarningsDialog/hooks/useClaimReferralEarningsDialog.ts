import { removeDecimals } from '@vertex-protocol/client';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useFuulReferralsContext } from 'client/modules/referrals/context/FuulReferralsContext';
import { useExecuteClaimReferralRewards } from 'client/modules/referrals/hooks/execute/useExecuteClaimReferralRewards';
import { useAddressOnChainReferralRewards } from 'client/modules/referrals/hooks/query/useAddressOnChainReferralRewards';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useCallback, useMemo } from 'react';

export function useClaimReferralEarningsDialog() {
  const { dispatchNotification } = useNotificationManagerContext();
  const { hide } = useDialog();

  const { payoutToken } = useFuulReferralsContext();
  const { data: onChainReferralRewardsData } =
    useAddressOnChainReferralRewards();

  const executeClaimReferralRewards = useExecuteClaimReferralRewards();

  useRunWithDelayOnCondition({
    condition: executeClaimReferralRewards.isSuccess,
    fn: hide,
  });

  const buttonState = useMemo((): BaseActionButtonState => {
    if (executeClaimReferralRewards.isPending) {
      return 'loading';
    }
    if (executeClaimReferralRewards.isSuccess) {
      return 'success';
    }
    return 'idle';
  }, [
    executeClaimReferralRewards.isPending,
    executeClaimReferralRewards.isSuccess,
  ]);

  const onSubmit = useCallback(() => {
    if (!onChainReferralRewardsData) {
      console.warn(
        '[useClaimReferralEarningsDialog] No on-chain referrals data, unable to claim',
      );
      return;
    }

    const txResponsePromise = executeClaimReferralRewards.mutateAsync({
      amount: onChainReferralRewardsData.availableToClaim,
    });

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Claim Referral Rewards Failed',
        executionData: { txResponsePromise },
      },
    });
  }, [
    dispatchNotification,
    executeClaimReferralRewards,
    onChainReferralRewardsData,
  ]);

  return {
    buttonState,
    onSubmit,
    claimableRewardsUsdc: removeDecimals(
      onChainReferralRewardsData?.availableToClaim,
      payoutToken.tokenDecimals,
    ),
    payoutToken,
  };
}
