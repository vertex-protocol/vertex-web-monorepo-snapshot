import { useQuery } from '@tanstack/react-query';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import {
  createQueryKey,
  useIsChainType,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';

export function lbaStateQueryKey() {
  return createQueryKey('lbaState');
}

interface Data {
  totalVrtxDeposited: BigDecimal;
  totalUsdcDeposited: BigDecimal;
  totalLpMinted: BigDecimal;
  totalLpWithdrawn: BigDecimal;
}

export function useLbaState() {
  const { isArb } = useIsChainType();
  const vertexClient = useVertexClient();

  const disabled = !vertexClient || !isArb;

  return useQuery({
    queryKey: lbaStateQueryKey(),
    queryFn: async (): Promise<Data> => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const baseQueryData =
        await vertexClient.context.contracts.vrtxLba.getState();

      return {
        totalLpMinted: toBigDecimal(baseQueryData.totalLpMinted),
        totalLpWithdrawn: toBigDecimal(baseQueryData.totalLpWithdrawn),
        totalUsdcDeposited: toBigDecimal(baseQueryData.totalUsdcDeposited),
        totalVrtxDeposited: toBigDecimal(baseQueryData.totalVrtxDeposited),
      };
    },
    enabled: !disabled,
    refetchInterval: 10000,
  });
}
