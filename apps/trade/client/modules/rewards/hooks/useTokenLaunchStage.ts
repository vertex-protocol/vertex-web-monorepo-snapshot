import { useQuery } from '@tanstack/react-query';
import { ILBA, LBA_AIRDROP_EPOCH } from '@vertex-protocol/client';
import { QueryDisabledError } from '@vertex-protocol/react-client';
import { nowInSeconds } from '@vertex-protocol/utils';
import { useLbaConfig } from 'client/hooks/query/vrtxToken/useLbaConfig';
import { useTokenClaimDeadlines } from 'client/hooks/query/vrtxToken/useTokenClaimDeadlines';
import { secondsToMilliseconds } from 'date-fns';
import { get } from 'lodash';

// All possible stages of the VRTX token launch sequence
export type TokenLaunchStage =
  | 'pre_lba'
  // Users can claim VRTX to the LBA and deposit/withdraw USDC (5 days)
  | 'lba_claim_and_deposit'
  // Users can only withdraw USDC once (2 days)
  | 'lba_withdraw'
  // Trading & AMM is live, users can claim liquid VRTX (30 days)
  | 'liquid_claim'
  // Liquid claim ends, but LBA liquidity is still locked (30 days)
  | 'pre_liquidity_unlock'
  // LBA liquidity starts to unlock (60 days)
  | 'liquidity_unlock'
  // LBA liquidity is fully unlocked and the token launch is complete
  | 'post_launch';

export interface TokenLaunchStageData {
  stage: TokenLaunchStage;
  stageConfigTimestampsMillis: {
    [key in keyof ILBA.ConfigStruct]: number;
  } & {
    // This is given from token claim deadlines
    initialPhaseLiquidClaimEndTime: number;
  };
}

export function useTokenLaunchStage() {
  const { data: lbaConfig } = useLbaConfig();
  const { data: tokenClaimDeadlines } = useTokenClaimDeadlines();

  const disabled = !lbaConfig || !tokenClaimDeadlines;

  const queryFn = (): TokenLaunchStageData => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const nowBigInt = BigInt(nowInSeconds());
    const lbaLiquidClaimDeadline = BigInt(
      get(tokenClaimDeadlines, LBA_AIRDROP_EPOCH, 0).toFixed(),
    );

    const stage = ((): TokenLaunchStage => {
      if (nowBigInt < lbaConfig.depositStartTime) {
        return 'pre_lba';
      }
      if (nowBigInt < lbaConfig.depositEndTime) {
        return 'lba_claim_and_deposit';
      }
      if (nowBigInt < lbaConfig.withdrawEndTime) {
        return 'lba_withdraw';
      }
      if (nowBigInt < lbaLiquidClaimDeadline) {
        return 'liquid_claim';
      }
      if (nowBigInt < lbaConfig.lpVestStartTime) {
        return 'pre_liquidity_unlock';
      }
      if (nowBigInt < lbaConfig.lpVestEndTime) {
        return 'liquidity_unlock';
      }
      return 'post_launch';
    })();

    return {
      stage,
      stageConfigTimestampsMillis: {
        depositStartTime: toMillis(lbaConfig.depositStartTime),
        depositEndTime: toMillis(lbaConfig.depositEndTime),
        withdrawEndTime: toMillis(lbaConfig.withdrawEndTime),
        lpVestStartTime: toMillis(lbaConfig.lpVestStartTime),
        lpVestEndTime: toMillis(lbaConfig.lpVestEndTime),
        initialPhaseLiquidClaimEndTime: toMillis(lbaLiquidClaimDeadline),
      },
    };
  };

  // Use a useQuery so that we can refetch at a set interval to update the current stage if needed
  return useQuery({
    queryKey: ['tokenLaunchStage'],
    queryFn,
    enabled: !disabled,
    refetchInterval: 5000,
  });
}

function toMillis(seconds: bigint) {
  return secondsToMilliseconds(Number(seconds));
}
