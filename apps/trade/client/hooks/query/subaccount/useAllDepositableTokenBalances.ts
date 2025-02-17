import { useQuery } from '@tanstack/react-query';
import { ChainEnv, IERC20__factory } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainPublicClient,
} from '@vertex-protocol/react-client';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import { useAllMarkets } from 'client/hooks/query/markets/allMarkets/useAllMarkets';
import { QueryState } from 'client/types/QueryState';

import { useMemo } from 'react';
import { Address } from 'viem';

export function allDepositableTokenBalancesQueryKey(
  chainEnv?: ChainEnv,
  owner?: string,
  productIds?: number[],
) {
  return createQueryKey('allTokenBalances', chainEnv, owner, productIds);
}

// Product ID -> balance
type Data = Record<number, BigDecimal>;

/**
 * Retrieve all on-chain token balances using viem/wagmi's multicall functionality.
 * We ideally limit usages of viem but multicall is much more efficient & faster than using a `Promise.all` on
 * individual `IERC20` calls.
 */
export function useAllDepositableTokenBalances(): QueryState<Data> {
  const publicClient = usePrimaryChainPublicClient();
  const {
    connectionStatus: { address },
    primaryChainEnv,
  } = useEVMContext();
  const { data: allMarkets } = useAllMarkets();

  const spotProducts = useMemo(
    () => {
      if (allMarkets == null) {
        return [];
      }
      return [
        allMarkets.primaryQuoteProduct,
        ...Object.values(allMarkets.spotMarkets),
      ];
    },
    // Product IDs don't really change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allMarkets == null],
  );
  const disabled = spotProducts.length === 0 || !address || !publicClient;

  const queryFn = async (): Promise<Data | undefined> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const multicallResult = await publicClient.multicall({
      // In case of failure, default to 0
      // Return type depends on this flag
      allowFailure: true,
      contracts: spotProducts.map((spotProduct) => {
        return {
          functionName: 'balanceOf',
          address: spotProduct.product.tokenAddr as Address,
          abi: IERC20__factory.abi,
          args: [address],
        };
      }),
    });

    const productIdToBalance: Data = {};

    multicallResult.map(({ error, result, status }, index) => {
      const productId = spotProducts[index].productId;
      if (status !== 'success') {
        console.warn(`Error fetching balance for product ${productId}`, error);
      }

      const tokenBalance = (result as bigint) ?? BigInt(0);
      productIdToBalance[productId] = toBigDecimal(tokenBalance);
    });

    return productIdToBalance;
  };

  return useQuery({
    queryKey: allDepositableTokenBalancesQueryKey(
      primaryChainEnv,
      address,
      spotProducts.map((p) => p.productId),
    ),
    queryFn,
    enabled: !disabled,
    // Reduce RPC calls, executes that change data are responsible for triggering refetch
    refetchInterval: 10000,
  });
}
