import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useFuulReferralsContext } from 'client/modules/referrals/fuul/FuulReferralsContext';
import { useEffect } from 'react';

export function FuulReferralNotificationsEmitter() {
  const { dispatchNotification } = useNotificationManagerContext();
  const { referralCodeForSession } = useFuulReferralsContext();

  useEffect(() => {
    if (referralCodeForSession) {
      dispatchNotification({
        type: 'accept_fuul_referral',
        data: { referralCode: referralCodeForSession },
      });
    }
  }, [dispatchNotification, referralCodeForSession]);

  return null;
}
