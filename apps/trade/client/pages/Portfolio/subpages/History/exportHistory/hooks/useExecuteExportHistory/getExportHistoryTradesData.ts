import { GetIndexerSubaccountMatchEventParams } from '@vertex-protocol/indexer-client';
import { getHistoricalTradesTableItem } from 'client/modules/tables/hooks/useHistoricalTradesTable';
import {
  EXPORT_HISTORY_QUERY_DELAY_MILLIS,
  EXPORT_HISTORY_QUERY_PAGE_SIZE,
} from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/consts';
import { GetExportHistoryDataContext } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/types';
import { updateProgressFrac } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/utils';
import {
  ExportHistoryTradeItem,
  GetExportHistoryDataParams,
} from 'client/pages/Portfolio/subpages/History/exportHistory/types';
import { delay } from 'client/utils/delay';
import { millisecondsToSeconds } from 'date-fns';
import { last } from 'lodash';

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
      const staticMarketData = allMarketsStaticData.allMarkets[event.productId];
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
        time: new Date(tableItem.timestampMillis),
        marketName: tableItem.marketInfo.marketName,
        orderType: tableItem.orderType,
        marginModeType: tableItem.marginModeType,
        amount: tableItem.filledAmount,
        avgPrice: tableItem.filledPrice,
        fee: tableItem.tradeFeeQuote,
        total: tableItem.tradeTotalCost,
      });
    }

    // Update the next cursor
    startCursor = matchEventsResponse.meta.nextCursor;
    // Break if there are no more events for pagination
    if (!matchEventsResponse.meta.hasMore || !startCursor) {
      break;
    }

    updateProgressFrac(params, context, last(items)?.time);

    // Reduce chance of rate limiting.
    await delay(EXPORT_HISTORY_QUERY_DELAY_MILLIS);
  }

  return items;
}
