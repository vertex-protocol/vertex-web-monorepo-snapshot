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
