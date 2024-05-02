import { useQuery } from '@tanstack/react-query';
import { BalanceSide } from '@vertex-protocol/contracts';
import { GetEngineMaxOrderSizeParams } from '@vertex-protocol/engine-client';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import {
  PrimaryChainID,
  createQueryKey,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { useMemo } from 'react';

export type UseMaxOrderSizeParams = Omit<
  GetEngineMaxOrderSizeParams,
  'subaccountOwner' | 'subaccountName' | 'price'
> & {
  price: BigDecimal | number;
};

export function maxOrderSizeQueryKey(
  chainId?: PrimaryChainID,
  sender?: string,
  subaccountName?: string,
  productId?: number,
  side?: BalanceSide,
  price?: BigDecimal,
  spotLeverage?: boolean,
) {
  return createQueryKey(
    'maxOrderSize',
    chainId,
    sender,
    subaccountName,
    productId,
    side,
    price?.toString(),
    spotLeverage?.toString(),
  );
}

export function useMaxOrderSize(params?: UseMaxOrderSizeParams) {
  const primaryChainId = usePrimaryChainId();
  const { currentSubaccount } = useSubaccountContext();
  const vertexClient = useVertexClient();

  const queryParams = useMemo((): GetEngineMaxOrderSizeParams | undefined => {
    if (!currentSubaccount.address || !params) {
      return undefined;
    }

    return {
      ...params,
      price: toBigDecimal(params.price),
      subaccountOwner: currentSubaccount.address,
      subaccountName: currentSubaccount.name,
    };
  }, [currentSubaccount.address, currentSubaccount.name, params]);

  const disabled = !vertexClient || !queryParams;

  return useQuery({
    queryKey: maxOrderSizeQueryKey(
      primaryChainId,
      queryParams?.subaccountOwner,
      queryParams?.subaccountName,
      queryParams?.productId,
      queryParams?.side,
      queryParams?.price,
      queryParams?.spotLeverage,
    ),
    queryFn: async (): Promise<BigDecimal> => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.market.getMaxOrderSize(queryParams);
    },
    enabled: !disabled,
    refetchInterval: 30000,
  });
}
