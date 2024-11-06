import { useQuery } from '@tanstack/react-query';
import { BalanceSide, ChainEnv } from '@vertex-protocol/contracts';
import { GetEngineMaxOrderSizeParams } from '@vertex-protocol/engine-client';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useMemo } from 'react';

export type UseMaxOrderSizeParams = Omit<
  GetEngineMaxOrderSizeParams,
  'subaccountOwner' | 'subaccountName' | 'price'
> & {
  price: BigDecimal | number;
};

export function maxOrderSizeQueryKey(
  chainEnv?: ChainEnv,
  sender?: string,
  subaccountName?: string,
  productId?: number,
  side?: BalanceSide,
  price?: BigDecimal,
  spotLeverage?: boolean,
) {
  return createQueryKey(
    'maxOrderSize',
    chainEnv,
    sender,
    subaccountName,
    productId,
    side,
    price?.toString(),
    spotLeverage?.toString(),
  );
}

export function useMaxOrderSize(params?: UseMaxOrderSizeParams) {
  const { currentSubaccount } = useSubaccountContext();
  const vertexClient = usePrimaryChainVertexClient();

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
      currentSubaccount.chainEnv,
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
