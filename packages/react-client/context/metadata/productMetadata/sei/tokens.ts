import { sei, seiTestnet } from 'viem/chains';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';
import { TOKEN_ICONS } from '../tokenIcons';
import { Token } from '../types';
import { VLP_TOKEN_INFO } from '../vlpTokenInfo';

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

export const VLP_SEI_TESTNET: Token = {
  address: '0xAa9E9F9b4e45a090c5be4a3d1985623DC947Bef5',
  chainId: seiTestnetChainId,
  tokenDecimals: 18,
  symbol: VLP_TOKEN_INFO.symbol,
  icon: TOKEN_ICONS.vlp,
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
