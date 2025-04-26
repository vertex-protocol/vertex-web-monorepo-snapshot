import { QUOTE_PRODUCT_ID, VLP_PRODUCT_ID } from '@vertex-protocol/contracts';
import { KNOWN_PRODUCT_IDS } from '../knownProductIds';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';
import { SpotProductMetadata } from '../types';
import { VLP_TOKEN_INFO } from '../vlpTokenInfo';
import { USDC_AVAX, USDC_AVAX_TESTNET, VLP_AVAX_TESTNET, WAVAX_AVAX, WAVAX_AVAX_TESTNET, } from './tokens';

/**
 * Avax
 */

export const AVAX_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  [QUOTE_PRODUCT_ID]: {
    token: USDC_AVAX,
    marketName: '',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
  [KNOWN_PRODUCT_IDS.wavax]: {
    token: WAVAX_AVAX,
    marketName: `wAVAX-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
};

/**
 * Avax Testnet
 */

export const AVAX_TESTNET_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  [QUOTE_PRODUCT_ID]: {
    token: USDC_AVAX_TESTNET,
    marketName: '',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
  [KNOWN_PRODUCT_IDS.wavax]: {
    token: WAVAX_AVAX_TESTNET,
    marketName: `wAVAX-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
  [VLP_PRODUCT_ID]: {
    token: VLP_AVAX_TESTNET,
    marketName: VLP_TOKEN_INFO.symbol,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
};
