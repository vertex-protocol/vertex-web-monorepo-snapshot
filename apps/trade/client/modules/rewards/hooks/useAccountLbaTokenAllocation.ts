import { LBA_AIRDROP_EPOCH } from '@vertex-protocol/client';
import { BigDecimal } from '@vertex-protocol/utils';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useAccountLbaState } from 'client/hooks/query/vrtxToken/useAccountLbaState';
import { useAccountTokenClaimState } from 'client/hooks/query/vrtxToken/useAccountTokenClaimState';
import { BigDecimals } from 'client/utils/BigDecimals';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { get } from 'lodash';
import { useMemo } from 'react';

// All decimal adjusted
export interface AccountLbaTokenAllocation {
  // Total VRTX rewards from epochs 1-6
  totalInitialPhaseAmount: BigDecimal;
  // Amount claimed for LBA
  preClaimedAmount: BigDecimal;
  // Amount of liquid tokens claimed
  liquidClaimedAmount: BigDecimal;
  // Amount of unclaimed rewards
  unclaimedAmount: BigDecimal;
}

/**
 * Util hook to derive token allocation state for LBA
 */
export function useAccountLbaTokenAllocation() {
  const { protocolToken } = useVertexMetadataContext();
  const { data: lbaState } = useAccountLbaState();
  const { data: tokenClaimState } = useAccountTokenClaimState();

  const mappedData = useMemo((): AccountLbaTokenAllocation | undefined => {
    if (!lbaState || !tokenClaimState) {
      return;
    }

    const totalLbaRewards = removeDecimals(
      get(
        tokenClaimState.totalClaimablePerEpoch,
        LBA_AIRDROP_EPOCH,
        BigDecimals.ZERO,
      ),
      protocolToken.tokenDecimals,
    );
    const preClaimedAmount = removeDecimals(
      lbaState.depositedVrtx,
      protocolToken.tokenDecimals,
    );
    const totalClaimedLbaAmount = removeDecimals(
      get(tokenClaimState.claimedPerEpoch, LBA_AIRDROP_EPOCH, BigDecimals.ZERO),
      protocolToken.tokenDecimals,
    );

    return {
      liquidClaimedAmount: totalClaimedLbaAmount.minus(preClaimedAmount),
      preClaimedAmount,
      totalInitialPhaseAmount: totalLbaRewards,
      unclaimedAmount: totalLbaRewards.minus(totalClaimedLbaAmount),
    };
  }, [lbaState, tokenClaimState, protocolToken.tokenDecimals]);

  return {
    data: mappedData,
  };
}
