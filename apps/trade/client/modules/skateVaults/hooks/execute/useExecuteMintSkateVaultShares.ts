import { useMutation } from '@tanstack/react-query';
import {
  BigDecimal,
  BigDecimals,
  toBigDecimal,
  toPrintableObject,
} from '@vertex-protocol/client';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import { useExecuteInValidContext } from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { skateOlliesQueryKey } from 'client/modules/skateVaults/hooks/query/useSkateOllies';
import { skateVaultApyQueryKey } from 'client/modules/skateVaults/hooks/query/useSkateVaultApyFraction';
import { skateVaultStateQueryKey } from 'client/modules/skateVaults/hooks/query/useSkateVaultState';
import abi from 'client/modules/skateVaults/SkateVaultAbi';
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
  quoteAmount: BigDecimal;
}

const REFETCH_QUERY_KEYS = [
  skateVaultStateQueryKey(),
  skateVaultApyQueryKey(),
  skateOlliesQueryKey(),
];

const SLIPPAGE_MULTIPLIER = BigDecimals.ONE.minus(0.0005);

/**
 * Hook to execute the minting of Skate vault shares.
 *
 * @returns The mutation object.
 **/
export function useExecuteMintSkateVaultShares() {
  const mutationFn = useExecuteInValidContext(
    useCallback(async ({ quoteAmount, vaultAddress }: Params, context) => {
      const contractParams = {
        address: vaultAddress,
        abi,
      };

      const quoteAmountBigInt = BigInt(quoteAmount.toFixed(0));

      // The minimum amount of shares that are expected to be minted given the amount of USDC
      const estimateMinSharesReceived = await context.publicClient.readContract(
        {
          ...contractParams,
          functionName: 'getMintAmount',
          args: [quoteAmountBigInt],
        },
      );

      console.log(
        'Depositing into Skate vault',
        toPrintableObject({
          vault: vaultAddress,
          amount: quoteAmount,
        }),
      );

      const minSharesWithSlippage = BigInt(
        toBigDecimal(estimateMinSharesReceived)
          .multipliedBy(SLIPPAGE_MULTIPLIER)
          .toFixed(0),
      );

      return context.walletClient.writeContract({
        ...contractParams,
        functionName: 'mint',
        args: [quoteAmountBigInt, minSharesWithSlippage],
      });
    }, []),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('MintSkateVault', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
