import { useQuery } from '@tanstack/react-query';
import { BigDecimal } from '@vertex-protocol/utils';
import {
  createQueryKey,
  PrimaryChainID,
  QueryDisabledError,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';

export function maxWithdrawableQueryKey(
  chainId?: PrimaryChainID,
  sender?: string,
  subaccountName?: string,
  productId?: number,
  spotLeverage?: boolean,
) {
  return createQueryKey(
    'maxWithdrawable',
    chainId,
    sender,
    subaccountName,
    productId,
    spotLeverage,
  );
}

interface Params {
  productId?: number;
  spotLeverage?: boolean;
}

// Always non-negative, includes any current positive balances
export function useMaxWithdrawableAmount(params?: Params) {
  const primaryChainId = usePrimaryChainId();
  const { currentSubaccount } = useSubaccountContext();
  const vertexClient = usePrimaryChainVertexClient();

  const disabled =
    !currentSubaccount.address ||
    !currentSubaccount.name ||
    !vertexClient ||
    params == null;

  return useQuery({
    queryKey: maxWithdrawableQueryKey(
      primaryChainId,
      currentSubaccount.address,
      currentSubaccount.name,
      params?.productId,
      params?.spotLeverage,
    ),
    queryFn: async (): Promise<BigDecimal> => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.spot.getMaxWithdrawable({
        subaccountOwner: currentSubaccount.address ?? '',
        subaccountName: currentSubaccount.name,
        productId: params?.productId ?? 0,
        spotLeverage: params?.spotLeverage ?? false,
      });
    },
    enabled: !disabled,
    refetchInterval: 30000,
  });
}
