import { useQuery } from '@tanstack/react-query';
import {
  BigDecimal,
  removeDecimals,
  sumBigDecimalBy,
  toBigDecimal,
  VERTEX_ABIS,
} from '@vertex-protocol/client';
import {
  QueryDisabledError,
  usePrimaryChainPublicClient,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { last } from 'lodash';

interface Data {
  apr: BigDecimal | undefined;
  lastDistributionAmount: BigDecimal | undefined;
  totalRewardsDistributed: BigDecimal;
}

const QUOTE_DECIMALS = 6;

export function useStakingData() {
  const primaryChainVertexClient = usePrimaryChainVertexClient();
  const primaryChainPublicClient = usePrimaryChainPublicClient();

  const disabled = !primaryChainVertexClient || !primaryChainPublicClient;

  return useQuery({
    queryKey: ['stakingData'],
    queryFn: async (): Promise<Data> => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const stakingV1Address =
        primaryChainVertexClient.context.contractAddresses.vrtxStaking;
      const stakingV2Address =
        primaryChainVertexClient.context.contractAddresses.vrtxStakingV2;

      const [v1RewardsBreakdown, v2RewardsBreakdown] =
        await primaryChainPublicClient.multicall({
          allowFailure: false,
          contracts: [
            {
              address: stakingV1Address,
              abi: VERTEX_ABIS['vrtxStaking'],
              functionName: 'getGlobalRewardsBreakdown',
              args: [],
            },
            {
              address: stakingV2Address,
              abi: VERTEX_ABIS['vrtxStakingV2'],
              functionName: 'getGlobalYieldsBreakdown',
              args: [],
            },
          ],
        });

      const lastV2Distribution = last(v2RewardsBreakdown);

      const { apr, lastDistributionAmount } = (() => {
        if (!lastV2Distribution) {
          return {};
        }

        const lastBaseYieldAmount = toBigDecimal(
          lastV2Distribution.baseYieldAmount,
        );
        const lastFeesYieldAmount = toBigDecimal(
          lastV2Distribution.feesYieldAmount,
        );

        return {
          apr: lastBaseYieldAmount
            .plus(lastFeesYieldAmount)
            .multipliedBy(52)
            .dividedBy(toBigDecimal(lastV2Distribution.totalVrtxBalance)),
          lastDistributionAmount: removeDecimals(
            toBigDecimal(lastV2Distribution.usdcAmount),
            QUOTE_DECIMALS,
          ),
        };
      })();

      const v1CumulativeRewardsDistribution = sumBigDecimalBy(
        Object.values(v1RewardsBreakdown),
        ({ rewardsAmount }) => toBigDecimal(rewardsAmount),
      );

      const v2CumulativeRewardsDistributions = sumBigDecimalBy(
        Object.values(v2RewardsBreakdown),
        ({ usdcAmount }) => toBigDecimal(usdcAmount),
      );

      const decimalAdjustedTotalRewardsDistributed = removeDecimals(
        v1CumulativeRewardsDistribution.plus(v2CumulativeRewardsDistributions),
        QUOTE_DECIMALS,
      );

      return {
        lastDistributionAmount,
        totalRewardsDistributed: decimalAdjustedTotalRewardsDistributed,
        apr,
      };
    },
    enabled: !disabled,
  });
}
