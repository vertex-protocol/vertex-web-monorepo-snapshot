import { AcceptReferralNotification } from 'client/modules/notifications/components/referrals/AcceptReferralNotification';
import { AcceptReferralNotificationData } from 'client/modules/notifications/types';
import toast from 'react-hot-toast';

export async function handleAcceptReferralNotificationDispatch(
  data: AcceptReferralNotificationData,
) {
  return toast.custom(
    (t) => (
      <AcceptReferralNotification
        visible={t.visible}
        onDismiss={() => {
          toast.dismiss(t.id);
        }}
        ttl={Infinity}
        referralCode={data.referralCode}
      />
    ),
    {
      duration: Infinity,
      id: `accept_referral_${data.referralCode}`,
    },
  );
}
