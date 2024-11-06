import { seiTestnet, sei } from 'viem/chains';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';
import { TOKEN_ICONS } from '../tokenIcons';
import { Token } from '../types';

const seiTestnetChainId = seiTestnet.id;
const seiChainId = sei.id;

/**
 * Sei Testnet
 */

export const USDC_SEI_TESTNET: Token = {
  address: '0x3f6e2955C365ba36cC5D5d74a3edc4CD470ad2C4',
  chainId: seiTestnetChainId,
  tokenDecimals: 6,
  symbol: PRIMARY_QUOTE_SYMBOLS.usdc,
  icon: TOKEN_ICONS.usdc,
};

export const WSEI_SEI_TESTNET: Token = {
  address: '0x01a477ecd1E35830b0fB967EC648E1Ed680f05fD',
  chainId: seiTestnetChainId,
  tokenDecimals: 18,
  symbol: 'wSEI',
  icon: TOKEN_ICONS.sei,
};

/**
 * Sei
 */

export const USDC_SEI: Token = {
  address: '0x3894085Ef7Ff0f0aeDf52E2A2704928d1Ec074F1',
  chainId: seiChainId,
  tokenDecimals: 6,
  symbol: PRIMARY_QUOTE_SYMBOLS.usdc,
  icon: TOKEN_ICONS.usdc,
};

export const WSEI_SEI: Token = {
  address: '0xE30feDd158A2e3b13e9badaeABaFc5516e95e8C7',
  chainId: seiChainId,
  tokenDecimals: 18,
  symbol: 'wSEI',
  icon: TOKEN_ICONS.sei,
};
