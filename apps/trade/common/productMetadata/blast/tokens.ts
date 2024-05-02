import { blast, blastSepolia } from '@wagmi/core/chains';
import { PRIMARY_QUOTE_SYMBOL } from 'common/productMetadata/primaryQuoteSymbol';
import { TOKEN_ICONS } from 'common/productMetadata/tokenIcons';
import { Token } from 'common/productMetadata/types';

const blastSepoliaChainId = blastSepolia.id;
const blastMainnetChainId = blast.id;

/**
 * Blast Sepolia
 */

export const USDB_BLAST_SEPOLIA: Token = {
  address: '0xbc47901f4d2c5fc871ae0037ea05c3f614690781',
  chainId: blastSepoliaChainId,
  tokenDecimals: 6,
  name: 'USDB',
  symbol: PRIMARY_QUOTE_SYMBOL,
  icon: TOKEN_ICONS.usdb,
};

export const WETH_BLAST_SEPOLIA: Token = {
  address: '0xa7fcb606611358afa388b6bd23b3b2f2c6abed82',
  chainId: blastSepoliaChainId,
  tokenDecimals: 18,
  name: 'Wrapped Ethereum',
  symbol: 'wETH',
  icon: TOKEN_ICONS.weth,
};

export const USDT_BLAST_SEPOLIA: Token = {
  address: '0x94b3173e0a23c28b2ba9a52464ac24c2b032791c',
  chainId: blastSepoliaChainId,
  tokenDecimals: 6,
  name: 'Tether USD',
  symbol: 'USDT',
  icon: TOKEN_ICONS.usdt,
};

/**
 * Blast Mainnet
 */

export const USDB_BLAST: Token = {
  address: '0x4300000000000000000000000000000000000003',
  chainId: blastMainnetChainId,
  tokenDecimals: 18,
  name: 'USDB',
  symbol: PRIMARY_QUOTE_SYMBOL,
  icon: TOKEN_ICONS.usdb,
};

export const WETH_BLAST: Token = {
  address: '0x4300000000000000000000000000000000000004',
  chainId: blastMainnetChainId,
  tokenDecimals: 18,
  name: 'Wrapped Ethereum',
  symbol: 'wETH',
  icon: TOKEN_ICONS.weth,
};
