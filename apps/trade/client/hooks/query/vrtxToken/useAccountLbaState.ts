import { useQuery } from '@tanstack/react-query';
import { VERTEX_ABIS } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  useIsChainEnvType,
  usePrimaryChainPublicClient,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import {
  BigDecimal,
  getValidatedAddress,
  toBigDecimal,
} from '@vertex-protocol/utils';
import { zeroAddress } from 'viem';

export function accountLbaStateQueryKey(address?: string) {
  return createQueryKey('accountLbaState', address);
}

export interface AccountLbaState {
  maxWithdrawableUsdc: BigDecimal;
  lockedLpBalance: BigDecimal;
  withdrawableLpBalance: BigDecimal;
  depositedVrtx: BigDecimal;
  depositedUsdc: BigDecimal;
}

/**
 * A multicall query that returns a summary of an address' state in the LBA pool
 */
export function useAccountLbaState() {
  const { isArb } = useIsChainEnvType();
  const vertexClient = usePrimaryChainVertexClient();
  const publicClient = usePrimaryChainPublicClient();
  const {
    connectionStatus: { address },
  } = useEVMContext();

  const disabled = !vertexClient || !publicClient || !isArb;
  const addressForQuery = address ?? zeroAddress;

  const queryFn = async (): Promise<AccountLbaState> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const lbaAddress = vertexClient.context.contractAddresses.vrtxLba;
    const commonMulticallArgs = {
      address: lbaAddress,
      abi: VERTEX_ABIS['vrtxLba'],
      args: [getValidatedAddress(addressForQuery)],
    } as const;

    const multicallResult = await publicClient.multicall({
      allowFailure: false,
      contracts: [
        {
          functionName: 'getMaxWithdrawableUsdc',
          ...commonMulticallArgs,
        },
        {
          functionName: 'getLockedLpBalance',
          ...commonMulticallArgs,
        },
        {
          functionName: 'getWithdrawableLpBalance',
          ...commonMulticallArgs,
        },
        {
          functionName: 'getDepositedVrtx',
          ...commonMulticallArgs,
        },
        {
          functionName: 'getDepositedUsdc',
          ...commonMulticallArgs,
        },
      ],
    });

    return {
      maxWithdrawableUsdc: toBigDecimal(multicallResult[0]),
      lockedLpBalance: toBigDecimal(multicallResult[1]),
      withdrawableLpBalance: toBigDecimal(multicallResult[2]),
      depositedVrtx: toBigDecimal(multicallResult[3]),
      depositedUsdc: toBigDecimal(multicallResult[4]),
    };
  };

  return useQuery({
    queryKey: accountLbaStateQueryKey(addressForQuery),
    queryFn,
    enabled: !disabled,
    refetchInterval: address ? 10000 : undefined,
  });
}
