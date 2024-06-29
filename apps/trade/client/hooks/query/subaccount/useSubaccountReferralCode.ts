import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  PrimaryChainID,
  QueryDisabledError,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';

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
  const vertexClient = usePrimaryChainVertexClient();

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
