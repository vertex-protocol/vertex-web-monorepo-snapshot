import { useEVMContext } from '@vertex-protocol/react-client';
import { useAllMarketsByChainEnv } from 'client/hooks/query/markets/allMarkets/useAllMarketsByChainEnv';

/**
 * Query hook that returns all markets for the primary chain env
 */
export function useAllMarkets() {
  const { primaryChainEnv } = useEVMContext();
  const { data, ...rest } = useAllMarketsByChainEnv();

  return {
    data: data?.[primaryChainEnv],
    ...rest,
  };
}
