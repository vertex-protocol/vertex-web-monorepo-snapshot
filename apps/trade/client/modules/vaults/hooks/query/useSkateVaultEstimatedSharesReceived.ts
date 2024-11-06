import { useQuery } from '@tanstack/react-query';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/client';
import {
  QueryDisabledError,
  createQueryKey,
  usePrimaryChainPublicClient,
} from '@vertex-protocol/react-client';
import { Address } from 'viem';

import vaultsAbi from 'client/modules/vaults/SkateVaultAbi';

interface Params {
  vaultAddress: Address;
  quoteAmount: BigDecimal | undefined;
}

/**
 * Hook to get the minimum shares received for the given quote amount in a Skate vault.
 *
 * @param vaultAddress - The address of the Skate vault.
 * @param quoteAmount - The quote amount with decimals added.
 *
 * @returns The minimum shares for the given Skate vault and quote amount.
 **/
export function useSkateVaultEstimatedSharesReceived({
  quoteAmount,
  vaultAddress,
}: Params) {
  const publicClient = usePrimaryChainPublicClient();

  const disabled = !publicClient || !quoteAmount;

  const queryFn = async (): Promise<BigDecimal> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const quoteAmountBigInt = BigInt(quoteAmount.toFixed());

    const sharesReceived = await publicClient.readContract({
      address: vaultAddress,
      abi: vaultsAbi,
      functionName: 'getMintAmount',
      args: [quoteAmountBigInt],
    });

    return toBigDecimal(sharesReceived);
  };

  return useQuery({
    queryKey: createQueryKey(
      'skateVaultEstimatedSharesReceived',
      vaultAddress,
      quoteAmount,
    ),
    queryFn,
    enabled: !disabled,
  });
}
