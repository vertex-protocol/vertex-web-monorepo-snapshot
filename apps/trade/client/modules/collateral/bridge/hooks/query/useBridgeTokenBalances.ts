import { useQuery } from '@tanstack/react-query';
import { BigDecimal } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
} from '@vertex-protocol/react-client';
import { toBigDecimal } from '@vertex-protocol/utils';
import { useSquidSDKQuery } from 'client/modules/collateral/bridge/hooks/useSquidSDKQuery';

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
  const squidSDK = useSquidSDKQuery();
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
