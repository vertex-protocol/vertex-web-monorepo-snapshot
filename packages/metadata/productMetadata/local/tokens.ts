import { hardhat } from 'viem/chains';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';
import { TOKEN_ICONS } from '../tokenIcons';
import { Token } from '../types';
import { VRTX_TOKEN_INFO } from '../vertexTokenInfo';
import { ZeroAddress } from 'ethers';

const hardhatChainId = hardhat.id;

export const USDC_HARDHAT: Token = {
  address: ZeroAddress,
  chainId: hardhatChainId,
  tokenDecimals: 6,
  symbol: PRIMARY_QUOTE_SYMBOLS.usdc,
  icon: TOKEN_ICONS.usdc,
};

export const WBTC_HARDHAT: Token = {
  address: ZeroAddress,
  chainId: hardhatChainId,
  tokenDecimals: 18,
  symbol: 'wBTC',
  icon: TOKEN_ICONS.wbtc,
};

export const WETH_HARDHAT: Token = {
  address: ZeroAddress,
  chainId: hardhatChainId,
  tokenDecimals: 18,
  symbol: 'wETH',
  icon: TOKEN_ICONS.weth,
};

export const VRTX_HARDHAT: Token = {
  address: ZeroAddress,
  chainId: hardhatChainId,
  tokenDecimals: 18,
  ...VRTX_TOKEN_INFO,
};
