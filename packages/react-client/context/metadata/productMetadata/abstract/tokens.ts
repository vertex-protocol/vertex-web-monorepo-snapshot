import { abstract, abstractTestnet } from 'wagmi/chains';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';
import { TOKEN_ICONS } from '../tokenIcons';
import { Token } from '../types';
import { VLP_TOKEN_INFO } from '../vlpTokenInfo';

/**
 * Abstract
 */

export const USDC_ABSTRACT: Token = {
  address: '0x84A71ccD554Cc1b02749b35d22F684CC8ec987e1',
  chainId: abstract.id,
  tokenDecimals: 6,
  symbol: PRIMARY_QUOTE_SYMBOLS.usdce,
  icon: TOKEN_ICONS.usdc,
};

/**
 * Abstract Testnet
 */

export const USDC_ABSTRACT_TESTNET: Token = {
  address: '0xbf9ac1Bff961F513fc26ba2734cB0aB371FD27e7',
  chainId: abstractTestnet.id,
  tokenDecimals: 6,
  symbol: PRIMARY_QUOTE_SYMBOLS.usdce,
  icon: TOKEN_ICONS.usdc,
};

export const VLP_ABSTRACT_TESTNET: Token = {
  address: '0x220F2aa85a6eB5C72999482eeAE030a9357a0B95',
  chainId: abstractTestnet.id,
  tokenDecimals: 18,
  symbol: VLP_TOKEN_INFO.symbol,
  icon: TOKEN_ICONS.vlp,
};
