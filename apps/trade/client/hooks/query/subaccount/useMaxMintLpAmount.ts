import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import { GetEngineMaxMintLpAmountParams } from '@vertex-protocol/engine-client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useMemo } from 'react';

type Params = Omit<
  GetEngineMaxMintLpAmountParams,
  'subaccountOwner' | 'subaccountName'
>;

export function maxMintLpAmountQueryKey(
  chainEnv?: ChainEnv,
  sender?: string,
  subaccountName?: string,
  productId?: number,
  spotLeverage?: boolean,
) {
  return createQueryKey(
    'maxMintLpAmount',
    chainEnv,
    sender,
    subaccountName,
    productId,
    spotLeverage,
  );
}

export function useMaxMintLpAmount(params?: Params) {
  const { currentSubaccount } = useSubaccountContext();
  const vertexClient = usePrimaryChainVertexClient();

  const queryParams = useMemo(():
    | GetEngineMaxMintLpAmountParams
    | undefined => {
    if (!currentSubaccount.address || !params) {
      return undefined;
    }

    return {
      ...params,
      subaccountOwner: currentSubaccount.address,
      subaccountName: currentSubaccount.name,
    };
  }, [currentSubaccount.address, currentSubaccount.name, params]);

  const disabled = !vertexClient || !queryParams;

  return useQuery({
    queryKey: maxMintLpAmountQueryKey(
      currentSubaccount.chainEnv,
      queryParams?.subaccountOwner,
      queryParams?.subaccountName,
      queryParams?.productId,
      queryParams?.spotLeverage,
    ),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.market.getMaxMintLp(queryParams);
    },
    enabled: !disabled,
    refetchInterval: 30000,
  });
}
