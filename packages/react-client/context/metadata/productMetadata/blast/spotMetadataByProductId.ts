import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import {
  BLAST_BLAST,
  BLAST_BLAST_SEPOLIA,
  USDB_BLAST,
  USDB_BLAST_SEPOLIA,
  USDT_BLAST_SEPOLIA,
  WETH_BLAST,
  WETH_BLAST_SEPOLIA,
} from '../blast/tokens';
import { KNOWN_PRODUCT_IDS } from '../knownProductIds';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';
import { SpotProductMetadata } from '../types';

/**
 * Blast Sepolia
 */

export const BLAST_TESTNET_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  [QUOTE_PRODUCT_ID]: {
    token: USDB_BLAST_SEPOLIA,
    marketName: '',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
  [KNOWN_PRODUCT_IDS.wethBlastSepolia]: {
    token: WETH_BLAST_SEPOLIA,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOLS.usdb}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
  31: {
    token: USDT_BLAST_SEPOLIA,
    marketName: `USDT-${PRIMARY_QUOTE_SYMBOLS.usdb}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
  [KNOWN_PRODUCT_IDS.blast]: {
    token: BLAST_BLAST_SEPOLIA,
    marketName: `BLAST-${PRIMARY_QUOTE_SYMBOLS.usdb}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
};

/**
 * Blast mainnet
 */

export const BLAST_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  [QUOTE_PRODUCT_ID]: {
    token: USDB_BLAST,
    marketName: '',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
  [KNOWN_PRODUCT_IDS.wethBlast]: {
    token: WETH_BLAST,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOLS.usdb}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
  [KNOWN_PRODUCT_IDS.blast]: {
    token: BLAST_BLAST,
    marketName: `BLAST-${PRIMARY_QUOTE_SYMBOLS.usdb}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
};
