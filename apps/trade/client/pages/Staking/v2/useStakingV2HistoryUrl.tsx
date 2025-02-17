import {
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

export function useStakingV2HistoryUrl() {
  const {
    primaryChain: { blockExplorers },
    connectionStatus: { address: userAddress },
  } = useEVMContext();
  const vertexClient = usePrimaryChainVertexClient();

  if (!blockExplorers || !userAddress || !vertexClient) {
    return '';
  }

  const stakingContractAddr =
    vertexClient.context.contractAddresses.vrtxStakingV2;
  // This isn't guaranteed to work in all cases but works for Arbitrum
  return `${blockExplorers.default.url}/address/${userAddress}?toaddress=${stakingContractAddr}`;
}
