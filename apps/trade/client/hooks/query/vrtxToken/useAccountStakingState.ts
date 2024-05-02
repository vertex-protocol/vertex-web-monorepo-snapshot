import { useQuery } from '@tanstack/react-query';
import { IStaking__factory } from '@vertex-protocol/client';
import {
  BigDecimal,
  sumBigDecimalBy,
  toBigDecimal,
} from '@vertex-protocol/utils';
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

export function accountStakingStateQueryKey(address?: string) {
  return createQueryKey('accountStakingState', address);
}

export interface AccountStakingState {
  amountStaked: BigDecimal;
  stakingScore: BigDecimal;
  // USDC from staking rewards
  claimableRewards: BigDecimal;
  totalRewards: BigDecimal;
  // Unstaked VRTX that is now claimable
  unstakedClaimable: BigDecimal;
  // Unstaked VRTX that is still locked
  unstakedLocked: BigDecimal;
  // Seconds, these are undefined if the user has never staked/unstaked
  lastActionTime: BigDecimal | undefined; // max(lastStakeTime, lastUnstakeTime)
  lastStakeTime: BigDecimal | undefined;
  lastUnstakeTime: BigDecimal | undefined;
}

/**
 * A multicall query that returns a summary of an address' state in the staking contract
 */
export function useAccountStakingState() {
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

  const queryFn = async (): Promise<AccountStakingState> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const stakingAddress = vertexClient.context.contractAddresses.vrtxStaking;
    const commonMulticallArgs = {
      address: stakingAddress as Address,
      abi: IStaking__factory.abi,
      args: [addressForQuery as Address],
    } as const;

    const multicallResult = await publicClient.multicall({
      allowFailure: false,
      contracts: [
        {
          functionName: 'getVrtxStaked',
          ...commonMulticallArgs,
        },
        {
          functionName: 'getScore',
          ...commonMulticallArgs,
        },
        {
          functionName: 'getUsdcClaimable',
          ...commonMulticallArgs,
        },
        {
          functionName: 'getWithdrawnVrtxStates',
          ...commonMulticallArgs,
        },
        {
          functionName: 'getLastActionTimes',
          ...commonMulticallArgs,
        },
        {
          functionName: 'getRewardsBreakdown',
          ...commonMulticallArgs,
        },
      ],
    });

    const withdrawnVrtxStates = multicallResult[3];

    const lastActionTimes = multicallResult[4];
    const lastStakeTime = toBigDecimal(lastActionTimes.lastStakeTime);
    const lastUnstakeTime = toBigDecimal(lastActionTimes.lastWithdrawTime);
    const lastActionTime = BigDecimal.max(lastStakeTime, lastUnstakeTime);

    // This is the amount of rewards distributed at week i
    const rewardsBreakdown = multicallResult[5].map((r) => toBigDecimal(r));

    return {
      amountStaked: toBigDecimal(multicallResult[0]),
      stakingScore: toBigDecimal(multicallResult[1]),
      claimableRewards: toBigDecimal(multicallResult[2]),
      totalRewards: sumBigDecimalBy(rewardsBreakdown, (r) => r),
      unstakedClaimable: toBigDecimal(withdrawnVrtxStates.vrtxClaimable),
      unstakedLocked: toBigDecimal(withdrawnVrtxStates.vrtxPendingUnlock),
      lastActionTime: undefinedIfZero(lastActionTime),
      lastStakeTime: undefinedIfZero(lastStakeTime),
      lastUnstakeTime: undefinedIfZero(lastUnstakeTime),
    };
  };

  return useQuery({
    queryKey: accountStakingStateQueryKey(addressForQuery),
    queryFn,
    enabled: !disabled,
    refetchInterval: 10000,
  });
}

function undefinedIfZero(val: BigDecimal) {
  return val.isZero() ? undefined : val;
}
