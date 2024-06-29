import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import {
  USDB_BLAST,
  USDB_BLAST_SEPOLIA,
  USDT_BLAST_SEPOLIA,
  WETH_BLAST,
  WETH_BLAST_SEPOLIA,
} from 'common/productMetadata/blast/tokens';
import {
  USDT_SPOT_MARKET_DETAILS,
  WETH_SPOT_MARKET_DETAILS,
} from 'common/productMetadata/marketDetailsMetadata';
import { NOOP_MARKET_DETAILS } from 'common/productMetadata/noopMetadata';
import { SpotProductMetadata } from 'common/productMetadata/types';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';

/**
 * Blast Sepolia
 */

export const BLAST_SEPOLIA_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  0: {
    token: USDB_BLAST_SEPOLIA,
    marketName: '',
    marketDetails: NOOP_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  3: {
    token: WETH_BLAST_SEPOLIA,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOLS.usdb}`,
    marketDetails: WETH_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  31: {
    token: USDT_BLAST_SEPOLIA,
    marketName: `USDT-${PRIMARY_QUOTE_SYMBOLS.usdb}`,
    marketDetails: USDT_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
};

/**
 * Blast mainnet
 */

export const BLAST_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  0: {
    token: USDB_BLAST,
    marketName: '',
    marketDetails: NOOP_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
  91: {
    token: WETH_BLAST,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOLS.usdb}`,
    marketDetails: WETH_SPOT_MARKET_DETAILS,
    hasLpPool: true,
    quoteProductId: QUOTE_PRODUCT_ID,
  },
};
