import { useEnsName } from 'wagmi';
import { mainnet } from 'viem/chains';
import { Address } from 'viem';
import { useClustersName } from 'client/hooks/query/useClustersName';

interface AddressDisplayName {
  type: 'none' | 'clusters' | 'ens';
  displayName?: string;
}

/**
 * Retrieve a display name for an address.
 * We currently support ENS mainnet and Clusters.xyz display names.
 * Cluters.xyz is prioritized over ENS if address has both.
 *
 * @param {string | undefined} address
 * @returns {AddressDisplayName | undefined} AddressDisplayName or undefined if unknown (not fetched yet)
 */
export function useAddressDisplayName(
  address: string | undefined,
): AddressDisplayName | undefined {
  // only fetching ENS from mainnet as it's mainly used there and allows for easier testing
  const { data: ensName } = useEnsName({
    address: address as Address,
    chainId: mainnet.id,
  });
  const { data: clustersName } = useClustersName(address);

  // avoid flicker in UI and dupe analytics
  // by returning undefined until both ENS and Clusters are fetched
  if (ensName === undefined || clustersName === undefined) {
    return undefined;
  }

  if (clustersName) {
    return { type: 'clusters', displayName: clustersName };
  }
  if (ensName) {
    return { type: 'ens', displayName: ensName };
  }
  return { type: 'none' };
}
