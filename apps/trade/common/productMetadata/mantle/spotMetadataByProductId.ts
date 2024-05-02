import {
  USDC_MANTLE_SEPOLIA,
  USDT_MANTLE_SEPOLIA,
  WETH_MANTLE_SEPOLIA,
} from 'common/productMetadata/mantle/tokens';
import {
  USDT_SPOT_MARKET_DETAILS,
  WETH_SPOT_MARKET_DETAILS,
} from 'common/productMetadata/marketDetailsMetadata';
import { NOOP_MARKET_DETAILS } from 'common/productMetadata/noopMetadata';
import { PRIMARY_QUOTE_SYMBOL } from 'common/productMetadata/primaryQuoteSymbol';
import { SpotProductMetadata } from 'common/productMetadata/types';

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
  },
  3: {
    token: WETH_MANTLE_SEPOLIA,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOL}`,
    marketDetails: WETH_SPOT_MARKET_DETAILS,
  },
  31: {
    token: USDT_MANTLE_SEPOLIA,
    marketName: `USDT-${PRIMARY_QUOTE_SYMBOL}`,
    marketDetails: USDT_SPOT_MARKET_DETAILS,
  },
};
