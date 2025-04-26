import { useEVMContext } from '@vertex-protocol/react-client';
import { truncateAddress, truncateMiddle } from '@vertex-protocol/web-common';
import { useClustersName } from 'client/hooks/query/useClustersName';
import { useConnectedXrpConnectorMetadata } from 'client/modules/xrp/hooks/useConnectedXrpConnectorMetadata';
import { mainnet } from 'viem/chains';
import { useEnsName } from 'wagmi';

interface AddressDisplayName {
  type: 'address' | 'clusters' | 'ens';
  displayName: string;
  /**
   * Truncated display name for UI purposes.
   */
  truncatedDisplayName: string;
}

/**
 * Retrieve a displayable string for an address. The logic is as follows:
 * - If connected to a XRP wallet, return the r-address.
 * - If the address has a Clusters name, it has precedence over ENS.
 * - If the address has an ENS name, return the ENS name.
 * - If the address has no assigned names, return the address.
 *
 * @param {string | undefined} address
 * @returns {AddressDisplayName}
 */
export function useConnectedAddressDisplayName(): AddressDisplayName {
  const {
    connectionStatus: { address },
  } = useEVMContext();
  const xrpConnectorMetadata = useConnectedXrpConnectorMetadata();
  // only fetching ENS from mainnet as it's mainly used there and allows for easier testing
  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id,
  });
  const { data: clustersName } = useClustersName(address);

  if (xrpConnectorMetadata) {
    return {
      type: 'address',
      displayName: xrpConnectorMetadata.rAddress,
      truncatedDisplayName: truncateAddress(xrpConnectorMetadata.rAddress),
    };
  }

  const defaultAddressDisplayName: AddressDisplayName = {
    type: 'address',
    displayName: address ?? '',
    truncatedDisplayName: truncateAddress(address ?? ''),
  };
  // Avoid flicker in UI by returning undefined until both ENS and Clusters are fetched
  // undefined === not fetched, null === fetched but no name
  if (ensName === undefined || clustersName === undefined) {
    return defaultAddressDisplayName;
  }

  if (clustersName) {
    return {
      type: 'clusters',
      displayName: clustersName,
      truncatedDisplayName: truncateMiddle(clustersName ?? '', 7),
    };
  }
  if (ensName) {
    return {
      type: 'ens',
      displayName: ensName,
      truncatedDisplayName: truncateMiddle(ensName ?? '', 7),
    };
  }

  return defaultAddressDisplayName;
}
