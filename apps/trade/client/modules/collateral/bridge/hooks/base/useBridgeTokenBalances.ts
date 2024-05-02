import { useSquidSDK } from 'client/modules/collateral/bridge/hooks/base/useSquidSDK';
import { createQueryKey } from '@vertex-protocol/web-data';
import { useEVMContext } from '@vertex-protocol/web-data';
import { useQuery } from '@tanstack/react-query';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { BigDecimal } from '@vertex-protocol/client';
import { toBigDecimal } from '@vertex-protocol/utils';

export function bridgeTokenBalancesQueryKey(
  address?: string,
  chainId?: number,
) {
  return createQueryKey('bridgeTokenBalances', address, chainId);
}

/**
 * Returns bridge token balances for a given chain
 */
export function useBridgeTokenBalances(chainId?: number) {
  const squidSDK = useSquidSDK();
  const {
    connectionStatus: { address },
  } = useEVMContext();

  const disabled = !address || !squidSDK || !chainId;

  return useQuery({
    queryKey: bridgeTokenBalancesQueryKey(address, chainId),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      const balances = await squidSDK.getEvmBalances({
        userAddress: address,
        chains: [chainId],
      });

      const balanceByAddress: Record<string, BigDecimal> = {};
      balances.forEach((bal) => {
        balanceByAddress[bal.address] = toBigDecimal(bal.balance);
      });

      return balanceByAddress;
    },
    enabled: !disabled,
    refetchInterval: 10000,
  });
}
