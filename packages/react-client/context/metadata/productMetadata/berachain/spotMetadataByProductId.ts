import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { SpotProductMetadata } from '../types';
import { HONEY_BERACHAIN, HONEY_BERACHAIN_TESTNET } from './tokens';

/**
 * Berachain
 */

export const BERACHAIN_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  [QUOTE_PRODUCT_ID]: {
    token: HONEY_BERACHAIN,
    marketName: '',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
};

/**
 * Berachain Testnet
 */

export const BERACHAIN_TESTNET_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  [QUOTE_PRODUCT_ID]: {
    token: HONEY_BERACHAIN_TESTNET,
    marketName: '',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
};
