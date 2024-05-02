import {
  USDC_HARDHAT,
  WBTC_HARDHAT,
  WETH_HARDHAT,
} from 'common/productMetadata/local/tokens';
import {
  WBTC_SPOT_MARKET_DETAILS,
  WETH_SPOT_MARKET_DETAILS,
} from 'common/productMetadata/marketDetailsMetadata';
import { PRIMARY_QUOTE_SYMBOL } from 'common/productMetadata/primaryQuoteSymbol';
import { SpotProductMetadata } from 'common/productMetadata/types';

export const HARDHAT_SPOT_METADATA_BY_PRODUCT_ID: Record<
  number,
  SpotProductMetadata
> = {
  0: {
    token: USDC_HARDHAT,
    marketName: '',
    marketDetails: {
      description: '',
      subtitle: '',
      cmcLink: '',
    },
  },
  1: {
    token: WBTC_HARDHAT,
    marketName: `wBTC-${PRIMARY_QUOTE_SYMBOL}`,
    marketDetails: WBTC_SPOT_MARKET_DETAILS,
  },
  3: {
    token: WETH_HARDHAT,
    marketName: `wETH-${PRIMARY_QUOTE_SYMBOL}`,
    marketDetails: WETH_SPOT_MARKET_DETAILS,
  },
};
