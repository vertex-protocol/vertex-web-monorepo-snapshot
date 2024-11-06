import { arbitrum, arbitrumSepolia } from 'viem/chains';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';
import { TOKEN_ICONS } from '../tokenIcons';
import { Token } from '../types';
import { VRTX_TOKEN_INFO } from '../vertexTokenInfo';

const arbSepoliaChainId = arbitrumSepolia.id;
const arbOneChainId = arbitrum.id;

/**
 * Arbitrum Sepolia
 */

export const USDC_ARB_SEPOLIA: Token = {
  address: '0xd32ea1c76ef1c296f131dd4c5b2a0aac3b22485a',
  chainId: arbSepoliaChainId,
  tokenDecimals: 6,
  symbol: PRIMARY_QUOTE_SYMBOLS.usdc,
  icon: TOKEN_ICONS.usdc,
};

export const WETH_ARB_SEPOLIA: Token = {
  address: '0x94b3173e0a23c28b2ba9a52464ac24c2b032791c',
  chainId: arbSepoliaChainId,
  tokenDecimals: 18,
  symbol: 'wETH',
  icon: TOKEN_ICONS.weth,
};

export const WBTC_ARB_SEPOLIA: Token = {
  address: '0xa7fcb606611358afa388b6bd23b3b2f2c6abed82',
  chainId: arbSepoliaChainId,
  tokenDecimals: 18,
  symbol: 'wBTC',
  icon: TOKEN_ICONS.wbtc,
};

export const ARB_ARB_SEPOLIA: Token = {
  address: '0x0881faabdddecf1b4c3d5331df33c13a1b6589ea',
  chainId: arbSepoliaChainId,
  tokenDecimals: 18,
  symbol: 'ARB',
  icon: TOKEN_ICONS.arb,
};

export const USDT_ARB_SEPOLIA: Token = {
  address: '0xa1c062ddef8f7b0a97e3bb219108ce73410772ce',
  chainId: arbSepoliaChainId,
  tokenDecimals: 6,
  symbol: 'USDT',
  icon: TOKEN_ICONS.usdt,
};

export const VRTX_ARB_SEPOLIA: Token = {
  address: '0x00abca5597d51e6c06ecfa655e73ce70a1e2cdcf',
  chainId: arbSepoliaChainId,
  tokenDecimals: 18,
  ...VRTX_TOKEN_INFO,
};

export const HARRISWIN_ARB_SEPOLIA: Token = {
  address: '0x8B4B178bFFAeF25610234e33550CC401909fFDcD',
  chainId: arbSepoliaChainId,
  tokenDecimals: 18,
  symbol: 'HARRISWIN',
  icon: TOKEN_ICONS.harrisWin,
};

export const TRUMPWIN_ARB_SEPOLIA: Token = {
  address: '0x9661c550CC7D6eb12B08877E7515c72fe262e9dd',
  chainId: arbSepoliaChainId,
  tokenDecimals: 18,
  symbol: 'TRUMPWIN',
  icon: TOKEN_ICONS.trumpWin,
};

/**
 * Arbitrum One
 */

export const USDC_ARB_ONE: Token = {
  address: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
  chainId: arbOneChainId,
  tokenDecimals: 6,
  symbol: PRIMARY_QUOTE_SYMBOLS.usdc,
  icon: TOKEN_ICONS.usdc,
};

export const WETH_ARB_ONE: Token = {
  address: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
  chainId: arbOneChainId,
  tokenDecimals: 18,
  symbol: 'wETH',
  icon: TOKEN_ICONS.weth,
};

export const WBTC_ARB_ONE: Token = {
  address: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
  chainId: arbOneChainId,
  tokenDecimals: 8,
  symbol: 'wBTC',
  icon: TOKEN_ICONS.wbtc,
};

export const ARB_ARB_ONE: Token = {
  address: '0x912ce59144191c1204e64559fe8253a0e49e6548',
  chainId: arbOneChainId,
  tokenDecimals: 18,
  symbol: 'ARB',
  icon: TOKEN_ICONS.arb,
};

export const USDT_ARB_ONE: Token = {
  address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
  chainId: arbOneChainId,
  tokenDecimals: 6,
  symbol: 'USDT',
  icon: TOKEN_ICONS.usdt,
};

export const VRTX_ARB_ONE: Token = {
  address: '0x95146881b86b3ee99e63705ec87afe29fcc044d9',
  chainId: arbOneChainId,
  tokenDecimals: 18,
  ...VRTX_TOKEN_INFO,
};

export const HARRISWIN_ARB_ONE: Token = {
  address: '0xFBAC82A384178cA5dd6DF72965d0e65b1b8A028f',
  chainId: arbOneChainId,
  tokenDecimals: 18,
  symbol: 'HARRISWIN',
  icon: TOKEN_ICONS.harrisWin,
};

export const TRUMPWIN_ARB_ONE: Token = {
  address: '0xE215D028551d1721c6b61675aEc501B1224Bd0a1',
  chainId: arbOneChainId,
  tokenDecimals: 18,
  symbol: 'TRUMPWIN',
  icon: TOKEN_ICONS.trumpWin,
};
