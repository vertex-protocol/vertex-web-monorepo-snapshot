import { localSdkConfig } from '@vertex-protocol/web-data';
import { hardhat } from '@wagmi/core/chains';
import { PRIMARY_QUOTE_SYMBOL } from 'common/productMetadata/primaryQuoteSymbol';
import { TOKEN_ICONS } from 'common/productMetadata/tokenIcons';
import { Token } from 'common/productMetadata/types';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import { ZeroAddress } from 'ethers';

const hardhatChainId = hardhat.id;

export const USDC_HARDHAT: Token = {
  address: localSdkConfig.spotProducts['USDC'].address.toLowerCase(),
  chainId: hardhatChainId,
  tokenDecimals: localSdkConfig.spotProducts['USDC'].decimals,
  name: 'USD Coin',
  symbol: PRIMARY_QUOTE_SYMBOL,
  icon: TOKEN_ICONS.usdc,
};

export const WBTC_HARDHAT: Token = {
  address: localSdkConfig.spotProducts['WBTC'].address.toLowerCase(),
  chainId: hardhatChainId,
  tokenDecimals: localSdkConfig.spotProducts['WBTC'].decimals,
  name: 'Wrapped Bitcoin',
  symbol: 'wBTC',
  icon: TOKEN_ICONS.wbtc,
};

export const WETH_HARDHAT: Token = {
  address: localSdkConfig.spotProducts['WETH'].address.toLowerCase(),
  chainId: hardhatChainId,
  tokenDecimals: localSdkConfig.spotProducts['WETH'].decimals,
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
