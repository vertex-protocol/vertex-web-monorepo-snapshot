import { useQuery } from '@tanstack/react-query';
import { ChainEnv, ERC20_ABI } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainPublicClient,
} from '@vertex-protocol/react-client';
import {
  BigDecimals,
  getValidatedAddress,
  toBigDecimal,
} from '@vertex-protocol/utils';
import { zeroAddress } from 'viem';

interface Params {
  spenderAddress: string | undefined;
  tokenAddress: string | undefined;
}

export function tokenAllowanceQueryKey(
  chainEnv?: ChainEnv,
  accountAddress?: string,
  spenderAddress?: string,
  tokenAddress?: string,
) {
  return createQueryKey(
    'tokenAllowance',
    chainEnv,
    accountAddress?.toLowerCase(),
    spenderAddress?.toLowerCase(),
    tokenAddress?.toLowerCase(),
  );
}

export function useTokenAllowance({ tokenAddress, spenderAddress }: Params) {
  const publicClient = usePrimaryChainPublicClient();
  const {
    connectionStatus: { address },
    primaryChainEnv,
  } = useEVMContext();

  const disabled = !publicClient || !spenderAddress || !tokenAddress;
  const accountAddress = address ?? zeroAddress;

  return useQuery({
    queryKey: tokenAllowanceQueryKey(
      primaryChainEnv,
      accountAddress,
      spenderAddress,
      tokenAddress,
    ),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      if (!address) {
        return BigDecimals.ZERO;
      }

      const allowance = await publicClient.readContract({
        abi: ERC20_ABI,
        address: getValidatedAddress(tokenAddress),
        functionName: 'allowance',
        args: [
          getValidatedAddress(accountAddress),
          getValidatedAddress(spenderAddress),
        ],
      });

      return toBigDecimal(allowance);
    },
    enabled: !disabled,
    // Refetch logic for token approval can be flakey, so specify a shorter refetch interval to ensure the UI stays up to date
    refetchInterval: address ? 3000 : undefined,
  });
}
