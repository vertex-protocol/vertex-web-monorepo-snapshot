import { KNOWN_PRODUCT_IDS } from '@vertex-protocol/react-client';
import { FeatureNotificationDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { SpotMarketFeatureNotification } from 'client/modules/notifications/components/newFeature/features/SpotMarketFeatureNotification';
import { toast } from 'react-hot-toast';

export async function handleFeatureNotificationDispatch(
  feature: FeatureNotificationDisclosureKey,
) {
  switch (feature) {
    case 'ws_feb_21':
      return toast.custom(
        (t) => (
          <SpotMarketFeatureNotification
            visible={t.visible}
            onDismiss={() => {
              toast.dismiss(t.id);
            }}
            ttl={Infinity}
            disclosureKey={feature}
            productId={KNOWN_PRODUCT_IDS.wS}
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
    //     (t) => (
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
