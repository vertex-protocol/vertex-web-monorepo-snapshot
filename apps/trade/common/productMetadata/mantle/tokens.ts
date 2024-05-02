import { mantleSepoliaTestnet } from '@wagmi/core/chains';
import { PRIMARY_QUOTE_SYMBOL } from 'common/productMetadata/primaryQuoteSymbol';
import { TOKEN_ICONS } from 'common/productMetadata/tokenIcons';
import { Token } from 'common/productMetadata/types';

const mantleSepoliaChainId = mantleSepoliaTestnet.id;

/**
 * Mantle Sepolia
 */

export const USDC_MANTLE_SEPOLIA: Token = {
  address: '0xa7fcb606611358afa388b6bd23b3b2f2c6abed82',
  chainId: mantleSepoliaChainId,
  tokenDecimals: 6,
  name: 'USD Coin',
  symbol: PRIMARY_QUOTE_SYMBOL,
  icon: TOKEN_ICONS.usdc,
};

export const WETH_MANTLE_SEPOLIA: Token = {
  address: '0x94b3173e0a23c28b2ba9a52464ac24c2b032791c',
  chainId: mantleSepoliaChainId,
  tokenDecimals: 18,
  name: 'Wrapped Ethereum',
  symbol: 'wETH',
  icon: TOKEN_ICONS.weth,
};

export const USDT_MANTLE_SEPOLIA: Token = {
  address: '0x0881faabdddecf1b4c3d5331df33c13a1b6589ea',
  chainId: mantleSepoliaChainId,
  tokenDecimals: 6,
  name: 'Tether USD',
  symbol: 'USDT',
  icon: TOKEN_ICONS.usdt,
};
