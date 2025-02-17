import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { zeroAddress } from 'viem';

export function listSubaccountsQueryKey(
  chainEnv?: ChainEnv,
  subaccountOwner?: string,
  limit?: number,
) {
  return createQueryKey('listSubaccounts', chainEnv, subaccountOwner, limit);
}

export function useListSubaccounts({ limit = 100 }: { limit?: number } = {}) {
  const vertexClient = usePrimaryChainVertexClient();
  const {
    connectionStatus: { address },
    primaryChainEnv,
  } = useEVMContext();

  const subaccountsOwnerForQuery = address ?? zeroAddress;

  const disabled = !vertexClient;

  return useQuery({
    queryKey: listSubaccountsQueryKey(
      primaryChainEnv,
      subaccountsOwnerForQuery,
      limit,
    ),
    queryFn: () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      return vertexClient.context.indexerClient.listSubaccounts({
        address: subaccountsOwnerForQuery,
        limit,
      });
    },
    enabled: !disabled,
    // Only refetch on mutations.
    refetchInterval: false,
  });
}
