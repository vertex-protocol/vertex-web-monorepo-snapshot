import { useQuery } from '@tanstack/react-query';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/client';
import {
  QueryDisabledError,
  createQueryKey,
  useEVMContext,
  usePrimaryChainPublicClient,
} from '@vertex-protocol/react-client';
import { ZeroAddress } from 'ethers';
import { Address } from 'viem';

import vaultsAbi from 'client/modules/vaults/SkateVaultAbi';

export function skateVaultStateQueryKey(
  vaultAddress?: string,
  address?: string,
) {
  return createQueryKey('skateVaultState', vaultAddress, address);
}

export interface VaultState {
  totalVaultShares: BigDecimal;
  userShares: BigDecimal;
  userUnderlyingQuoteBalance: BigDecimal;
  totalVaultUnderlyingQuoteBalance: BigDecimal;
}

interface Params {
  vaultAddress: Address;
}

/**
 * Hook to get the state of a Skate vault as well as the state for the currently connected user.
 *
 * @param vaultAddress - The address of the Skate vault.
 *
 * @returns The Skate vault state.
 * */
export function useSkateVaultState({ vaultAddress }: Params) {
  const publicClient = usePrimaryChainPublicClient();
  const {
    connectionStatus: { address },
  } = useEVMContext();

  const userAddressForQuery = address ?? ZeroAddress;

  const disabled = !publicClient;

  const queryFn = async (): Promise<VaultState> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const contractParams = {
      abi: vaultsAbi,
      address: vaultAddress,
    };

    // The decimal adjusted number of shares the user has in the vault.
    const userShares = await publicClient.readContract({
      functionName: 'balanceOf',
      args: [userAddressForQuery as Address],
      ...contractParams,
    });

    const results = await publicClient.multicall({
      allowFailure: false,
      contracts: [
        // The total supply of shares in the vault.
        {
          functionName: 'totalSupply',
          ...contractParams,
        },
        // The passive quote asset balance, also taking into account any PNL from Vertex and margin.
        {
          functionName: 'getUnderlyingBalance',
          ...contractParams,
        },
        // Given an amount of shares, this returns the underlying balance of the quote asset, per said shares.
        {
          functionName: 'getUnderlyingBalanceByShares',
          ...contractParams,
          args: [userShares],
        },
      ],
    });

    return {
      userShares: toBigDecimal(userShares),
      totalVaultShares: toBigDecimal(results[0]),
      totalVaultUnderlyingQuoteBalance: toBigDecimal(results[1]),
      userUnderlyingQuoteBalance: toBigDecimal(results[2]),
    };
  };

  return useQuery({
    queryKey: skateVaultStateQueryKey(userAddressForQuery, vaultAddress),
    queryFn,
    enabled: !disabled,
    refetchInterval: 30000,
  });
}
