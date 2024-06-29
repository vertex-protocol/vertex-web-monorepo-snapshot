import { useQuery } from '@tanstack/react-query';
import {
  PrimaryChainID,
  QueryDisabledError,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

export function orderbookAddressesQueryKey(chainId?: PrimaryChainID) {
  return ['orderbookAddresses', chainId];
}

// Product ID -> Orderbook address
type Data = Record<number, string>;

/**
 * Orderbook addresses for order signature verifyingAddr
 */
export function useOrderbookAddresses() {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = usePrimaryChainVertexClient();
  const disabled = !vertexClient;

  return useQuery({
    queryKey: orderbookAddressesQueryKey(primaryChainId),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      const contracts = await vertexClient.context.engineClient.getContracts();

      const orderbookAddresses: Data = {};
      contracts.orderbookAddrs.forEach((orderbookAddress, index) => {
        orderbookAddresses[index] = orderbookAddress;
      });

      return orderbookAddresses;
    },
    enabled: !disabled,
    // Orderbook addresses rarely change (only when adding a new product)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
