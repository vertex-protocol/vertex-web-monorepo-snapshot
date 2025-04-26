import { QUOTE_PRODUCT_ID, VLP_PRODUCT_ID } from '@vertex-protocol/contracts';
import { KNOWN_PRODUCT_IDS } from '../knownProductIds';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';
import {
  USDC_SEI,
  USDC_SEI_TESTNET,
  VLP_SEI_TESTNET,
  WSEI_SEI,
  WSEI_SEI_TESTNET,
} from '../sei/tokens';
import { SpotProductMetadata } from '../types';
import { VLP_TOKEN_INFO } from '../vlpTokenInfo';

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
  [VLP_PRODUCT_ID]: {
    token: VLP_SEI_TESTNET,
    marketName: VLP_TOKEN_INFO.symbol,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
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
