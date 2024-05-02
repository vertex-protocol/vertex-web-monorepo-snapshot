import { useQuery } from '@tanstack/react-query';
import { GetEngineMaxMintLpAmountParams } from '@vertex-protocol/engine-client';
import {
  PrimaryChainID,
  createQueryKey,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { useMemo } from 'react';

type Params = Omit<
  GetEngineMaxMintLpAmountParams,
  'subaccountOwner' | 'subaccountName'
>;

export function maxMintLpAmountQueryKey(
  chainId?: PrimaryChainID,
  sender?: string,
  subaccountName?: string,
  productId?: number,
  spotLeverage?: boolean,
) {
  return createQueryKey(
    'maxMintLpAmount',
    chainId,
    sender,
    subaccountName,
    productId,
    spotLeverage,
  );
}

export function useMaxMintLpAmount(params?: Params) {
  const primaryChainId = usePrimaryChainId();
  const { currentSubaccount } = useSubaccountContext();
  const vertexClient = useVertexClient();

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
      primaryChainId,
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
