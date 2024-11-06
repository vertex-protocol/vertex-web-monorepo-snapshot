import { LBA_AIRDROP_EPOCH } from '@vertex-protocol/client';
import {
  BigDecimal,
  BigDecimals,
  removeDecimals,
} from '@vertex-protocol/utils';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { useAccountLbaState } from 'client/hooks/query/vrtxToken/useAccountLbaState';
import { useAccountTokenClaimState } from 'client/hooks/query/vrtxToken/useAccountTokenClaimState';
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
  const { protocolTokenMetadata } = useVertexMetadataContext();
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
      protocolTokenMetadata.token.tokenDecimals,
    );
    const preClaimedAmount = removeDecimals(
      lbaState.depositedVrtx,
      protocolTokenMetadata.token.tokenDecimals,
    );
    const totalClaimedLbaAmount = removeDecimals(
      get(tokenClaimState.claimedPerEpoch, LBA_AIRDROP_EPOCH, BigDecimals.ZERO),
      protocolTokenMetadata.token.tokenDecimals,
    );

    return {
      liquidClaimedAmount: totalClaimedLbaAmount.minus(preClaimedAmount),
      preClaimedAmount,
      totalInitialPhaseAmount: totalLbaRewards,
      unclaimedAmount: totalLbaRewards.minus(totalClaimedLbaAmount),
    };
  }, [lbaState, tokenClaimState, protocolTokenMetadata.token.tokenDecimals]);

  return {
    data: mappedData,
  };
}
