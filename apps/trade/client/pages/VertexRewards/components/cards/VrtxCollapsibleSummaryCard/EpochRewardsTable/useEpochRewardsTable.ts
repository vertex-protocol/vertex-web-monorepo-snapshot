import {
  BigDecimal,
  GetIndexerPaginatedRewardsResponse,
  IndexerRewardsEpoch,
  LBA_AIRDROP_EPOCH,
} from '@vertex-protocol/client';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useAccountTokenClaimState } from 'client/hooks/query/vrtxToken/useAccountTokenClaimState';
import { useAddressPaginatedRewards } from 'client/hooks/query/rewards/useAddressPaginatedRewards';
import { useTokenClaimDeadlines } from 'client/hooks/query/vrtxToken/useTokenClaimDeadlines';
import { toVrtxRewardEpoch } from 'client/modules/rewards/utils/toVrtxRewardEpoch';
import { isBefore } from 'date-fns';
import { now } from 'lodash';
import { useMemo } from 'react';

export interface EpochRewardsTableData {
  epochIntervalMillis: {
    from: number;
    to: number;
  };
  rewardsPool: {
    totalRewards: BigDecimal;
    subaccountShareFrac: BigDecimal;
  };
  epochNumber: number;
  isCurrent: boolean;
  // Initial phase = before LBA
  isInitialPhase: boolean;
  subaccountFees: BigDecimal;
  rewardsEarned: BigDecimal | undefined;
  rewardsUnclaimed: BigDecimal | undefined;
  claimDeadlineMillis: number | undefined;
  isPastClaimDeadline: boolean;
}

const PAGE_SIZE = 5;

function extractItems(
  data: GetIndexerPaginatedRewardsResponse,
): IndexerRewardsEpoch[] {
  return data.epochs;
}

export function useEpochRewardsTable() {
  const {
    protocolToken: { tokenDecimals },
  } = useVertexMetadataContext();
  const {
    data: paginatedRewardsData,
    isLoading: isLoadingPaginatedData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useAddressPaginatedRewards({
    pageSize: PAGE_SIZE,
  });
  const {
    data: accountTokenClaimState,
    isLoading: isLoadingAccountTokenClaimState,
  } = useAccountTokenClaimState();
  const { data: tokenClaimDeadlines, isLoading: isLoadingTokenClaimDeadlines } =
    useTokenClaimDeadlines();

  const { pageCount, paginationState, setPaginationState, getPageData } =
    useDataTablePagination<
      GetIndexerPaginatedRewardsResponse,
      IndexerRewardsEpoch
    >({
      queryPageCount: paginatedRewardsData?.pages.length,
      pageSize: PAGE_SIZE,
      hasNextPage,
      fetchNextPage,
      extractItems,
    });

  const mappedEpochs = useMemo((): EpochRewardsTableData[] | undefined => {
    if (
      !paginatedRewardsData ||
      !accountTokenClaimState ||
      !tokenClaimDeadlines
    ) {
      return;
    }

    const nowInMillis = now();

    return getPageData(paginatedRewardsData).map((baseIndexerEpoch) => {
      const epoch = toVrtxRewardEpoch({
        nowInMillis,
        indexerRewardEpoch: baseIndexerEpoch,
        accountTokenClaimState,
        tokenClaimDeadlines,
        vrtxTokenDecimals: tokenDecimals,
      });

      // Indexer does not return epochs in the future, so the current epoch is one that hasn't ended
      const isCurrent = isBefore(nowInMillis, epoch.epochIntervalMillis.to);
      // All LBA epochs are consolidated into the LBA_AIRDROP_EPOCH
      const isPreLbaAirdropEpoch = epoch.epochNumber < LBA_AIRDROP_EPOCH;

      const isPastClaimDeadline =
        !!epoch.subaccountTokenClaim.claimDeadlineMillis &&
        isBefore(epoch.subaccountTokenClaim.claimDeadlineMillis, nowInMillis);

      const rewardsEarned = (() => {
        if (isCurrent || isPreLbaAirdropEpoch) {
          return;
        }

        return (
          epoch.subaccountTokenClaim.totalEarned ??
          epoch.subaccountRewards.trading
        );
      })();

      const rewardsUnclaimed = (() => {
        if (
          !epoch.subaccountTokenClaim.totalEarned ||
          !epoch.subaccountTokenClaim.claimed ||
          isPreLbaAirdropEpoch
        ) {
          return;
        }
        return epoch.subaccountTokenClaim.totalEarned.minus(
          epoch.subaccountTokenClaim.claimed,
        );
      })();

      const claimDeadlineMillis = isPreLbaAirdropEpoch
        ? undefined
        : epoch.subaccountTokenClaim.claimDeadlineMillis;

      return {
        epochNumber: epoch.epochNumber,
        isCurrent,
        isInitialPhase: epoch.epochNumber <= LBA_AIRDROP_EPOCH,
        epochIntervalMillis: epoch.epochIntervalMillis,
        subaccountFees: epoch.subaccountFees,
        rewardsPool: {
          totalRewards: epoch.totalRewards,
          subaccountShareFrac: epoch.subaccountShareFrac,
        },
        rewardsEarned,
        rewardsUnclaimed,
        claimDeadlineMillis,
        isPastClaimDeadline,
      };
    });
  }, [
    accountTokenClaimState,
    getPageData,
    paginatedRewardsData,
    tokenClaimDeadlines,
    tokenDecimals,
  ]);

  return {
    data: mappedEpochs,
    isLoading:
      isLoadingPaginatedData ||
      isFetchingNextPage ||
      isLoadingAccountTokenClaimState ||
      isLoadingTokenClaimDeadlines,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
