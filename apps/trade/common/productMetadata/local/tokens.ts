import { hardhat } from '@wagmi/core/chains';
import { TOKEN_ICONS } from 'common/productMetadata/tokenIcons';
import { Token } from 'common/productMetadata/types';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import { ZeroAddress } from 'ethers';
import { PRIMARY_QUOTE_SYMBOLS } from '../primaryQuoteSymbols';

const hardhatChainId = hardhat.id;

export const USDC_HARDHAT: Token = {
  address: ZeroAddress,
  chainId: hardhatChainId,
  tokenDecimals: 6,
  name: 'USD Coin',
  symbol: PRIMARY_QUOTE_SYMBOLS.usdc,
  icon: TOKEN_ICONS.usdc,
};

export const WBTC_HARDHAT: Token = {
  address: ZeroAddress,
  chainId: hardhatChainId,
  tokenDecimals: 18,
  name: 'Wrapped Bitcoin',
  symbol: 'wBTC',
  icon: TOKEN_ICONS.wbtc,
};

export const WETH_HARDHAT: Token = {
  address: ZeroAddress,
  chainId: hardhatChainId,
  tokenDecimals: 18,
  name: 'Wrapped Ethereum',
  symbol: 'wETH',
  icon: TOKEN_ICONS.weth,
};

export const VRTX_HARDHAT: Token = {
  address: ZeroAddress,
  chainId: hardhatChainId,
  tokenDecimals: 18,
  ...VRTX_TOKEN_INFO,
};
