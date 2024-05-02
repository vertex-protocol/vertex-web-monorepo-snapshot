import { useVertexClient } from '@vertex-protocol/web-data';

import { useEVMContext } from '@vertex-protocol/web-data';

export function useStakingHistoryUrl() {
  const {
    primaryChain: { blockExplorers },
    connectionStatus: { address: userAddress },
  } = useEVMContext();
  const vertexClient = useVertexClient();

  if (!blockExplorers || !userAddress || !vertexClient) {
    return '';
  }

  const stakingContractAddr =
    vertexClient.context.contractAddresses.vrtxStaking;
  // This isn't guaranteed to work in all cases but works for Arbitrum
  return `${blockExplorers.default.url}/address/${userAddress}?toaddress=${stakingContractAddr}`;
}
