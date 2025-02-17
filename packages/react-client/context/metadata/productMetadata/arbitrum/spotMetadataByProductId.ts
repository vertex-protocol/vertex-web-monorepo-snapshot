import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { KNOWN_PRODUCT_IDS } from '../knownProductIds';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';
import { SpotProductMetadata } from '../types';
import {
  ARB_ARB_ONE,
  ARB_ARB_SEPOLIA,
  USDC_ARB_ONE,
  USDC_ARB_SEPOLIA,
  USDT_ARB_ONE,
  USDT_ARB_SEPOLIA,
  VRTX_ARB_ONE,
  VRTX_ARB_SEPOLIA,
  WBTC_ARB_ONE,
  WBTC_ARB_SEPOLIA,
  WETH_ARB_ONE,
  WETH_ARB_SEPOLIA,
  WSTETH_ARB_ONE,
  WSTETH_ARB_SEPOLIA,
} from './tokens';

/**
 * Arb Sepolia
 */

export const ARB_TESTNET_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  [QUOTE_PRODUCT_ID]: {
    token: USDC_ARB_SEPOLIA,
    marketName: '',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
  1: {
    token: WBTC_ARB_SEPOLIA,
    marketName: `wBTC-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
  [KNOWN_PRODUCT_IDS.wethArb]: {
    token: WETH_ARB_SEPOLIA,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
  5: {
    token: ARB_ARB_SEPOLIA,
    marketName: `ARB-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
  31: {
    token: USDT_ARB_SEPOLIA,
    marketName: `USDT-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
  41: {
    token: VRTX_ARB_SEPOLIA,
    marketName: `VRTX-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'defi']),
  },
  149: {
    token: WSTETH_ARB_SEPOLIA,
    marketName: `wstETH-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
};

/**
 * Arb One
 */

export const ARB_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  [QUOTE_PRODUCT_ID]: {
    token: USDC_ARB_ONE,
    marketName: '',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
  1: {
    token: WBTC_ARB_ONE,
    marketName: `wBTC-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
  [KNOWN_PRODUCT_IDS.wethArb]: {
    token: WETH_ARB_ONE,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
  5: {
    token: ARB_ARB_ONE,
    marketName: `ARB-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
  31: {
    token: USDT_ARB_ONE,
    marketName: `USDT-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
  41: {
    token: VRTX_ARB_ONE,
    marketName: `VRTX-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'defi']),
  },
  149: {
    token: WSTETH_ARB_ONE,
    marketName: `wstETH-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
};
