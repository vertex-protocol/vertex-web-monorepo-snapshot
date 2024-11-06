import { GetIndexerSubaccountLpEventsParams } from '@vertex-protocol/indexer-client';
import { EXPORT_HISTORY_QUERY_PAGE_SIZE } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/consts';
import { GetExportHistoryDataContext } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/types';
import { formatExportHistoryTimestamp } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/utils';
import {
  ExportHistoryLpItem,
  GetExportHistoryDataParams,
} from 'client/pages/Portfolio/subpages/History/exportHistory/types';
import { getHistoricalLpEventsTableItem } from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalLpEventsTable';
import { millisecondsToSeconds } from 'date-fns';

export async function getExportHistoryLpData(
  params: GetExportHistoryDataParams,
  context: GetExportHistoryDataContext,
) {
  const {
    subaccount,
    vertexClient,
    allMarketsStaticData,
    primaryQuotePriceUsd,
  } = context;
  const items: ExportHistoryLpItem[] = [];

  let startCursor: string | undefined = undefined;

  queryLoop: while (true) {
    const queryParams: GetIndexerSubaccountLpEventsParams = {
      subaccountOwner: subaccount.address,
      subaccountName: subaccount.name,
      maxTimestampInclusive: millisecondsToSeconds(params.endTimeMillis),
      limit: EXPORT_HISTORY_QUERY_PAGE_SIZE,
      startCursor,
    };

    const lpEventsResponse =
      await vertexClient.context.indexerClient.getPaginatedSubaccountLpEvents(
        queryParams,
      );

    for (const event of lpEventsResponse.events) {
      const productId = event.baseSnapshot.market.productId;
      const staticMarketData = allMarketsStaticData.all[productId];

      if (!staticMarketData) {
        continue;
      }

      const tableItem = getHistoricalLpEventsTableItem({
        event,
        staticMarketData,
        primaryQuotePriceUsd,
        primaryQuoteToken: allMarketsStaticData.primaryQuote.metadata.token,
      });

      // Check timestamp
      if (tableItem.timestampMillis < params.startTimeMillis) {
        break queryLoop;
      }

      items.push({
        time: formatExportHistoryTimestamp(tableItem.timestampMillis),
        primaryQuoteAmountDelta: tableItem.amountChanges.quoteAmount.toString(),
        baseAsset: tableItem.metadata.base.symbol,
        baseAssetAmountDelta: tableItem.amountChanges.baseAmount.toString(),
        lpAmountDelta: tableItem.lpAmount.toString(),
      });
    }

    // Update the next cursor
    startCursor = lpEventsResponse.meta.nextCursor;
    // Break if there are no more events for pagination
    if (!lpEventsResponse.meta.hasMore || !startCursor) {
      break;
    }
  }

  return items;
}
