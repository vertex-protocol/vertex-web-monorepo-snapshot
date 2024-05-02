import { useQuery } from '@tanstack/react-query';
import { IStaking__factory } from '@vertex-protocol/client';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import {
  createQueryKey,
  useEnableSubaccountQueries,
  useIsChainType,
  usePrimaryChainPublicClient,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { Address } from 'viem';

export function stakingStateQueryKey() {
  return createQueryKey('stakingState');
}

interface StakingRewardsDistribution {
  // Seconds
  time: BigDecimal;
  // USDC
  amount: BigDecimal;
}

interface Data {
  totalStaked: BigDecimal;
  totalScore: BigDecimal;
  unstakeUnlockTimeIntervalMillis: BigDecimal;
  rewardsDistributions: StakingRewardsDistribution[];
}

/**
 * A multicall query that returns a summary of the staking contract state
 */
export function useStakingState() {
  const { isArb } = useIsChainType();
  const vertexClient = useVertexClient();
  const publicClient = usePrimaryChainPublicClient();
  const enableSubaccountQueries = useEnableSubaccountQueries();

  const disabled =
    !vertexClient || !publicClient || !isArb || !enableSubaccountQueries;

  const queryFn = async (): Promise<Data> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const stakingAddress = vertexClient.context.contractAddresses.vrtxStaking;
    const commonMulticallArgs = {
      address: stakingAddress as Address,
      abi: IStaking__factory.abi,
    } as const;

    const multicallResult = await publicClient.multicall({
      allowFailure: false,
      contracts: [
        {
          functionName: 'getTotalScore',
          ...commonMulticallArgs,
        },
        {
          functionName: 'getTotalVrtxStaked',
          ...commonMulticallArgs,
        },
        {
          functionName: 'getGlobalRewardsBreakdown',
          ...commonMulticallArgs,
        },
        {
          // This is technically immutable, but for simplicity we query it as part of staking state
          functionName: 'getWithdrawLockingTime',
          ...commonMulticallArgs,
        },
      ],
    });

    return {
      totalScore: toBigDecimal(multicallResult[0]),
      totalStaked: toBigDecimal(multicallResult[1]),
      rewardsDistributions: multicallResult[2].map((distribution) => {
        return {
          time: toBigDecimal(distribution.distributionTime),
          amount: toBigDecimal(distribution.rewardsAmount),
        };
      }),
      unstakeUnlockTimeIntervalMillis: toBigDecimal(
        multicallResult[3],
      ).multipliedBy(1000),
    };
  };

  return useQuery({
    queryKey: stakingStateQueryKey(),
    queryFn,
    enabled: !disabled,
    refetchInterval: 10000,
  });
}
