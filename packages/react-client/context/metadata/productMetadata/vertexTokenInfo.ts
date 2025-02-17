import { TOKEN_ICONS } from './tokenIcons';
import { Token } from './types';

export const VRTX_TOKEN_INFO: Pick<Token, 'symbol' | 'icon'> = {
  symbol: 'VRTX',
  icon: TOKEN_ICONS.vrtx,
};

export const VOVRTX_INFO: Pick<Token, 'symbol' | 'icon'> = {
  symbol: 'voVRTX',
  icon: TOKEN_ICONS.vovrtx,
};
