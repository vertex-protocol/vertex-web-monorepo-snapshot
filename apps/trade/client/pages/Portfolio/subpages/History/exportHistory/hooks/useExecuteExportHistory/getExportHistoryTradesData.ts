import { GetIndexerSubaccountMatchEventParams } from '@vertex-protocol/indexer-client';
import { getHistoricalTradesTableItem } from 'client/modules/tables/hooks/useHistoricalTradesTable';
import { EXPORT_HISTORY_QUERY_PAGE_SIZE } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/consts';
import { GetExportHistoryDataContext } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/types';
import { formatExportHistoryTimestamp } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/utils';
import {
  ExportHistoryTradeItem,
  GetExportHistoryDataParams,
} from 'client/pages/Portfolio/subpages/History/exportHistory/types';
import { millisecondsToSeconds } from 'date-fns';

export async function getExportHistoryTradesData(
  params: GetExportHistoryDataParams,
  context: GetExportHistoryDataContext,
) {
  const { subaccount, vertexClient, allMarketsStaticData } = context;
  const items: ExportHistoryTradeItem[] = [];

  let startCursor: string | undefined = undefined;

  queryLoop: while (true) {
    const queryParams: GetIndexerSubaccountMatchEventParams = {
      subaccountOwner: subaccount.address,
      subaccountName: subaccount.name,
      maxTimestampInclusive: millisecondsToSeconds(params.endTimeMillis),
      limit: EXPORT_HISTORY_QUERY_PAGE_SIZE,
      startCursor,
    };

    const matchEventsResponse =
      await vertexClient.context.indexerClient.getPaginatedSubaccountMatchEvents(
        queryParams,
      );

    for (const event of matchEventsResponse.events) {
      const staticMarketData = allMarketsStaticData.all[event.productId];
      const staticQuoteData = allMarketsStaticData.quotes[event.productId];

      if (!staticMarketData || !staticQuoteData) {
        continue;
      }

      const tableItem = getHistoricalTradesTableItem({
        event,
        staticMarketData,
        staticQuoteData,
      });

      // Check timestamp
      if (tableItem.timestampMillis < params.startTimeMillis) {
        break queryLoop;
      }

      items.push({
        time: formatExportHistoryTimestamp(tableItem.timestampMillis),
        marketName: tableItem.marketInfo.marketName,
        orderType: tableItem.orderType,
        amount: tableItem.filledAmount.toString(),
        avgPrice: tableItem.filledPrice.toString(),
        fee: tableItem.tradeFeeQuote.toString(),
        total: tableItem.tradeTotalCost.toString(),
      });
    }

    // Update the next cursor
    startCursor = matchEventsResponse.meta.nextCursor;
    // Break if there are no more events for pagination
    if (!matchEventsResponse.meta.hasMore || !startCursor) {
      break;
    }
  }

  return items;
}
