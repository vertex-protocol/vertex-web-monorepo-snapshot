import { useQuery } from '@tanstack/react-query';
import { ILBA__factory } from '@vertex-protocol/client';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import {
  createQueryKey,
  useEnableSubaccountQueries,
  useEVMContext,
  useIsChainType,
  usePrimaryChainPublicClient,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { ZeroAddress } from 'ethers';
import { Address } from 'viem';

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
  const { isArb } = useIsChainType();
  const vertexClient = useVertexClient();
  const publicClient = usePrimaryChainPublicClient();
  const {
    connectionStatus: { address },
  } = useEVMContext();
  const enableSubaccountQueries = useEnableSubaccountQueries();

  const disabled =
    !vertexClient || !publicClient || !isArb || !enableSubaccountQueries;
  const addressForQuery = address ?? ZeroAddress;

  const queryFn = async (): Promise<AccountLbaState> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const lbaAddress = vertexClient.context.contractAddresses.vrtxLba;
    const commonMulticallArgs = {
      address: lbaAddress as Address,
      abi: ILBA__factory.abi,
      args: [addressForQuery as Address],
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
    refetchInterval: 10000,
  });
}
