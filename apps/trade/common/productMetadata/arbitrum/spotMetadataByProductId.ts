import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
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
} from 'common/productMetadata/arbitrum/tokens';
import {
  ARB_SPOT_MARKET_DETAILS,
  USDT_SPOT_MARKET_DETAILS,
  VRTX_SPOT_MARKET_DETAILS,
  WBTC_SPOT_MARKET_DETAILS,
  WETH_SPOT_MARKET_DETAILS,
} from 'common/productMetadata/marketDetailsMetadata';
import { NOOP_MARKET_DETAILS } from 'common/productMetadata/noopMetadata';
import { SpotProductMetadata } from 'common/productMetadata/types';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';

/**
 * Arb Sepolia
 */

export const ARB_SEPOLIA_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  0: {
    token: USDC_ARB_SEPOLIA,
    marketName: '',
    marketDetails: NOOP_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  1: {
    token: WBTC_ARB_SEPOLIA,
    marketName: `wBTC-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    marketDetails: WBTC_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  3: {
    token: WETH_ARB_SEPOLIA,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    marketDetails: WETH_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  5: {
    token: ARB_ARB_SEPOLIA,
    marketName: `ARB-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    marketDetails: ARB_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  31: {
    token: USDT_ARB_SEPOLIA,
    marketName: `USDT-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    marketDetails: USDT_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  41: {
    token: VRTX_ARB_SEPOLIA,
    marketName: `VRTX-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    marketDetails: VRTX_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
};

/**
 * Arb One
 */

export const ARB_ONE_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  0: {
    token: USDC_ARB_ONE,
    marketName: '',
    marketDetails: NOOP_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  1: {
    token: WBTC_ARB_ONE,
    marketName: `wBTC-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    marketDetails: WBTC_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  3: {
    token: WETH_ARB_ONE,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    marketDetails: WETH_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  5: {
    token: ARB_ARB_ONE,
    marketName: `ARB-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    marketDetails: ARB_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  31: {
    token: USDT_ARB_ONE,
    marketName: `USDT-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    marketDetails: USDT_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  41: {
    token: VRTX_ARB_ONE,
    marketName: `VRTX-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    marketDetails: VRTX_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
};
