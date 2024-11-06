import { useQuery } from '@tanstack/react-query';
import { IStaking__factory } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
} from '@vertex-protocol/react-client';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import { useProtocolTokenQueryClients } from 'client/hooks/query/useProtocolTokenQueryClients';
import { ZeroAddress } from 'ethers';
import { Address } from 'viem';

export function stakingMigrationStateQueryKey(address?: string) {
  return createQueryKey('stakingMigrationState', address);
}

export interface StakingMigrationState {
  v2MigrationBonus: BigDecimal;
  v2BonusDeadlineMillis: BigDecimal;
  v2MigrationStartTimeMillis: BigDecimal;
}

/**
 * A multicall query that returns a the staking migration state from the V1 staking contract
 */
export function useStakingMigrationState() {
  const {
    connectionStatus: { address },
  } = useEVMContext();
  const { publicClient, vertexClient } = useProtocolTokenQueryClients();

  const disabled = !vertexClient || !publicClient;

  const addressForQuery = address ?? ZeroAddress;

  const queryFn = async (): Promise<StakingMigrationState> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const stakingAddress = vertexClient.context.contractAddresses.vrtxStaking;
    const commonMulticallArgs = {
      address: stakingAddress as Address,
      abi: IStaking__factory.abi,
    } as const;

    const [v2MigrationBonus, v2BonusDeadline, v2MigrationStartTime] =
      await publicClient.multicall({
        allowFailure: false,
        contracts: [
          {
            functionName: 'getV2Bonus',
            args: [addressForQuery as Address],
            ...commonMulticallArgs,
          },
          {
            functionName: 'getV2BonusDeadline',
            ...commonMulticallArgs,
          },
          {
            functionName: 'getV2StartTime',
            ...commonMulticallArgs,
          },
        ],
      });

    return {
      v2MigrationBonus: toBigDecimal(v2MigrationBonus),
      v2BonusDeadlineMillis: toBigDecimal(v2BonusDeadline).multipliedBy(1000),
      v2MigrationStartTimeMillis:
        toBigDecimal(v2MigrationStartTime).multipliedBy(1000),
    };
  };

  return useQuery({
    queryKey: stakingMigrationStateQueryKey(addressForQuery),
    queryFn,
    enabled: !disabled,
    refetchInterval: 10000,
  });
}
