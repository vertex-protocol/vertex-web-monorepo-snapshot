import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  PrimaryChainID,
  QueryDisabledError,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { ZeroAddress } from 'ethers';

export function subaccountFeeRatesQueryKey(
  chainId?: PrimaryChainID,
  sender?: string,
  subaccountName?: string,
) {
  return createQueryKey('subaccountFeeRates', chainId, sender, subaccountName);
}

export function useSubaccountFeeRates() {
  const primaryChainId = usePrimaryChainId();
  const { currentSubaccount } = useSubaccountContext();
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient;

  return useQuery({
    queryKey: subaccountFeeRatesQueryKey(
      primaryChainId,
      currentSubaccount.address,
      currentSubaccount.name,
    ),
    queryFn: () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      // Fetch fee rates even when there's no subaccount for a set of "default" fees
      return vertexClient.subaccount.getSubaccountFeeRates({
        subaccountOwner: currentSubaccount.address ?? ZeroAddress,
        subaccountName: currentSubaccount.name ?? '',
      });
    },
    // No refetch here as fee rates are unlikely to change
    enabled: !disabled,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
