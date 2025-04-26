import { AcceptFuulReferralNotification } from 'client/modules/notifications/components/AcceptFuulReferralNotification';
import { AcceptFuulReferralNotificationData } from 'client/modules/notifications/types';
import { toast } from 'react-hot-toast';

export async function handleAcceptFuulReferralNotificationDispatch(
  data: AcceptFuulReferralNotificationData,
) {
  return toast.custom(
    (t) => (
      <AcceptFuulReferralNotification
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
