import { avalanche, avalancheFuji } from 'wagmi/chains';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';
import { TOKEN_ICONS } from '../tokenIcons';
import { Token } from '../types';
import { VLP_TOKEN_INFO } from '../vlpTokenInfo';

/**
 * Avax
 */

export const USDC_AVAX: Token = {
  address: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
  chainId: avalanche.id,
  tokenDecimals: 6,
  symbol: PRIMARY_QUOTE_SYMBOLS.usdc,
  icon: TOKEN_ICONS.usdc,
};

export const WAVAX_AVAX: Token = {
  address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
  chainId: avalanche.id,
  tokenDecimals: 18,
  symbol: 'wAVAX',
  icon: TOKEN_ICONS.avax,
};

/**
 * Abstract Testnet
 */

export const USDC_AVAX_TESTNET: Token = {
  address: '0x94B3173E0a23C28b2BA9a52464AC24c2B032791c',
  chainId: avalancheFuji.id,
  tokenDecimals: 6,
  symbol: PRIMARY_QUOTE_SYMBOLS.usdc,
  icon: TOKEN_ICONS.usdc,
};

export const WAVAX_AVAX_TESTNET: Token = {
  address: '0xd32ea1c76ef1c296f131dd4c5b2a0aac3b22485a',
  chainId: avalancheFuji.id,
  tokenDecimals: 18,
  symbol: 'wAVAX',
  icon: TOKEN_ICONS.avax,
};

export const VLP_AVAX_TESTNET: Token = {
  address: '0x7a108f067e4E18Bea0D454E325adDEF1867ea881',
  chainId: avalancheFuji.id,
  tokenDecimals: 18,
  symbol: VLP_TOKEN_INFO.symbol,
  icon: TOKEN_ICONS.vlp,
};
