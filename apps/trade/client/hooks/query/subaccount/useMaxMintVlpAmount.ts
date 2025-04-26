import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import { GetEngineMaxMintVlpAmountParams } from '@vertex-protocol/engine-client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useMemo } from 'react';

type Params = Omit<
  GetEngineMaxMintVlpAmountParams,
  'subaccountOwner' | 'subaccountName'
>;

export function maxMintVlpAmountQueryKey(
  chainEnv?: ChainEnv,
  sender?: string,
  subaccountName?: string,
  spotLeverage?: boolean,
) {
  return createQueryKey(
    'maxMintVlpAmount',
    chainEnv,
    sender,
    subaccountName,
    spotLeverage,
  );
}

export function useMaxMintVlpAmount(params: Params) {
  const { currentSubaccount } = useSubaccountContext();
  const vertexClient = usePrimaryChainVertexClient();

  const queryParams = useMemo(():
    | GetEngineMaxMintVlpAmountParams
    | undefined => {
    if (!currentSubaccount.address) {
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
    queryKey: maxMintVlpAmountQueryKey(
      currentSubaccount.chainEnv,
      queryParams?.subaccountOwner,
      queryParams?.subaccountName,
      queryParams?.spotLeverage,
    ),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.spot.getMaxMintVlpAmount(queryParams);
    },
    enabled: !disabled,
    refetchInterval: 30000,
  });
}
