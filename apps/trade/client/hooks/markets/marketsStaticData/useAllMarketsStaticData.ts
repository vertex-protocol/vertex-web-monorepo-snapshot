import { useEVMContext } from '@vertex-protocol/react-client';
import { useAllMarketsStaticDataByChainEnv } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticDataByChainEnv';

/**
 * Query hook that returns all static market data for the current chainenv
 */
export function useAllMarketsStaticData() {
  const { primaryChainEnv } = useEVMContext();
  const { data, ...rest } = useAllMarketsStaticDataByChainEnv();

  return {
    data: data?.[primaryChainEnv],
    ...rest,
  };
}
