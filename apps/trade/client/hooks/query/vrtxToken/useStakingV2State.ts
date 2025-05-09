import { useQuery } from '@tanstack/react-query';
import { VERTEX_ABIS } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
} from '@vertex-protocol/react-client';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import { useProtocolTokenQueryClients } from 'client/hooks/query/useProtocolTokenQueryClients';

export function stakingV2StateQueryKey() {
  return createQueryKey('stakingV2State');
}

interface StakingV2RewardsDistribution {
  /** Time in seconds */
  timeMillis: BigDecimal;
  /** Base amount of VRTX rewarded (yield fraction = baseAmount / totalVrtxBalance */
  baseYieldAmount: BigDecimal;
  /** Amount of VRTX rewarded from fees (yield fraction = feeAmount / totalVrtxBalance */
  feesYieldAmount: BigDecimal;
  /** Amount of USDC fees */
  feesUsdcAmount: BigDecimal;
  /** Amount staked including yield */
  totalBalance: BigDecimal;
}

interface Data {
  // Total VRTX staked in pool
  totalBalance: BigDecimal;
  rewardsDistributions: StakingV2RewardsDistribution[];
}

/**
 * A multicall query that returns a summary of the staking v2 contract state
 */
export function useStakingV2State() {
  const { publicClient, vertexClient } = useProtocolTokenQueryClients();

  const disabled = !vertexClient || !publicClient;

  const queryFn = async (): Promise<Data> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const stakingV2Address =
      vertexClient.context.contractAddresses.vrtxStakingV2;

    const commonMulticallArgs = {
      address: stakingV2Address,
      abi: VERTEX_ABIS['vrtxStakingV2'],
    } as const;

    const multicallResult = await publicClient.multicall({
      allowFailure: false,
      contracts: [
        {
          functionName: 'getGlobalYieldsBreakdown',
          ...commonMulticallArgs,
        },
        {
          functionName: 'getTotalVrtxBalance',
          ...commonMulticallArgs,
        },
      ],
    });

    return {
      rewardsDistributions: multicallResult[0].map((distribution) => {
        return {
          timeMillis: toBigDecimal(distribution.distributionTime).multipliedBy(
            1000,
          ),
          baseYieldAmount: toBigDecimal(distribution.baseYieldAmount),
          feesYieldAmount: toBigDecimal(distribution.feesYieldAmount),
          feesUsdcAmount: toBigDecimal(distribution.usdcAmount),
          totalBalance: toBigDecimal(distribution.totalVrtxBalance),
        };
      }),
      totalBalance: toBigDecimal(multicallResult[1]),
    };
  };

  return useQuery({
    queryKey: stakingV2StateQueryKey(),
    queryFn,
    enabled: !disabled,
    refetchInterval: 30000,
  });
}
