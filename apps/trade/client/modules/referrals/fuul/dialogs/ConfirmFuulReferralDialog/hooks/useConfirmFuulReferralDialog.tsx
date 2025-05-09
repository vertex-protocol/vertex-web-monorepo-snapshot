import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useFuulReferralsContext } from 'client/modules/referrals/fuul/FuulReferralsContext';
import { useExecuteAcceptFuulReferral } from 'client/modules/referrals/fuul/hooks/execute/useExecuteAcceptFuulReferral';
import { useAddressFuulReferralCode } from 'client/modules/referrals/fuul/hooks/query/useAddressFuulReferralCode';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useCallback, useMemo } from 'react';

export function useConfirmFuulReferralDialog() {
  const { dispatchNotification } = useNotificationManagerContext();
  const { referralCodeForSession, setReferralCodeForSession } =
    useFuulReferralsContext();

  const { data: addressReferralCodeData } = useAddressFuulReferralCode();
  const executeAcceptReferral = useExecuteAcceptFuulReferral();

  const confirmButtonState = useMemo((): BaseActionButtonState => {
    if (executeAcceptReferral.isPending) {
      return 'loading';
    }
    if (executeAcceptReferral.isSuccess) {
      return 'success';
    }
    return 'idle';
  }, [executeAcceptReferral.isPending, executeAcceptReferral.isSuccess]);

  const onConfirmReferral = useCallback(async () => {
    if (!referralCodeForSession) {
      console.warn(
        '[useConfirmFuulReferralDialog] No referral code to confirm',
      );
      return;
    }

    const serverExecutionResult = executeAcceptReferral.mutateAsync(
      {
        referralCode: referralCodeForSession,
      },
      {
        onSuccess: () => {
          // Set the confirmable referral code to undefined to avoid showing confirm referral button again.
          setReferralCodeForSession(undefined);
        },
      },
    );

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Confirm Referral Failed',
        executionData: {
          serverExecutionResult,
        },
      },
    });
  }, [
    dispatchNotification,
    executeAcceptReferral,
    referralCodeForSession,
    setReferralCodeForSession,
  ]);

  return {
    onConfirmReferral,
    confirmButtonState,
    referralCodeForSession,
    referralCodeForCurrentUser: addressReferralCodeData?.referralCode,
  };
}
