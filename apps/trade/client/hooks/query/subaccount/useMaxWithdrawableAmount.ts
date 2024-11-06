import { useQuery } from '@tanstack/react-query';
import { BigDecimal } from '@vertex-protocol/utils';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { ChainEnv } from '@vertex-protocol/client';

export function maxWithdrawableQueryKey(
  chainEnv?: ChainEnv,
  sender?: string,
  subaccountName?: string,
  productId?: number,
  spotLeverage?: boolean,
) {
  return createQueryKey(
    'maxWithdrawable',
    chainEnv,
    sender,
    subaccountName,
    productId,
    spotLeverage,
  );
}

interface Params {
  productId?: number;
  spotLeverage?: boolean;
  subaccountName?: string;
}

// Always non-negative, includes any current positive balances
export function useMaxWithdrawableAmount(params?: Params) {
  const { currentSubaccount } = useSubaccountContext();
  const vertexClient = usePrimaryChainVertexClient();

  const subaccountName = params?.subaccountName
    ? params.subaccountName
    : currentSubaccount.name;

  const productId = params?.productId ?? 0;
  const spotLeverage = params?.spotLeverage ?? false;

  const disabled =
    !currentSubaccount.address ||
    !subaccountName ||
    !vertexClient ||
    params == null;

  return useQuery({
    queryKey: maxWithdrawableQueryKey(
      currentSubaccount.chainEnv,
      currentSubaccount.address,
      subaccountName,
      productId,
      spotLeverage,
    ),
    queryFn: async (): Promise<BigDecimal> => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.spot.getMaxWithdrawable({
        subaccountOwner: currentSubaccount.address ?? '',
        subaccountName,
        productId,
        spotLeverage,
      });
    },
    enabled: !disabled,
    refetchInterval: 30000,
  });
}
