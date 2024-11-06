import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';

export function subaccountLinkedSignerQueryKey(
  chainEnv?: ChainEnv,
  subaccountOwner?: string,
  subaccountName?: string,
) {
  return createQueryKey(
    'subaccountLinkedSigner',
    chainEnv,
    subaccountOwner,
    subaccountName,
  );
}

/**
 * Returns linked signer for the current subaccount as well as the remaining allowed txs for configuring single signature
 */
export function useSubaccountLinkedSigner() {
  const vertexClient = usePrimaryChainVertexClient();
  const {
    currentSubaccount: {
      address: subaccountOwner,
      name: subaccountName,
      chainEnv,
    },
  } = useSubaccountContext();

  const disabled = !vertexClient || !subaccountOwner;

  return useQuery({
    queryKey: subaccountLinkedSignerQueryKey(
      chainEnv,
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
