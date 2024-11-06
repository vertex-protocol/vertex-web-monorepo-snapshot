import { GetIndexerSubaccountLiquidationEventsParams } from '@vertex-protocol/indexer-client';
import { EXPORT_HISTORY_QUERY_PAGE_SIZE } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/consts';
import { GetExportHistoryDataContext } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/types';
import { formatExportHistoryTimestamp } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/utils';
import {
  ExportHistoryLiquidationItem,
  GetExportHistoryDataParams,
} from 'client/pages/Portfolio/subpages/History/exportHistory/types';
import { getHistoricalLiquidationsTableItem } from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalLiquidationsTable';
import { millisecondsToSeconds } from 'date-fns';

export async function getExportHistoryLiquidationsData(
  params: GetExportHistoryDataParams,
  context: GetExportHistoryDataContext,
) {
  const {
    subaccount,
    vertexClient,
    allMarketsStaticData,
    primaryQuotePriceUsd,
  } = context;
  const items: ExportHistoryLiquidationItem[] = [];

  let startCursor: string | undefined = undefined;

  queryLoop: while (true) {
    const queryParams: GetIndexerSubaccountLiquidationEventsParams = {
      subaccountOwner: subaccount.address,
      subaccountName: subaccount.name,
      maxTimestampInclusive: millisecondsToSeconds(params.endTimeMillis),
      limit: EXPORT_HISTORY_QUERY_PAGE_SIZE,
      startCursor,
    };

    const liquidationEventsResponse =
      await vertexClient.context.indexerClient.getPaginatedSubaccountLiquidationEvents(
        queryParams,
      );

    for (const event of liquidationEventsResponse.events) {
      const tableItem = getHistoricalLiquidationsTableItem({
        allMarketsStaticData,
        event,
        primaryQuotePriceUsd,
      });

      if (!tableItem) {
        continue;
      }

      // Check timestamp
      if (tableItem.timestampMillis < params.startTimeMillis) {
        break queryLoop;
      }

      const formattedTimestamp = formatExportHistoryTimestamp(
        tableItem.timestampMillis,
      );

      // Add LPs first
      tableItem.decomposedLps.forEach((decomposedLp) => {
        items.push({
          time: formattedTimestamp,
          submissionIndex: tableItem.submissionIndex,
          balanceType: 'lp',
          productName: decomposedLp.sharedMetadata.symbol,
          amountLiquidated: decomposedLp.amountLpDecomposed.toString(),
          assetAmountDelta: decomposedLp.underlyingBalanceDelta.toString(),
        });
      });

      // Add spot
      if (tableItem.spot) {
        items.push({
          time: formattedTimestamp,
          submissionIndex: tableItem.submissionIndex,
          balanceType: 'spot',
          productName: tableItem.spot.sharedMetadata.symbol,
          amountLiquidated: tableItem.spot.amountLiquidated.toString(),
          assetAmountDelta: tableItem.spot.amountLiquidated
            .negated()
            .toString(),
        });
      }

      // Add perp
      if (tableItem.perp) {
        items.push({
          time: formattedTimestamp,
          submissionIndex: tableItem.submissionIndex,
          balanceType: 'perp',
          productName: tableItem.perp.sharedMetadata.marketName,
          amountLiquidated: tableItem.perp.amountLiquidated.toString(),
          assetAmountDelta: tableItem.perp.amountLiquidated
            .negated()
            .toString(),
        });
      }

      // Add primary quote transfer
      items.push({
        time: formattedTimestamp,
        submissionIndex: tableItem.submissionIndex,
        balanceType: 'spot',
        productName: allMarketsStaticData.primaryQuote.metadata.token.symbol,
        amountLiquidated: '0',
        assetAmountDelta: tableItem.quoteBalanceDelta.toString(),
      });
    }

    // Update the next cursor
    startCursor = liquidationEventsResponse.meta.nextCursor;
    // Break if there are no more events for pagination
    if (!liquidationEventsResponse.meta.hasMore || !startCursor) {
      break;
    }
  }

  return items;
}
