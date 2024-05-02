import { MarketDetailsMetadata } from 'common/productMetadata/marketDetailsMetadata';
import { TOKEN_ICONS } from 'common/productMetadata/tokenIcons';
import { Token } from 'common/productMetadata/types';
import { ZeroAddress } from 'ethers';

export const NOOP_TOKEN: Token = {
  address: ZeroAddress,
  chainId: 0,
  icon: TOKEN_ICONS.usdc,
  name: '',
  symbol: '',
  tokenDecimals: 18,
};

export const NOOP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: '',
  description: '',
  cmcLink: '',
};
