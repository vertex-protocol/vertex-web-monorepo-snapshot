import { NATIVE_EVM_TOKEN_ADDRESS } from '@0xsquid/sdk/dist/constants';
import { ChainType, Token as SquidToken } from '@0xsquid/squid-types';
import { useEVMContext } from '@vertex-protocol/react-client';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useSquidSDK } from 'client/modules/collateral/bridge/hooks/useSquidSDK';
import {
  BridgeChainSelectValue,
  BridgeTokenSelectValue,
  DestinationBridgeChainSelectValue,
  DestinationBridgeTokenSelectValue,
} from 'client/modules/collateral/bridge/types';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { groupBy, some } from 'lodash';
import { useMemo } from 'react';

interface Data {
  // Chain ID -> Chain Data. Does not include the primary chain (ex. Arbitrum)
  sourceChains: Record<number, BridgeChainSelectValue>;
  // The primary (i.e. destination) chain to bridge to
  destinationChain: DestinationBridgeChainSelectValue;
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

    const sourceChains: Record<number, BridgeChainSelectValue> = {};
    let destinationChain: DestinationBridgeChainSelectValue | undefined;

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

      const baseChainData: Omit<BridgeChainSelectValue, 'tokens'> = {
        selectId: Number(chain.chainId),
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
          marketsStaticData.primaryQuote,
          ...Object.values(marketsStaticData.spot),
        ];

        const destinationTokens = spotProducts
          .map((product): DestinationBridgeTokenSelectValue | undefined => {
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

function toBridgeToken(token: SquidToken): BridgeTokenSelectValue {
  return {
    // ID's must be unique, but addresses are shared between different source chains for native tokens (see nativeTokenConstant)
    // so we need to prefix with the chain ID
    selectId: `${token.chainId}_${token.address}`,
    address: token.address,
    isNativeToken: token.address === NATIVE_EVM_TOKEN_ADDRESS,
    oraclePriceUsd: token.usdPrice,
    chainId: Number(token.chainId),
    tokenDecimals: token.decimals,
    externalIconUrl: token.logoURI,
    name: token.name,
    symbol: token.symbol,
  };
}
