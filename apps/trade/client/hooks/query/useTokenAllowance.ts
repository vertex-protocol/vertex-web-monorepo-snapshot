import { useQuery } from '@tanstack/react-query';
import { IERC20__factory } from '@vertex-protocol/client';
import { toBigDecimal } from '@vertex-protocol/utils';
import {
  PrimaryChainID,
  createQueryKey,
  useEVMContext,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { ZeroAddress } from 'ethers';

interface Params {
  spenderAddress: string | undefined;
  tokenAddress: string | undefined;
}

export function tokenAllowanceQueryKey(
  chainId?: PrimaryChainID,
  accountAddress?: string,
  spenderAddress?: string,
  tokenAddress?: string,
) {
  return createQueryKey(
    'tokenAllowance',
    chainId,
    accountAddress,
    spenderAddress,
    tokenAddress,
  );
}

export function useTokenAllowance({ tokenAddress, spenderAddress }: Params) {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = useVertexClient();
  const {
    connectionStatus: { address },
  } = useEVMContext();

  const disabled = !vertexClient || !spenderAddress || !tokenAddress;
  const accountAddress = address ?? ZeroAddress;

  return useQuery({
    queryKey: tokenAllowanceQueryKey(
      primaryChainId,
      accountAddress,
      tokenAddress,
      spenderAddress,
    ),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const allowance = await IERC20__factory.connect(
        tokenAddress,
        vertexClient.context.signerOrProvider,
      ).allowance(accountAddress, spenderAddress);

      return toBigDecimal(allowance);
    },
    enabled: !disabled,
    refetchInterval: 10000,
  });
}
