import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  PrimaryChainID,
  QueryDisabledError,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';

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
  const vertexClient = usePrimaryChainVertexClient();
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
