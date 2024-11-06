import { useMutation } from '@tanstack/react-query';
import {
  BigDecimal,
  BigDecimals,
  IERC20__factory,
  toBigDecimal,
  toPrintableObject,
} from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import { useExecuteInValidContext } from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { skateOlliesQueryKey } from 'client/modules/vaults/hooks/query/useSkateOllies';
import { skateVaultApyQueryKey } from 'client/modules/vaults/hooks/query/useSkateVaultApyFraction';
import { skateVaultStateQueryKey } from 'client/modules/vaults/hooks/query/useSkateVaultState';
import vaultsAbi from 'client/modules/vaults/SkateVaultAbi';
import { useCallback } from 'react';
import { Address } from 'viem';

interface Params {
  /**
   * On chain address of the Skate vault
   */
  vaultAddress: Address;
  /**
   * Includes decimals - ie. not a float
   */
  numShares: BigDecimal;
}

const REFETCH_QUERY_KEYS = [
  skateVaultStateQueryKey(),
  skateVaultApyQueryKey(),
  skateOlliesQueryKey(),
];

const SLIPPAGE_MULTIPLIER = BigDecimals.ONE.minus(0.0005);

/**
 * Hook to execute the burning of Skate vault shares.
 *
 **/
export function useExecuteBurnSkateVaultShares() {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const quoteAddress = primaryQuoteToken.address as Address;

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async ({ numShares, vaultAddress }: Params, context) => {
        const numSharesBigInt = BigInt(numShares.toFixed(0));

        const contractParams = {
          address: vaultAddress,
          abi: vaultsAbi,
        };

        const [vaultQuoteBalance, estimatedQuoteAmountReceived] =
          await context.publicClient.multicall({
            allowFailure: false,
            contracts: [
              {
                address: quoteAddress,
                abi: IERC20__factory.abi,
                functionName: 'balanceOf',
                args: [vaultAddress],
              },
              {
                ...contractParams,
                functionName: 'getUnderlyingBalanceByShares',
                args: [numSharesBigInt],
              },
            ],
          });

        const { shares, minAmount } = await (async () => {
          // If `getUnderlyingBalanceByShares(numShares)` returns a number less than the vault's quote balance, we can burn the shares.
          if (estimatedQuoteAmountReceived < vaultQuoteBalance) {
            return {
              shares: numSharesBigInt,
              minAmount: estimatedQuoteAmountReceived,
            };
          }

          // Otherwise, calculate the max amount of shares that can be burned.
          // This is the amount of shares that would bring the vault's quote balance to nearly zero.
          const [totalSupply, totalUnderlyingBalance] =
            await context.publicClient.multicall({
              allowFailure: false,
              contracts: [
                // The total supply of shares in the vault.
                {
                  functionName: 'totalSupply',
                  ...contractParams,
                },
                // The total amount of the underlying quote asset in the vault.
                {
                  functionName: 'getUnderlyingBalance',
                  ...contractParams,
                },
              ],
            });

          const maxBurnableVaultSharesRemaining = calcMaxBurnableVaultShares(
            totalSupply,
            vaultQuoteBalance,
            totalUnderlyingBalance,
          );

          const estimatedQuoteAmountRemaining =
            await context.publicClient.readContract({
              ...contractParams,
              functionName: 'getUnderlyingBalanceByShares',
              args: [maxBurnableVaultSharesRemaining],
            });

          return {
            shares: maxBurnableVaultSharesRemaining,
            minAmount: estimatedQuoteAmountRemaining,
          };
        })();

        const minQuoteAmountWithSlippage = BigInt(
          toBigDecimal(minAmount).multipliedBy(SLIPPAGE_MULTIPLIER).toFixed(0),
        );

        console.log(
          'Withdrawing from Skate vault',
          toPrintableObject({
            vault: vaultAddress,
            shares,
            minAmount: minQuoteAmountWithSlippage,
          }),
        );

        const hash = await context.walletClient.writeContract({
          ...contractParams,
          functionName: 'burn',
          args: [shares, minQuoteAmountWithSlippage],
        });

        return { hash };
      },
      [quoteAddress],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('BurnSkateVault', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}

/**
 * Calculates the max amount of shares in the vault that can be burned
 *
 */
function calcMaxBurnableVaultShares(
  totalSupply: bigint | undefined,
  vaultUsdcBalance: bigint | undefined,
  totalUnderlyingBalance: bigint | undefined,
): bigint {
  if (!totalSupply || !vaultUsdcBalance || !totalUnderlyingBalance) {
    return BigInt(0);
  }

  return (totalSupply * vaultUsdcBalance) / totalUnderlyingBalance;
}
