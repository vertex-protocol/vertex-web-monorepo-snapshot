import { useQuery } from '@tanstack/react-query';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import {
  PrimaryChainID,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { createQueryKey } from '@vertex-protocol/web-data';

export function subaccountLinkedSignerQueryKey(
  chainId?: PrimaryChainID,
  subaccountOwner?: string,
  subaccountName?: string,
) {
  return createQueryKey(
    'subaccountLinkedSigner',
    chainId,
    subaccountOwner,
    subaccountName,
  );
}

/**
 * Returns linked signer for the current subaccount as well as the remaining allowed txs for configuring single signature
 */
export function useSubaccountLinkedSigner() {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = useVertexClient();
  const {
    currentSubaccount: { address: subaccountOwner, name: subaccountName },
  } = useSubaccountContext();

  const disabled = !vertexClient || !subaccountOwner;

  return useQuery({
    queryKey: subaccountLinkedSignerQueryKey(
      primaryChainId,
      subaccountOwner,
      subaccountName,
    ),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.subaccount.getSubaccountLinkedSignerWithRateLimit({
        subaccount: {
          subaccountOwner,
          subaccountName,
        },
      });
    },
    enabled: !disabled,
    // Long refreshes as linked signers don't change that often
    refetchInterval: 30000,
  });
}
