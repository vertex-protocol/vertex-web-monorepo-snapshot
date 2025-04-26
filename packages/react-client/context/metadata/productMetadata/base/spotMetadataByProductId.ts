import { QUOTE_PRODUCT_ID, VLP_PRODUCT_ID } from '@vertex-protocol/contracts';
import { KNOWN_PRODUCT_IDS } from '../knownProductIds';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';
import { SpotProductMetadata } from '../types';
import { VLP_TOKEN_INFO } from '../vlpTokenInfo';
import {
  BENJI_BASE,
  BENJI_BASE_SEPOLIA,
  USDC_BASE,
  USDC_BASE_SEPOLIA,
  VLP_BASE_SEPOLIA,
  WETH_BASE,
  WETH_BASE_SEPOLIA,
} from './tokens';

/**
 * Base
 */

export const BASE_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  [QUOTE_PRODUCT_ID]: {
    token: USDC_BASE,
    marketName: '',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
  [KNOWN_PRODUCT_IDS.wethBase]: {
    token: WETH_BASE,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
  119: {
    token: BENJI_BASE,
    marketName: `BENJI-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'meme']),
  },
};

/**
 * Base Sepolia
 */

export const BASE_TESTNET_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  [QUOTE_PRODUCT_ID]: {
    token: USDC_BASE_SEPOLIA,
    marketName: '',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
  [KNOWN_PRODUCT_IDS.wethBase]: {
    token: WETH_BASE_SEPOLIA,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
  119: {
    token: BENJI_BASE_SEPOLIA,
    marketName: `BENJI-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'meme']),
  },
  [VLP_PRODUCT_ID]: {
    token: VLP_BASE_SEPOLIA,
    marketName: VLP_TOKEN_INFO.symbol,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
};
