import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { SpotProductMetadata } from '../types';
import { USDC_ABSTRACT, USDC_ABSTRACT_TESTNET } from './tokens';

/**
 * Abstract
 */

export const ABSTRACT_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  [QUOTE_PRODUCT_ID]: {
    token: USDC_ABSTRACT,
    marketName: '',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
};

/**
 * Abstract Testnet
 */

export const ABSTRACT_TESTNET_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  [QUOTE_PRODUCT_ID]: {
    token: USDC_ABSTRACT_TESTNET,
    marketName: '',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
};
