import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { KNOWN_PRODUCT_IDS } from '../knownProductIds';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';
import { SpotProductMetadata } from '../types';
import {
  BENJI_BASE,
  BENJI_BASE_SEPOLIA,
  HARRISWIN_BASE,
  HARRISWIN_BASE_SEPOLIA,
  TRUMPWIN_BASE,
  TRUMPWIN_BASE_SEPOLIA,
  USDC_BASE,
  USDC_BASE_SEPOLIA,
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
  [KNOWN_PRODUCT_IDS.harrisWinBase]: {
    token: HARRISWIN_BASE,
    marketName: `HARRISWIN-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'prediction']),
  },
  [KNOWN_PRODUCT_IDS.trumpWinBase]: {
    token: TRUMPWIN_BASE,
    marketName: `TRUMPWIN-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'prediction']),
  },
};

/**
 * Base Sepolia
 */

export const BASE_SEPOLIA_SPOT_METADATA_BY_PRODUCT_ID: Record<
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
  [KNOWN_PRODUCT_IDS.harrisWinBase]: {
    token: HARRISWIN_BASE_SEPOLIA,
    marketName: `HARRISWIN-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'prediction']),
  },
  [KNOWN_PRODUCT_IDS.trumpWinBase]: {
    token: TRUMPWIN_BASE_SEPOLIA,
    marketName: `TRUMPWIN-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'prediction']),
  },
};
