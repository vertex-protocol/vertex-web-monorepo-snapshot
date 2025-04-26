import { QUOTE_PRODUCT_ID, VLP_PRODUCT_ID } from '@vertex-protocol/contracts';
import { KNOWN_PRODUCT_IDS } from '../knownProductIds';
import { SpotProductMetadata } from '../types';
import { VLP_TOKEN_INFO } from '../vlpTokenInfo';
import { USDC_SONIC, USDC_SONIC_TESTNET, VLP_SONIC_TESTNET, WS_SONIC, WS_SONIC_TESTNET, } from './tokens';

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
  [KNOWN_PRODUCT_IDS.wS]: {
    token: WS_SONIC,
    marketName: 'wS-USDC',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
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
  [KNOWN_PRODUCT_IDS.wS]: {
    token: WS_SONIC_TESTNET,
    marketName: 'wS-USDC',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
  [VLP_PRODUCT_ID]: {
    token: VLP_SONIC_TESTNET,
    marketName: VLP_TOKEN_INFO.symbol,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
};
