import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useStakingState } from 'client/hooks/query/vrtxToken/useStakingState';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { last } from 'lodash';
import { useMemo } from 'react';

export function useLastStakingRewardsDistributionAmount() {
  const { data: stakingState } = useStakingState();
  const { primaryQuoteToken } = useVertexMetadataContext();

  return useMemo(() => {
    return removeDecimals(
      last(stakingState?.rewardsDistributions)?.amount,
      primaryQuoteToken.tokenDecimals,
    );
  }, [stakingState?.rewardsDistributions, primaryQuoteToken.tokenDecimals]);
}
