import { base, baseSepolia } from 'viem/chains';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';
import { TOKEN_ICONS } from '../tokenIcons';
import { Token } from '../types';

/**
 * Base
 */

export const USDC_BASE: Token = {
  address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
  chainId: base.id,
  tokenDecimals: 6,
  symbol: PRIMARY_QUOTE_SYMBOLS.usdc,
  icon: TOKEN_ICONS.usdc,
};

export const WETH_BASE: Token = {
  address: '0x4200000000000000000000000000000000000006',
  chainId: base.id,
  tokenDecimals: 18,
  symbol: 'wETH',
  icon: TOKEN_ICONS.weth,
};

export const BENJI_BASE: Token = {
  address: '0xBC45647eA894030a4E9801Ec03479739FA2485F0',
  chainId: base.id,
  tokenDecimals: 18,
  symbol: 'BENJI',
  icon: TOKEN_ICONS.benji,
};

export const HARRISWIN_BASE: Token = {
  address: '0xFBAC82A384178cA5dd6DF72965d0e65b1b8A028f',
  chainId: base.id,
  tokenDecimals: 18,
  symbol: 'HARRISWIN',
  icon: TOKEN_ICONS.harrisWin,
};

export const TRUMPWIN_BASE: Token = {
  address: '0xE215D028551d1721c6b61675aEc501B1224Bd0a1',
  chainId: base.id,
  tokenDecimals: 18,
  symbol: 'TRUMPWIN',
  icon: TOKEN_ICONS.trumpWin,
};

/**
 * Base Sepolia
 */

export const USDC_BASE_SEPOLIA: Token = {
  address: '0xbc47901f4d2c5fc871ae0037ea05c3f614690781',
  chainId: baseSepolia.id,
  tokenDecimals: 6,
  symbol: PRIMARY_QUOTE_SYMBOLS.usdc,
  icon: TOKEN_ICONS.usdc,
};

export const WETH_BASE_SEPOLIA: Token = {
  address: '0xa7fcb606611358afa388b6bd23b3b2f2c6abed82',
  chainId: baseSepolia.id,
  tokenDecimals: 18,
  symbol: 'wETH',
  icon: TOKEN_ICONS.weth,
};

export const BENJI_BASE_SEPOLIA: Token = {
  address: '0x45F131DCBeE8Af674CC653AFF26C27e2423c5348',
  chainId: baseSepolia.id,
  tokenDecimals: 18,
  symbol: 'BENJI',
  icon: TOKEN_ICONS.benji,
};

export const HARRISWIN_BASE_SEPOLIA: Token = {
  address: '0x0DF28A292398A71CDe24A53E45e7336292d0a911',
  chainId: baseSepolia.id,
  tokenDecimals: 18,
  symbol: 'HARRISWIN',
  icon: TOKEN_ICONS.harrisWin,
};

export const TRUMPWIN_BASE_SEPOLIA: Token = {
  address: '0x182Ca233257B5a90FC858821A5eF7195cA8b060A',
  chainId: baseSepolia.id,
  tokenDecimals: 18,
  symbol: 'TRUMPWIN',
  icon: TOKEN_ICONS.trumpWin,
};
