import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
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
} from 'common/productMetadata/mantle/tokens';
import {
  METH_SPOT_MARKET_DETAILS,
  USDT_SPOT_MARKET_DETAILS,
  WETH_SPOT_MARKET_DETAILS,
  WMNT_SPOT_MARKET_DETAILS,
} from 'common/productMetadata/marketDetailsMetadata';
import { NOOP_MARKET_DETAILS } from 'common/productMetadata/noopMetadata';
import { SpotProductMetadata } from 'common/productMetadata/types';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';

/**
 * Mantle Sepolia
 */

export const MANTLE_SEPOLIA_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  0: {
    token: USDC_MANTLE_SEPOLIA,
    marketName: '',
    marketDetails: NOOP_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  3: {
    token: WETH_MANTLE_SEPOLIA,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    marketDetails: WETH_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  31: {
    token: USDT_MANTLE_SEPOLIA,
    marketName: `USDT-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    marketDetails: USDT_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  109: {
    token: WMNT_MANTLE_SEPOLIA,
    marketName: `wMNT-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    marketDetails: WMNT_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  111: {
    token: METH_MANTLE_SEPOLIA,
    marketName: `mETH-wETH`,
    marketDetails: METH_SPOT_MARKET_DETAILS,
    hasLpPool: false,
    // wETH as quote, 3 on testnet
    quoteProductId: 3,
  },
};

/**
 * Mantle
 */

export const MANTLE_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  0: {
    token: USDC_MANTLE,
    marketName: '',
    marketDetails: NOOP_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  93: {
    token: WETH_MANTLE,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    marketDetails: WETH_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  109: {
    token: WMNT_MANTLE,
    marketName: `wMNT-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    marketDetails: WMNT_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  111: {
    token: METH_MANTLE,
    marketName: `mETH-wETH`,
    marketDetails: METH_SPOT_MARKET_DETAILS,
    hasLpPool: false,
    // wETH as quote, 93 on mainnet
    quoteProductId: 93,
  },
};
