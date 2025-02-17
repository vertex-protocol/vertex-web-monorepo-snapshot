import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { zeroAddress } from 'viem';

export function subaccountFeeRatesQueryKey(
  chainEnv?: ChainEnv,
  sender?: string,
  subaccountName?: string,
) {
  return createQueryKey('subaccountFeeRates', chainEnv, sender, subaccountName);
}

export function useSubaccountFeeRates() {
  const { currentSubaccount } = useSubaccountContext();
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient;

  return useQuery({
    queryKey: subaccountFeeRatesQueryKey(
      currentSubaccount.chainEnv,
      currentSubaccount.address,
      currentSubaccount.name,
    ),
    queryFn: () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      // Fetch fee rates even when there's no subaccount for a set of "default" fees
      return vertexClient.subaccount.getSubaccountFeeRates({
        subaccountOwner: currentSubaccount.address ?? zeroAddress,
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
