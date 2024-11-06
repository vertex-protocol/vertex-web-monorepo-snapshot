import { useQuery } from '@tanstack/react-query';
import { BigDecimal, ChainEnv, toBigDecimal } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
} from '@vertex-protocol/react-client';

const BASE_SKATE_URL_BY_CHAIN: Record<ChainEnv, string | undefined> = {
  arbitrum: 'https://derivatives.rangeprotocol.com/arbitrum/incentives/',
  blast: 'https://derivatives.rangeprotocol.com/blast/incentives/',
  mantle: 'https://derivatives.rangeprotocol.com/mantle/incentives/',
  arbitrumTestnet: undefined,
  base: undefined,
  baseTestnet: undefined,
  blastTestnet: undefined,
  mantleTestnet: undefined,
  sei: undefined,
  seiTestnet: undefined,
  local: undefined,
};

export function skateVaultApyQueryKey(vaultAddress?: string) {
  return createQueryKey('skateVaultsApy', vaultAddress);
}

interface Params {
  vaultAddress: string;
}

interface ApyResponse {
  data: {
    // The apy of the vault as a percentage.
    apy: number;
  };
}

/**
 * Hook to get the APY fraction of a Skate vault.
 *
 * @param vaultAddress - The address of the Skate vault.
 *
 * @remarks
 * The APY is then converted to a BigDecimal and divided by 100 to get the APY fraction.
 */
export function useSkateVaultApyFraction({ vaultAddress }: Params) {
  const { primaryChainEnv } = useEVMContext();

  const baseUrl = BASE_SKATE_URL_BY_CHAIN[primaryChainEnv];

  const disabled = !baseUrl;

  const queryFn = async (): Promise<BigDecimal> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const baseResponse = await fetch(baseUrl + vaultAddress);

    if (!baseResponse.ok) {
      throw new Error('Failed to fetch vault APY data');
    }

    const { data }: ApyResponse = await baseResponse.json();

    return toBigDecimal(data.apy).div(100);
  };

  return useQuery({
    enabled: !disabled,
    queryKey: skateVaultApyQueryKey(vaultAddress),
    queryFn,
    refetchInterval: 30000,
  });
}
