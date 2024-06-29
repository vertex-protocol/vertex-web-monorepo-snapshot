import toast from 'react-hot-toast';
import { AcceptReferralNotification } from '../components/referrals/AcceptReferralNotification';
import { AcceptReferralNotificationData } from '../types';

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
