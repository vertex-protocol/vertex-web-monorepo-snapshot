import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import {
  USDC_HARDHAT,
  WBTC_HARDHAT,
  WETH_HARDHAT,
} from 'common/productMetadata/local/tokens';
import {
  WBTC_SPOT_MARKET_DETAILS,
  WETH_SPOT_MARKET_DETAILS,
} from 'common/productMetadata/marketDetailsMetadata';
import { NOOP_MARKET_DETAILS } from 'common/productMetadata/noopMetadata';
import { SpotProductMetadata } from 'common/productMetadata/types';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';

export const HARDHAT_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  0: {
    token: USDC_HARDHAT,
    marketName: '',
    marketDetails: NOOP_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  1: {
    token: WBTC_HARDHAT,
    marketName: `wBTC-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    marketDetails: WBTC_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  3: {
    token: WETH_HARDHAT,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    marketDetails: WETH_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
};
