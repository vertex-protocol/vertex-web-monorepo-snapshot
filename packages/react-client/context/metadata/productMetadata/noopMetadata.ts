import { zeroAddress } from 'viem';
import { TOKEN_ICONS } from './tokenIcons';
import { Token } from './types';

export const NOOP_TOKEN: Token = {
  address: zeroAddress,
  chainId: 0,
  icon: TOKEN_ICONS.usdc,
  symbol: '',
  tokenDecimals: 18,
};
