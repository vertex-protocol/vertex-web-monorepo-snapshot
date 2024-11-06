import { useQuery } from '@tanstack/react-query';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/client';
import { createQueryKey, useEVMContext } from '@vertex-protocol/react-client';
import { clientEnv } from 'common/environment/clientEnv';
import { ZeroAddress } from 'ethers';
import { get } from 'lodash';

export function skateOlliesQueryKey(address?: string) {
  return createQueryKey('skateOllies', address);
}

interface SkateOlliesResponse {
  data: {
    walletAddress: string;
    vertexOllies: number;
    blitzOllies: number;
  };
}

/**
 * Hook to get the SkatePark Ollies balance for the given address.
 *
 */
export function useSkateOllies() {
  const {
    connectionStatus: { address },
  } = useEVMContext();

  const userAddressForQuery = address ?? ZeroAddress;

  const queryFn = async (): Promise<BigDecimal> => {
    const baseResponse = await fetch(
      `https://vertex-blitz.skatechain.org/ollies/${userAddressForQuery}`,
    );

    if (!baseResponse.ok) {
      throw new Error('Failed to fetch SkatePark Ollies balance');
    }

    const { data }: SkateOlliesResponse = await baseResponse.json();

    const skateOllies = (() => {
      switch (clientEnv.base.brandName) {
        case 'vertex':
          return get(data, 'vertexOllies', 0);
        case 'blitz':
          return get(data, 'blitzOllies', 0);
      }
    })();

    return toBigDecimal(skateOllies);
  };

  return useQuery({
    queryKey: skateOlliesQueryKey(address),
    queryFn,
    refetchInterval: 30000,
  });
}
