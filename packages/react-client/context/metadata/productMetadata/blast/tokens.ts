import { blast, blastSepolia } from 'viem/chains';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';
import { TOKEN_ICONS } from '../tokenIcons';
import { Token } from '../types';

const blastSepoliaChainId = blastSepolia.id;
const blastMainnetChainId = blast.id;

/**
 * Blast Sepolia
 */

export const USDB_BLAST_SEPOLIA: Token = {
  address: '0xbc47901f4d2c5fc871ae0037ea05c3f614690781',
  chainId: blastSepoliaChainId,
  tokenDecimals: 6,
  symbol: PRIMARY_QUOTE_SYMBOLS.usdb,
  icon: TOKEN_ICONS.usdb,
};

export const WETH_BLAST_SEPOLIA: Token = {
  address: '0xa7fcb606611358afa388b6bd23b3b2f2c6abed82',
  chainId: blastSepoliaChainId,
  tokenDecimals: 18,
  symbol: 'wETH',
  icon: TOKEN_ICONS.weth,
};

export const USDT_BLAST_SEPOLIA: Token = {
  address: '0x94b3173e0a23c28b2ba9a52464ac24c2b032791c',
  chainId: blastSepoliaChainId,
  tokenDecimals: 6,
  symbol: 'USDT',
  icon: TOKEN_ICONS.usdt,
};

export const BLAST_BLAST_SEPOLIA: Token = {
  address: '0x4B9d2AD8c5655e6B3471BCfd5234281653F08b37',
  chainId: blastSepoliaChainId,
  tokenDecimals: 18,
  symbol: 'BLAST',
  icon: TOKEN_ICONS.blast,
};

/**
 * Blast Mainnet
 */

export const USDB_BLAST: Token = {
  address: '0x4300000000000000000000000000000000000003',
  chainId: blastMainnetChainId,
  tokenDecimals: 18,
  symbol: PRIMARY_QUOTE_SYMBOLS.usdb,
  icon: TOKEN_ICONS.usdb,
};

export const WETH_BLAST: Token = {
  address: '0x4300000000000000000000000000000000000004',
  chainId: blastMainnetChainId,
  tokenDecimals: 18,
  symbol: 'wETH',
  icon: TOKEN_ICONS.weth,
};

export const BLAST_BLAST: Token = {
  address: '0xb1a5700fA2358173Fe465e6eA4Ff52E36e88E2ad',
  chainId: blastMainnetChainId,
  tokenDecimals: 18,
  symbol: 'BLAST',
  icon: TOKEN_ICONS.blast,
};
