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
import { PRIMARY_QUOTE_SYMBOL } from 'common/productMetadata/primaryQuoteSymbol';
import { SpotProductMetadata } from 'common/productMetadata/types';

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
  },
  3: {
    token: WETH_BLAST_SEPOLIA,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOL}`,
    marketDetails: WETH_SPOT_MARKET_DETAILS,
  },
  31: {
    token: USDT_BLAST_SEPOLIA,
    marketName: `USDT-${PRIMARY_QUOTE_SYMBOL}`,
    marketDetails: USDT_SPOT_MARKET_DETAILS,
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
    marketDetails: {
      description: '',
      subtitle: '',
      cmcLink: '',
    },
  },
  91: {
    token: WETH_BLAST,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOL}`,
    marketDetails: WETH_SPOT_MARKET_DETAILS,
  },
};
