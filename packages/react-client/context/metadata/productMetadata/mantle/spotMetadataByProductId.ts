import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { KNOWN_PRODUCT_IDS } from '../knownProductIds';
import {
  METH_MANTLE,
  METH_MANTLE_SEPOLIA,
  USDC_MANTLE,
  USDC_MANTLE_SEPOLIA,
  USDT_MANTLE_SEPOLIA,
  WETH_MANTLE,
  WETH_MANTLE_SEPOLIA,
  WMNT_MANTLE,
  WMNT_MANTLE_SEPOLIA,
} from '../mantle/tokens';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';
import { SpotProductMetadata } from '../types';

/**
 * Mantle Sepolia
 */

export const MANTLE_TESTNET_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  [QUOTE_PRODUCT_ID]: {
    token: USDC_MANTLE_SEPOLIA,
    marketName: '',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
  [KNOWN_PRODUCT_IDS.wethMantleSepolia]: {
    token: WETH_MANTLE_SEPOLIA,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
  31: {
    token: USDT_MANTLE_SEPOLIA,
    marketName: `USDT-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
  [KNOWN_PRODUCT_IDS.wmnt]: {
    token: WMNT_MANTLE_SEPOLIA,
    marketName: `wMNT-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
  111: {
    token: METH_MANTLE_SEPOLIA,
    marketName: `mETH-wETH`,
    // wETH as quote, 3 on testnet
    quoteProductId: 3,
    marketCategories: new Set(['spot', 'chain']),
  },
};

/**
 * Mantle
 */

export const MANTLE_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  [QUOTE_PRODUCT_ID]: {
    token: USDC_MANTLE,
    marketName: '',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
  [KNOWN_PRODUCT_IDS.wethMantle]: {
    token: WETH_MANTLE,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
  [KNOWN_PRODUCT_IDS.wmnt]: {
    token: WMNT_MANTLE,
    marketName: `wMNT-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
  111: {
    token: METH_MANTLE,
    marketName: `mETH-wETH`,
    // wETH as quote, 93 on mainnet
    quoteProductId: 93,
    marketCategories: new Set(['spot', 'chain']),
  },
};
