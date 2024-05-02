import { ChainName } from '@0xsquid/squid-types';
import { BigDecimalish } from '@vertex-protocol/utils';
import { SpotStaticMarketData } from 'client/hooks/markets/useAllMarketsStaticData';

export interface BridgeToken {
  chainId: number;
  isNativeToken: boolean;
  oraclePriceUsd: number | undefined;
  address: string;
  name: string;
  symbol: string;
  // Decimals of the ERC20 contract, not the number of decimals of the Vertex product
  tokenDecimals: number;
  // A remote URL, should NOT be used with Next.js images
  externalIconUrl: string | undefined;
}

export interface BridgeChain {
  chainId: number;
  // A remote URL, should NOT be used with Next.js images
  externalIconUrl: string;
  chainName: string;
  squidChainName: ChainName;
  tokens: BridgeToken[];
}

// This also contains metadata for the corresponding spot product on Vertex
export interface DestinationBridgeToken extends BridgeToken {
  vertexProduct: SpotStaticMarketData;
}

export interface DestinationBridgeChain extends BridgeChain {
  tokens: DestinationBridgeToken[];
}

export interface BridgeRequestParams {
  sourceToken: BridgeToken;
  destinationToken: DestinationBridgeToken;
  // Without decimals (i.e. 0.01)
  amount: BigDecimalish;
  referralCode?: string;
}
