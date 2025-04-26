import { useQuery } from '@tanstack/react-query';
import { VERTEX_ABIS } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
} from '@vertex-protocol/react-client';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import { useProtocolTokenQueryClients } from 'client/hooks/query/useProtocolTokenQueryClients';

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
  const { publicClient, vertexClient } = useProtocolTokenQueryClients();

  const disabled = !vertexClient || !publicClient;

  const queryFn = async (): Promise<Data> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const stakingAddress = vertexClient.context.contractAddresses.vrtxStaking;
    const commonMulticallArgs = {
      address: stakingAddress,
      abi: VERTEX_ABIS['vrtxStaking'],
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
    refetchInterval: 30000,
  });
}
