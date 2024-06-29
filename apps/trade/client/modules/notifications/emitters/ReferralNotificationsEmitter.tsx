import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useFuulReferralsContext } from 'client/modules/referrals/context/FuulReferralsContext';
import { useEffect } from 'react';

export function ReferralNotificationsEmitter() {
  const { dispatchNotification } = useNotificationManagerContext();
  const { referralCodeForSession } = useFuulReferralsContext();

  useEffect(() => {
    if (referralCodeForSession) {
      dispatchNotification({
        type: 'accept_referral',
        data: { referralCode: referralCodeForSession },
      });
    }
  }, [dispatchNotification, referralCodeForSession]);

  return null;
}
