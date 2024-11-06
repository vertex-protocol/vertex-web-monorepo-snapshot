import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import {
  BRETT_PERP_METADATA,
  DEGEN_PERP_METADATA,
  GOAT_PERP_METADATA,
  PRIMARY_QUOTE_SYMBOLS,
  SCR_PERP_METADATA,
  SpotProductMetadata,
  USDT_ARB_ONE,
} from '@vertex-protocol/metadata';
import { NewFeatureDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { PerpMarketsFeatureNotification } from 'client/modules/notifications/components/newFeature/features/PerpMarketsFeatureNotification';
import { toast } from 'react-hot-toast';

export async function handleNewFeatureNotificationDispatch(
  feature: NewFeatureDisclosureKey,
) {
  switch (feature) {
    // Example new mkt notification
    case 'new_markets_oct_31':
      return toast.custom(
        (t) => (
          <PerpMarketsFeatureNotification
            visible={t.visible}
            onDismiss={() => {
              toast.dismiss(t.id);
            }}
            ttl={Infinity}
            disclosureKey={feature}
            markets={NEW_PERP_MARKETS_METADATA}
          />
        ),
        {
          duration: Infinity,
          id: feature,
        },
      );
  }
}

// Kind of a hack, but we can leave this here for easy addition of new market notifications
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NEW_SPOT_PRODUCT_ID = 31;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NEW_SPOT_METADATA: SpotProductMetadata = {
  marketName: `USDT-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
  token: USDT_ARB_ONE,
  quoteProductId: QUOTE_PRODUCT_ID,
  marketCategories: new Set(['spot']),
};

const NEW_PERP_MARKETS_METADATA = [
  SCR_PERP_METADATA,
  DEGEN_PERP_METADATA,
  GOAT_PERP_METADATA,
  BRETT_PERP_METADATA,
];
