import { removeDecimals } from '@vertex-protocol/client';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useFuulReferralsContext } from 'client/modules/referrals/fuul/FuulReferralsContext';
import { useExecuteClaimFuulReferralRewards } from 'client/modules/referrals/fuul/hooks/execute/useExecuteClaimFuulReferralRewards';
import { useAddressOnChainFuulReferralRewards } from 'client/modules/referrals/fuul/hooks/query/useAddressOnChainFuulReferralRewards';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useCallback, useMemo } from 'react';

export function useClaimFuulReferralEarningsDialog() {
  const { dispatchNotification } = useNotificationManagerContext();
  const { hide } = useDialog();

  const { payoutToken } = useFuulReferralsContext();
  const { data: onChainReferralRewardsData } =
    useAddressOnChainFuulReferralRewards();

  const executeClaimReferralRewards = useExecuteClaimFuulReferralRewards();

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
        '[useClaimFuulReferralEarningsDialog] No on-chain referrals data, unable to claim',
      );
      return;
    }

    const txHashPromise = executeClaimReferralRewards.mutateAsync({
      amount: onChainReferralRewardsData.availableToClaim,
    });

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Claim Referral Rewards Failed',
        executionData: { txHashPromise },
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
