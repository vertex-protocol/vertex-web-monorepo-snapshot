import { NewFeatureDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { USDT_ARB_ONE } from 'common/productMetadata/arbitrum/tokens';
import { USDT_SPOT_MARKET_DETAILS } from 'common/productMetadata/marketDetailsMetadata';
import { PRIMARY_QUOTE_SYMBOL } from 'common/productMetadata/primaryQuoteSymbol';
import { SpotProductMetadata } from 'common/productMetadata/types';

export async function handleNewFeatureNotificationDispatch(
  feature: NewFeatureDisclosureKey,
) {
  // switch (feature) {
  //   // Example new mkt notification
  //   case 'new_markets_feb_1':
  //   return toast.custom(
  //     (t) => (
  //       <PerpMarketsFeatureNotification
  //         visible={t.visible}
  //         onDismiss={() => {
  //           toast.dismiss(t.id);
  //         }}
  //         ttl={Infinity}
  //         disclosureKey={feature}
  //         markets={NEW_PERP_MARKETS_METADATA}
  //       />
  //     ),
  //     {
  //       duration: Infinity,
  //       id: feature,
  //     },
  //   );
  // }
}

// Kind of a hack, but we can leave this here for easy addition of new market notifications
const NEW_SPOT_PRODUCT_ID = 31;
const NEW_SPOT_METADATA: SpotProductMetadata = {
  marketName: `USDT-${PRIMARY_QUOTE_SYMBOL}`,
  token: USDT_ARB_ONE,
  marketDetails: USDT_SPOT_MARKET_DETAILS,
};

const NEW_PERP_MARKETS_METADATA = [];
