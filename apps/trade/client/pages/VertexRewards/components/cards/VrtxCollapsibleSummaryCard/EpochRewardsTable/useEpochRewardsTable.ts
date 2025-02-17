import {
  BigDecimal,
  GetIndexerPaginatedRewardsResponse,
  IndexerRewardsEpoch,
  LBA_AIRDROP_EPOCH,
} from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { useAddressPaginatedRewards } from 'client/hooks/query/rewards/useAddressPaginatedRewards';
import { useAccountTokenClaimState } from 'client/hooks/query/vrtxToken/useAccountTokenClaimState';
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
  isPreLbaAirdropEpoch: boolean;
}

const PAGE_SIZE = 5;

function extractItems(
  data: GetIndexerPaginatedRewardsResponse,
): IndexerRewardsEpoch[] {
  return data.epochs;
}

export function useEpochRewardsTable() {
  const {
    protocolTokenMetadata: {
      token: { tokenDecimals },
    },
  } = useVertexMetadataContext();
  const {
    data: paginatedRewardsData,
    isLoading: isLoadingPaginatedData,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
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

  const {
    pageCount,
    paginationState,
    setPaginationState,
    getPageData,
    isFetchingCurrPage,
  } = useDataTablePagination<
    GetIndexerPaginatedRewardsResponse,
    IndexerRewardsEpoch
  >({
    numPagesFromQuery: paginatedRewardsData?.pages.length,
    pageSize: PAGE_SIZE,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    extractItems,
  });

  const mappedEpochs = useMemo((): EpochRewardsTableData[] | undefined => {
    if (!paginatedRewardsData) {
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
        isPreLbaAirdropEpoch,
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
      isLoadingAccountTokenClaimState ||
      isLoadingTokenClaimDeadlines ||
      isFetchingCurrPage,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
