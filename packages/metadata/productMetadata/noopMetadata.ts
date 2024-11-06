import { TOKEN_ICONS } from './tokenIcons';
import { Token } from './types';
import { ZeroAddress } from 'ethers';

export const NOOP_TOKEN: Token = {
  address: ZeroAddress,
  chainId: 0,
  icon: TOKEN_ICONS.usdc,
  symbol: '',
  tokenDecimals: 18,
};
