import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainPublicClient,
} from '@vertex-protocol/react-client';
import { KNOWN_CONNECTOR_IDS } from 'client/consts/knownConnectorIds';
import { Address } from 'viem';

/**
 * Returns whether the current wallet is a smart contract wallet. This is not a perfect check, so it is possible for this to return false negatives.
 */
export function useIsSmartContractWalletConnected() {
  const publicClient = usePrimaryChainPublicClient();
  const {
    connectionStatus: { connector, address },
  } = useEVMContext();

  const disableQuery = !address || !publicClient;
  const { data: isSmartContract } = useQuery({
    queryKey: createQueryKey('isSmartContractWalletCodeCheck', address),
    queryFn: async () => {
      if (disableQuery) {
        throw new QueryDisabledError();
      }
      const code = await publicClient.getCode({ address: address as Address });

      return !!code && code !== '0x';
    },
    enabled: !disableQuery,
  });

  return (
    isSmartContract ||
    // Account abstraction wallets don't typically deploy on chain until the first transaction, so check known SC wallet connectors
    connector?.id === KNOWN_CONNECTOR_IDS.coinbaseWalletSDK
  );
}
