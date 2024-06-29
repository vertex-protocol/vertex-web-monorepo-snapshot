import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { NewFeatureDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { OneClickTradingNotification } from 'client/modules/notifications/components/newFeature/features/OneClickTradingNotification';
import { USDT_ARB_ONE } from 'common/productMetadata/arbitrum/tokens';
import { USDT_SPOT_MARKET_DETAILS } from 'common/productMetadata/marketDetailsMetadata';
import { PRIMARY_QUOTE_SYMBOLS } from 'common/productMetadata/primaryQuoteSymbols';
import { SpotProductMetadata } from 'common/productMetadata/types';
import { toast } from 'react-hot-toast';
import { ArbNewIncentivesNotification } from '../components/newFeature/features/ArbNewIncentivesNotification';
import { MantleNewIncentivesNotification } from '../components/newFeature/features/MantleNewIncentivesNotification';

export async function handleNewFeatureNotificationDispatch(
  feature: NewFeatureDisclosureKey,
) {
  switch (feature) {
    /* [REMOVING NEW MARKET NOTIFICATION]
    // Example new mkt notification
    case 'new_markets_may_24':
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
      */
    case 'arb_new_incentives':
      return toast.custom(
        (t) => (
          <ArbNewIncentivesNotification
            visible={t.visible}
            ttl={Infinity}
            disclosureKey={feature}
            onDismiss={() => toast.dismiss(t.id)}
          />
        ),
        { duration: Infinity, id: feature },
      );
    case 'mantle_new_incentives':
      return toast.custom(
        (t) => (
          <MantleNewIncentivesNotification
            visible={t.visible}
            ttl={Infinity}
            disclosureKey={feature}
            onDismiss={() => toast.dismiss(t.id)}
          />
        ),
        { duration: Infinity, id: feature },
      );
    case 'one_click_trading':
      return toast.custom(
        (t) => (
          <OneClickTradingNotification
            visible={t.visible}
            ttl={Infinity}
            disclosureKey={feature}
            onDismiss={() => toast.dismiss(t.id)}
          />
        ),
        { duration: Infinity, id: feature },
      );
  }
}

// Kind of a hack, but we can leave this here for easy addition of new market notifications
const NEW_SPOT_PRODUCT_ID = 31;
const NEW_SPOT_METADATA: SpotProductMetadata = {
  marketName: `USDT-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
  token: USDT_ARB_ONE,
  marketDetails: USDT_SPOT_MARKET_DETAILS,
  hasLpPool: true,
  quoteProductId: QUOTE_PRODUCT_ID,
};

/* [REMOVING NEW MARKET NOTIFICATION]
const NEW_PERP_MARKETS_METADATA = [
  TON_PERP_METADATA,
  WIF_PERP_METADATA,
  FTM_PERP_METADATA,
  ONDO_PERP_METADATA,
  MNT_PERP_METADATA,
  ENA_PERP_METADATA,
];
*/
