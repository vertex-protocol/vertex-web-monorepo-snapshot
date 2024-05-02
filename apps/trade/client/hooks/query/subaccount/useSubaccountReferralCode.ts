import { useQuery } from '@tanstack/react-query';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import {
  PrimaryChainID,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { createQueryKey } from '@vertex-protocol/web-data';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';

export function subaccountReferralCodeQueryKey(
  chainId?: PrimaryChainID,
  sender?: string,
  subaccountName?: string,
) {
  return createQueryKey(
    'subaccountReferralCode',
    chainId,
    sender,
    subaccountName,
  );
}

export function useSubaccountReferralCode() {
  const primaryChainId = usePrimaryChainId();
  const {
    currentSubaccount: { address, name },
  } = useSubaccountContext();
  const vertexClient = useVertexClient();

  const disabled = !vertexClient || !address;

  return useQuery({
    queryKey: subaccountReferralCodeQueryKey(primaryChainId, address, name),
    queryFn: () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      // Fetch fee rates even when there's no subaccount for a set of "default" fees
      return vertexClient.subaccount.getReferralCode({
        subaccount: {
          subaccountOwner: address,
          subaccountName: name,
        },
      });
    },
    // Referral codes don't change after they're created
    refetchInterval: (query) => {
      return query.state.data?.referralCode ? false : 30000;
    },
    enabled: !disabled,
  });
}
