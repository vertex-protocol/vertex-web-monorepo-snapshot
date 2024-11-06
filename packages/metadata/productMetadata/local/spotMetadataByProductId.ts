import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { USDC_HARDHAT, WBTC_HARDHAT, WETH_HARDHAT } from '../local/tokens';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';
import { SpotProductMetadata } from '../types';

export const HARDHAT_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  [QUOTE_PRODUCT_ID]: {
    token: USDC_HARDHAT,
    marketName: '',
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot']),
  },
  1: {
    token: WBTC_HARDHAT,
    marketName: `wBTC-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
  3: {
    token: WETH_HARDHAT,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOLS.usdc}`,
    quoteProductId: QUOTE_PRODUCT_ID,
    marketCategories: new Set(['spot', 'chain']),
  },
};
