import { useQuery } from '@tanstack/react-query';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainPublicClient,
} from '@vertex-protocol/react-client';
import vaultsAbi from 'client/modules/skateVaults/SkateVaultAbi';
import { Address } from 'viem';

interface Params {
  vaultAddress: Address;
  numShares: BigDecimal | undefined;
}

/**
 * Hook to get a Skate vault's passive underlying balance given an amount of shares.
 * This represents the amount of the quote asset that would be received if the shares were burned.
 *
 * @param vaultAddress - The address of the Skate vault.
 * @param numShares - The number of shares to get the underlying balance for.
 *
 * */
export function useSkateVaultEstimatedQuoteReceived({
  vaultAddress,
  numShares,
}: Params) {
  const publicClient = usePrimaryChainPublicClient();
  const disabled = !publicClient || !numShares;

  const queryFn = async (): Promise<BigDecimal> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const numSharesBigInt = BigInt(numShares.toFixed());

    const amountQuotePerShare = await publicClient.readContract({
      // Given an amount of shares, this returns the underlying balance of the quote asset for that amount shares.
      functionName: 'getUnderlyingBalanceByShares',
      abi: vaultsAbi,
      address: vaultAddress,
      args: [numSharesBigInt],
    });

    return toBigDecimal(amountQuotePerShare);
  };

  return useQuery({
    queryKey: createQueryKey(
      'skateVaultUnderlyingBalanceByShares',
      vaultAddress,
      numShares,
    ),
    queryFn,
    enabled: !disabled,
  });
}
