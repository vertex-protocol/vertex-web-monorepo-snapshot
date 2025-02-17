import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  QueryDisabledError,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { AppSubaccount } from 'client/context/subaccount/types';
import { useLpYields } from 'client/hooks/markets/useLpYields';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSpotInterestRates } from 'client/hooks/markets/useSpotInterestRates';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { useLatestOraclePrices } from 'client/hooks/query/markets/useLatestOraclePrices';
import { useSubaccountIsolatedPositions } from 'client/hooks/query/subaccount/isolatedPositions/useSubaccountIsolatedPositions';
import { useSubaccountSummary } from 'client/hooks/query/subaccount/subaccountSummary/useSubaccountSummary';
import { useSubaccountIndexerSnapshot } from 'client/hooks/subaccount/useSubaccountIndexerSnapshot';
import { getSubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/getSubaccountOverview';
import { SubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/types';
import { QueryState } from 'client/types/QueryState';
import { REACT_QUERY_CONFIG } from 'client/utils/reactQueryConfig';

function subaccountOverviewQueryKey(
  subaccount: AppSubaccount,
  // Last update times for important queries
  dataUpdateTimes: number[],
  // Used for queries where we don't need an instantaneous refresh when data updates
  hasOraclePricesData: boolean,
  hasMarketPricesData: boolean,
  hasLpYieldData: boolean,
  hasInterestRatesData: boolean,
) {
  return createQueryKey(
    'subaccountOverview',
    subaccount,
    dataUpdateTimes,
    hasOraclePricesData,
    hasMarketPricesData,
    hasLpYieldData,
    hasInterestRatesData,
  );
}

/**
 * A util hook to create commonly used derived data for the current subaccount
 */
export function useSubaccountOverview(): QueryState<SubaccountOverview> {
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const { currentSubaccount } = useSubaccountContext();

  // Required queries
  const {
    data: subaccountSummary,
    dataUpdatedAt: subaccountSummaryUpdatedAt,
    isLoading: isLoadingSubaccountSummary,
    isError: isSubaccountSummaryError,
    isPending: isSubaccountSummaryPending,
  } = useSubaccountSummary();
  const {
    data: isolatedPositions,
    dataUpdatedAt: isolatedPositionsUpdatedAt,
    isLoading: isLoadingIsolatedPositions,
    isError: isIsolatedPositionsError,
    isPending: isIsolatedPositionsPending,
  } = useSubaccountIsolatedPositions();

  // Optional queries
  const { data: indexerSnapshot, dataUpdatedAt: indexerSnapshotUpdatedAt } =
    useSubaccountIndexerSnapshot();
  const { data: lpYields } = useLpYields();
  const { data: spotInterestRates } = useSpotInterestRates();
  const { data: latestOraclePrices } = useLatestOraclePrices();
  const { data: latestMarketPrices } = useAllMarketsLatestPrices();

  // Disable query updates if we're currently loading summary / iso position data, this helps to prevent cases where
  // query data (esp. for quote balances) becomes out of sync after a refetch
  const disabled =
    !subaccountSummary ||
    !isolatedPositions ||
    isSubaccountSummaryPending ||
    isIsolatedPositionsPending;

  const queryFn = (): SubaccountOverview => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    return getSubaccountOverview({
      subaccountSummary,
      isolatedPositions,
      indexerSnapshot,
      primaryQuotePriceUsd,
      spotInterestRates,
      lpYields,
      latestOraclePrices,
      latestMarketPrices,
    });
  };

  const { data: mappedData } = useQuery({
    queryKey: subaccountOverviewQueryKey(
      currentSubaccount,
      [
        subaccountSummaryUpdatedAt,
        isolatedPositionsUpdatedAt,
        indexerSnapshotUpdatedAt,
      ],
      !!latestOraclePrices,
      !!latestMarketPrices,
      !!lpYields,
      !!spotInterestRates,
    ),
    queryFn,
    // Prevents a "flash" in UI when query key changes, which occurs when subaccount overview data updates
    placeholderData: keepPreviousData,
    enabled: !disabled,
    gcTime: REACT_QUERY_CONFIG.computeQueryGcTime,
    staleTime: REACT_QUERY_CONFIG.computedQueryStaleTime,
  });

  return {
    data: mappedData,
    isLoading: isLoadingSubaccountSummary || isLoadingIsolatedPositions,
    isError: isSubaccountSummaryError || isIsolatedPositionsError,
  };
}
