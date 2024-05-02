import { nativeTokenConstant } from '@0xsquid/sdk/dist/constants';
import { ChainType, Token as SquidToken } from '@0xsquid/squid-types';
import { useEVMContext } from '@vertex-protocol/web-data';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useSquidSDK } from 'client/modules/collateral/bridge/hooks/base/useSquidSDK';
import {
  BridgeChain,
  BridgeToken,
  DestinationBridgeChain,
  DestinationBridgeToken,
} from 'client/modules/collateral/bridge/types';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { groupBy, some } from 'lodash';
import { useMemo } from 'react';

interface Data {
  // Chain ID -> Chain Data. Does not include the primary chain (ex. Arbitrum)
  sourceChains: Record<number, BridgeChain>;
  // The primary (i.e. destination) chain to bridge to
  destinationChain: DestinationBridgeChain;
}

/**
 * Returns all supported chains & bridges
 */
export function useBridgeData() {
  const squidSDK = useSquidSDK();
  const { supportedChains, primaryChain } = useEVMContext();
  const { data: marketsStaticData } = useAllMarketsStaticData();

  return useMemo((): Data | undefined => {
    if (!squidSDK || !marketsStaticData) {
      return;
    }

    const chains = squidSDK.chains;
    const tokens = squidSDK.tokens;

    const tokensByChainId = groupBy(tokens, (token) => token.chainId);

    const sourceChains: Record<number, BridgeChain> = {};
    let destinationChain: DestinationBridgeChain | undefined;

    chains.forEach((chain) => {
      // Only support EVM chains
      if (chain.chainType !== ChainType.EVM) {
        return;
      }

      const isSupportedChain = some(
        supportedChains,
        (supportedChain) => supportedChain.id === Number(chain.chainId),
      );
      if (!isSupportedChain) {
        return;
      }

      const tokens = tokensByChainId[chain.chainId] ?? [];
      if (!tokens.length) {
        // Some chains don't have any available tokens to bridge
        return;
      }

      const baseChainData: Omit<BridgeChain, 'tokens'> = {
        chainId: Number(chain.chainId),
        externalIconUrl: chain.chainIconURI,
        chainName: chain.networkName,
        squidChainName: chain.axelarChainName,
      };

      // We also want the destination chain in the source chains list to enable same-chain swaps
      sourceChains[baseChainData.chainId] = {
        ...baseChainData,
        tokens: tokens.map(toBridgeToken),
      };

      // Destination chain (i.e. where Vertex is deployed)
      if (baseChainData.chainId === primaryChain.id) {
        const spotProducts = [
          marketsStaticData.quote,
          ...Object.values(marketsStaticData.spot),
        ];

        const destinationTokens = spotProducts
          .map((product): DestinationBridgeToken | undefined => {
            const squidToken = tokens.find(
              (token) =>
                token.address.toLowerCase() ===
                product.metadata.token.address.toLowerCase(),
            );

            if (!squidToken) {
              return;
            }

            return {
              ...toBridgeToken(squidToken),
              vertexProduct: product,
            };
          })
          .filter(nonNullFilter);

        destinationChain = {
          ...baseChainData,
          tokens: destinationTokens,
        };
      }
    });

    if (!destinationChain) {
      console.warn(
        '[useBridgeData] Destination chain not found',
        chains,
        tokens,
      );
      return;
    }

    return {
      destinationChain,
      sourceChains,
    };
  }, [marketsStaticData, primaryChain.id, squidSDK, supportedChains]);
}

function toBridgeToken(token: SquidToken): BridgeToken {
  return {
    address: token.address,
    isNativeToken: token.address === nativeTokenConstant,
    oraclePriceUsd: token.usdPrice,
    chainId: Number(token.chainId),
    tokenDecimals: token.decimals,
    externalIconUrl: token.logoURI,
    name: token.name,
    symbol: token.symbol,
  };
}
