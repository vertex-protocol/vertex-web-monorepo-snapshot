import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

export function orderbookAddressesQueryKey(chainEnv?: ChainEnv) {
  return ['orderbookAddresses', chainEnv];
}

// Product ID -> Orderbook address
type Data = Record<number, string>;

/**
 * Orderbook addresses for order signature verifyingAddr
 */
export function useOrderbookAddresses() {
  const { primaryChainEnv } = useEVMContext();
  const vertexClient = usePrimaryChainVertexClient();
  const disabled = !vertexClient;

  return useQuery({
    queryKey: orderbookAddressesQueryKey(primaryChainEnv),
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
