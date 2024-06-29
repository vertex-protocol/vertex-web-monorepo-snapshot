import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useAddressPaginatedRewards } from 'client/hooks/query/rewards/useAddressPaginatedRewards';
import { useAccountTokenClaimState } from 'client/hooks/query/vrtxToken/useAccountTokenClaimState';
import { useTokenClaimDeadlines } from 'client/hooks/query/vrtxToken/useTokenClaimDeadlines';
import { toVrtxRewardEpoch } from 'client/modules/rewards/utils/toVrtxRewardEpoch';
import { get, now } from 'lodash';
import { useMemo } from 'react';

/**
 * Util hook for retrieving the latest & last completed reward epochs for the user
 */
export function useLatestRewardsEpochs() {
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const { data: rewardsData } = useAddressPaginatedRewards({
    // We need the 2 most recent epochs - the current and the most recently completed
    pageSize: 2,
  });
  const { data: accountTokenClaimState } = useAccountTokenClaimState();
  const { data: tokenClaimDeadlines } = useTokenClaimDeadlines();

  const mappedData = useMemo(() => {
    if (!rewardsData) {
      return {};
    }

    const nowInMillis = now();

    const firstPage = get(rewardsData.pages, 0, undefined);
    const currentEpochData = get(firstPage?.epochs, 0, undefined);
    const lastCompletedEpochData = get(firstPage?.epochs, 1, undefined);

    const currentEpoch = currentEpochData
      ? toVrtxRewardEpoch({
          indexerRewardEpoch: currentEpochData,
          nowInMillis,
          vrtxTokenDecimals: protocolTokenMetadata.token.tokenDecimals,
          accountTokenClaimState,
          tokenClaimDeadlines,
        })
      : undefined;
    const lastCompletedEpoch = lastCompletedEpochData
      ? toVrtxRewardEpoch({
          indexerRewardEpoch: lastCompletedEpochData,
          nowInMillis,
          vrtxTokenDecimals: protocolTokenMetadata.token.tokenDecimals,
          accountTokenClaimState,
          tokenClaimDeadlines,
        })
      : undefined;

    return {
      currentEpoch,
      lastCompletedEpoch,
    };
  }, [
    accountTokenClaimState,
    protocolTokenMetadata.token.tokenDecimals,
    rewardsData,
    tokenClaimDeadlines,
  ]);

  return {
    data: mappedData,
  };
}
