import { sonic, sonicTestnet } from 'viem/chains';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';
import { TOKEN_ICONS } from '../tokenIcons';
import { Token } from '../types';
import { VLP_TOKEN_INFO } from '../vlpTokenInfo';

/**
 * Sonic
 */

export const USDC_SONIC: Token = {
  address: '0x29219dd400f2Bf60E5a23d13Be72B486D4038894',
  chainId: sonic.id,
  tokenDecimals: 6,
  symbol: PRIMARY_QUOTE_SYMBOLS.usdc,
  icon: TOKEN_ICONS.usdc,
};

export const WS_SONIC: Token = {
  address: '0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38',
  chainId: sonic.id,
  tokenDecimals: 18,
  symbol: 'wS',
  icon: TOKEN_ICONS.s,
};

/**
 * Sonic Testnet
 */

export const USDC_SONIC_TESTNET: Token = {
  address: '0xbC47901f4d2C5fc871ae0037Ea05c3F614690781',
  chainId: sonicTestnet.id,
  tokenDecimals: 6,
  symbol: PRIMARY_QUOTE_SYMBOLS.usdc,
  icon: TOKEN_ICONS.usdc,
};

export const WS_SONIC_TESTNET: Token = {
  address: '0x524685e1381B0180A12578A66777736cfDF59a58',
  chainId: sonicTestnet.id,
  tokenDecimals: 18,
  symbol: 'wS',
  icon: TOKEN_ICONS.s,
};

export const VLP_SONIC_TESTNET: Token = {
  address: '0x3031a3717D6B0166ee2e6e21DEB4aC49EdDba6F0',
  chainId: sonicTestnet.id,
  tokenDecimals: 18,
  symbol: VLP_TOKEN_INFO.symbol,
  icon: TOKEN_ICONS.vlp,
};
