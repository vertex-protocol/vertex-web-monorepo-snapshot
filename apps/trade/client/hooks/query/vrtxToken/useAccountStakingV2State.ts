import { useQuery } from '@tanstack/react-query';
import { VERTEX_ABIS } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
} from '@vertex-protocol/react-client';
import {
  BigDecimal,
  getValidatedAddress,
  toBigDecimal,
} from '@vertex-protocol/utils';
import { useProtocolTokenQueryClients } from 'client/hooks/query/useProtocolTokenQueryClients';
import { zeroAddress } from 'viem';

export function accountStakingV2StateQueryKey(address?: string) {
  return createQueryKey('accountStakingV2State', address);
}

export interface AccountStakingV2State {
  // The amount of VRTX staked + any yields accumulated
  currentBalance: BigDecimal;
  // Unstaked VRTX that is now claimable
  unstakedClaimable: BigDecimal;
  // The time when unstaked tokens are unlocked for withdraw (lastStakeTime + unstakedUnlockTimeIntervalMillis)
  unstakedClaimableTimeMillis: BigDecimal | undefined;
  // The interval of time tokens are locked after unstaking
  unstakedLockPeriodMillis: BigDecimal;
  // The time when staked tokens are available to be unstaked (minimumStakingPeriod + lastStakeTime)
  availableToUnstakeTimeMillis: BigDecimal | undefined;
  // The amount of VRTX staked by user
  amountStaked: BigDecimal;
  cumulativeBurnedAmount: BigDecimal;
  cumulativeStakedAmount: BigDecimal;
  cumulativeWithdrawnAmount: BigDecimal;
  // Fraction of yield to distribute to stakers as penalty
  toDistributeRatio: BigDecimal;
  // Fraction of yield to distribute to treasury as penalty
  toTreasuryRatio: BigDecimal;
  delegatedTradingWallet: string;
}

/**
 * A multicall query that returns a summary of an address' state in the staking v2 contract
 */
export function useAccountStakingV2State() {
  const {
    connectionStatus: { address },
  } = useEVMContext();
  const { publicClient, vertexClient } = useProtocolTokenQueryClients();

  const disabled = !vertexClient || !publicClient;
  const addressForQuery = address ?? zeroAddress;

  const queryFn = async (): Promise<AccountStakingV2State> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const stakingv2Address =
      vertexClient.context.contractAddresses.vrtxStakingV2;

    const commonMulticallArgs = {
      address: stakingv2Address,
      abi: VERTEX_ABIS['vrtxStakingV2'],
      args: [getValidatedAddress(addressForQuery)],
    } as const;

    const [
      currentBalance,
      unstakedWithdrawableTime,
      { amount, releaseTime },
      {
        cumulativeBurnedAmount,
        cumulativeStakedAmount,
        cumulativeWithdrawnAmount,
        currentStakedAmount,
      },
      { toDistributeRatio, toTreasuryRatio, withdrawLockingTime },
      delegatedTradingWallet,
    ] = await publicClient.multicall({
      allowFailure: false,
      contracts: [
        {
          functionName: 'getVrtxBalance',
          ...commonMulticallArgs,
        },
        {
          functionName: 'getWithdrawableTime',
          ...commonMulticallArgs,
        },
        {
          functionName: 'getReleaseSchedule',
          ...commonMulticallArgs,
        },
        {
          functionName: 'getState',
          ...commonMulticallArgs,
        },
        {
          functionName: 'getConfig',
          ...commonMulticallArgs,
        },
        {
          functionName: 'getTradingWallet',
          ...commonMulticallArgs,
        },
      ],
    });

    return {
      currentBalance: toBigDecimal(currentBalance),
      availableToUnstakeTimeMillis: undefinedIfZero(
        toBigDecimal(unstakedWithdrawableTime).multipliedBy(1000),
      ),
      unstakedClaimable: toBigDecimal(amount),
      unstakedClaimableTimeMillis: undefinedIfZero(
        toBigDecimal(releaseTime).multipliedBy(1000),
      ),
      amountStaked: toBigDecimal(currentStakedAmount),
      cumulativeBurnedAmount: toBigDecimal(cumulativeBurnedAmount),
      cumulativeStakedAmount: toBigDecimal(cumulativeStakedAmount),
      cumulativeWithdrawnAmount: toBigDecimal(cumulativeWithdrawnAmount),
      toDistributeRatio: toBigDecimal(toDistributeRatio),
      toTreasuryRatio: toBigDecimal(toTreasuryRatio),
      unstakedLockPeriodMillis:
        toBigDecimal(withdrawLockingTime).multipliedBy(1000),
      delegatedTradingWallet,
    };
  };

  return useQuery({
    queryKey: accountStakingV2StateQueryKey(addressForQuery),
    queryFn,
    enabled: !disabled,
    // Refetch logic should handle query updates
  });
}

function undefinedIfZero(val: BigDecimal) {
  return val.isZero() ? undefined : val;
}
