import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { SpotProductMetadata } from '../types';
import { USDC_SONIC, USDC_SONIC_TESTNET } from './tokens';

/**
 * Sonic
 */

export const SONIC_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  [QUOTE_PRODUCT_ID]: {
    token: USDC_SONIC,
    marketName: '',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
  // [KNOWN_PRODUCT_IDS.wS]: {
  //   token: WS_SONIC,
  //   marketName: 'wS-USDC',
  //   quoteProductId: QUOTE_PRODUCT_ID,
  //   marketCategories: new Set(['spot', 'chain']),
  // },
};

/**
 * Sonic Testnet
 */

export const SONIC_TESTNET_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  [QUOTE_PRODUCT_ID]: {
    token: USDC_SONIC_TESTNET,
    marketName: '',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
};
