import { ChainName } from '@0xsquid/squid-types';
import { BigDecimalish } from '@vertex-protocol/utils';
import { SelectValueWithIdentifier } from '@vertex-protocol/web-ui';
import { SpotStaticMarketData } from 'client/hooks/markets/marketsStaticData/types';

export interface BridgeTokenSelectValue extends SelectValueWithIdentifier {
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

export interface BridgeChainSelectValue extends SelectValueWithIdentifier {
  chainId: number;
  // A remote URL, should NOT be used with Next.js images
  externalIconUrl: string;
  chainName: string;
  squidChainName: ChainName;
  tokens: BridgeTokenSelectValue[];
}

// This also contains metadata for the corresponding spot product on Vertex
export interface DestinationBridgeTokenSelectValue
  extends BridgeTokenSelectValue,
    SelectValueWithIdentifier {
  vertexProduct: SpotStaticMarketData;
}

export interface DestinationBridgeChainSelectValue
  extends BridgeChainSelectValue {
  tokens: DestinationBridgeTokenSelectValue[];
}

export interface BridgeRequestParams {
  sourceToken: BridgeTokenSelectValue;
  destinationToken: DestinationBridgeTokenSelectValue;
  // Without decimals (i.e. 0.01)
  amount: BigDecimalish;
  referralCode?: string;
}
