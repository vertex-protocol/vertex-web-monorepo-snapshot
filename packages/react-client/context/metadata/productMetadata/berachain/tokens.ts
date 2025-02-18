import { berachain, berachainTestnetbArtio } from 'wagmi/chains';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';
import { TOKEN_ICONS } from '../tokenIcons';
import { Token } from '../types';

const berachainTestnetChainId = berachainTestnetbArtio.id;
const berachainChainId = berachain.id;

/**
 * Berachain bArtio Testnet
 */

export const HONEY_BERACHAIN_TESTNET: Token = {
  address: '0xa7fcb606611358afa388b6bd23b3b2f2c6abed82',
  chainId: berachainTestnetChainId,
  tokenDecimals: 18,
  symbol: PRIMARY_QUOTE_SYMBOLS.honey,
  icon: TOKEN_ICONS.honey,
};

/**
 * Berachain
 */

export const HONEY_BERACHAIN: Token = {
  address: '0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce',
  chainId: berachainChainId,
  tokenDecimals: 18,
  symbol: PRIMARY_QUOTE_SYMBOLS.honey,
  icon: TOKEN_ICONS.honey,
};
