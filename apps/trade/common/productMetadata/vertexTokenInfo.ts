import { Token } from 'common/productMetadata/types';
import { TOKEN_ICONS } from './tokenIcons';

export const VRTX_TOKEN_INFO: Pick<Token, 'name' | 'symbol' | 'icon'> = {
  name: 'VRTX',
  symbol: 'VRTX',
  icon: TOKEN_ICONS.vrtx,
};

export const VOVRTX_INFO: Pick<Token, 'symbol' | 'icon'> = {
  symbol: 'voVRTX',
  icon: TOKEN_ICONS.vovrtx,
};
