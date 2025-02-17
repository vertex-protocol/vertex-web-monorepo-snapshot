import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { SpotProductMetadata } from '../types';
import {
  USDC_SEI_TESTNET,
  WSEI_SEI_TESTNET,
  USDC_SEI,
  WSEI_SEI,
} from '../sei/tokens';
import { KNOWN_PRODUCT_IDS } from '../knownProductIds';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';

/**
 * Sei Testnet
 */

export const SEI_TESTNET_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  [QUOTE_PRODUCT_ID]: {
    token: USDC_SEI_TESTNET,
    marketName: '',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
  [KNOWN_PRODUCT_IDS.wsei]: {
    token: WSEI_SEI_TESTNET,
    marketName: `wSEI-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
};

/**
 * Sei
 */

export const SEI_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  [QUOTE_PRODUCT_ID]: {
    token: USDC_SEI,
    marketName: '',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
  115: {
    token: WSEI_SEI,
    marketName: `wSEI-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
};
