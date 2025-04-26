import {
  useEVMContext,
  useVertexClientContext,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';

export function useStakingV2HistoryUrl() {
  const {
    connectionStatus: { address: userAddress },
  } = useEVMContext();
  const {
    protocolTokenMetadata: {
      chainEnv,
      chain: { blockExplorers },
    },
  } = useVertexMetadataContext();
  const { vertexClientsByChainEnv } = useVertexClientContext();
  const vertexClient = vertexClientsByChainEnv?.[chainEnv]?.client;

  if (!blockExplorers || !userAddress || !vertexClient) {
    return '';
  }

  const stakingContractAddr =
    vertexClient.context.contractAddresses.vrtxStakingV2;
  // This isn't guaranteed to work in all cases but works for Arbitrum
  return `${blockExplorers.default.url}/address/${userAddress}?toaddress=${stakingContractAddr}`;
}
