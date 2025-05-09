import { mantle, mantleSepoliaTestnet } from 'viem/chains';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';
import { TOKEN_ICONS } from '../tokenIcons';
import { Token } from '../types';
import { VLP_TOKEN_INFO } from '../vlpTokenInfo';

const mantleSepoliaChainId = mantleSepoliaTestnet.id;
const mantleChainId = mantle.id;

/**
 * Mantle Sepolia
 */

export const USDC_MANTLE_SEPOLIA: Token = {
  address: '0xa7fcb606611358afa388b6bd23b3b2f2c6abed82',
  chainId: mantleSepoliaChainId,
  tokenDecimals: 6,
  symbol: PRIMARY_QUOTE_SYMBOLS.usdc,
  icon: TOKEN_ICONS.usdc,
};

export const WETH_MANTLE_SEPOLIA: Token = {
  address: '0x94b3173e0a23c28b2ba9a52464ac24c2b032791c',
  chainId: mantleSepoliaChainId,
  tokenDecimals: 18,
  symbol: 'wETH',
  icon: TOKEN_ICONS.weth,
};

export const USDT_MANTLE_SEPOLIA: Token = {
  address: '0x0881faabdddecf1b4c3d5331df33c13a1b6589ea',
  chainId: mantleSepoliaChainId,
  tokenDecimals: 6,
  symbol: 'USDT',
  icon: TOKEN_ICONS.usdt,
};

export const WMNT_MANTLE_SEPOLIA: Token = {
  address: '0x1dd15eaef59710490b3774b3b8006be0b374cf46',
  chainId: mantleSepoliaChainId,
  tokenDecimals: 18,
  symbol: 'wMNT',
  icon: TOKEN_ICONS.mnt,
};

export const METH_MANTLE_SEPOLIA: Token = {
  address: '0x4bb7f6f89ec78800b6f6eee2261d1b1f96d880dd',
  chainId: mantleSepoliaChainId,
  tokenDecimals: 18,
  symbol: 'mETH',
  icon: TOKEN_ICONS.meth,
};

export const VLP_MANTLE_SEPOLIA: Token = {
  address: '0x7c7344C1D9FF7d5e397143Ec64D8e15c50EF005f',
  chainId: mantleSepoliaChainId,
  tokenDecimals: 18,
  symbol: VLP_TOKEN_INFO.symbol,
  icon: TOKEN_ICONS.vlp,
};

/**
 * Mantle
 */

export const USDC_MANTLE: Token = {
  address: '0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9',
  chainId: mantleChainId,
  tokenDecimals: 6,
  symbol: PRIMARY_QUOTE_SYMBOLS.usdc,
  icon: TOKEN_ICONS.usdc,
};

export const WETH_MANTLE: Token = {
  address: '0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111',
  chainId: mantleChainId,
  tokenDecimals: 18,
  symbol: 'wETH',
  icon: TOKEN_ICONS.weth,
};

export const WMNT_MANTLE: Token = {
  address: '0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8',
  chainId: mantleChainId,
  tokenDecimals: 18,
  symbol: 'wMNT',
  icon: TOKEN_ICONS.mnt,
};

export const METH_MANTLE: Token = {
  address: '0xcDA86A272531e8640cD7F1a92c01839911B90bb0',
  chainId: mantleChainId,
  tokenDecimals: 18,
  symbol: 'mETH',
  icon: TOKEN_ICONS.meth,
};
