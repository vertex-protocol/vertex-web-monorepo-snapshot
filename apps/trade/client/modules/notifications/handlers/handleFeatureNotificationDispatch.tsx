import { FeatureNotificationDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { PendingDelistFeatureNotification } from 'client/modules/notifications/components/newFeature/features/PendingDelistFeatureNotification';
import { PerpMarketFeatureNotification } from 'client/modules/notifications/components/newFeature/features/PerpMarketFeatureNotification';
import { Toast, toast } from 'react-hot-toast';

export async function handleFeatureNotificationDispatch(
  feature: FeatureNotificationDisclosureKey,
) {
  switch (feature) {
    case 'feb_13_delisting':
      return toast.custom(
        (t: Toast['message']) => (
          <PendingDelistFeatureNotification
            visible={t.visible}
            onDismiss={() => {
              toast.dismiss(t.id);
            }}
            ttl={Infinity}
            disclosureKey={feature}
          />
        ),
        {
          duration: Infinity,
          id: feature,
        },
      );
    case 'bera_perp_feb_13':
      return toast.custom(
        (t: Toast['message']) => (
          <PerpMarketFeatureNotification
            visible={t.visible}
            onDismiss={() => {
              toast.dismiss(t.id);
            }}
            ttl={Infinity}
            disclosureKey={feature}
            productId={152}
          />
        ),
        {
          duration: Infinity,
          id: feature,
        },
      );
    // Example new mkt notification
    // case 'trump_perp_jan_19_2025':
    //   return toast.custom(
    //     (t: Toast['message']) => (
    //       <PerpMarketFeatureNotification
    //         visible={t.visible}
    //         onDismiss={() => {
    //           toast.dismiss(t.id);
    //         }}
    //         ttl={Infinity}
    //         disclosureKey={feature}
    //         productId={148}
    //       />
    //     ),
    //     {
    //       duration: Infinity,
    //       id: feature,
    //     },
    //   );
    default:
      break;
  }
}
