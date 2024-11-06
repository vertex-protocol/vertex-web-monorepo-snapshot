import { GetIndexerSubaccountCollateralEventsParams } from '@vertex-protocol/client';
import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { CollateralEventType } from '@vertex-protocol/indexer-client/dist/types/collateralEventType';
import { EXPORT_HISTORY_QUERY_PAGE_SIZE } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/consts';
import { GetExportHistoryDataContext } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/types';
import { formatExportHistoryTimestamp } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/utils';
import {
  ExportHistoryCollateralItem,
  GetExportHistoryDataParams,
} from 'client/pages/Portfolio/subpages/History/exportHistory/types';
import { getHistoricalCollateralEventsTableItem } from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalCollateralEventsTable';
import { millisecondsToSeconds } from 'date-fns';

export async function getExportHistoryCollateralData(
  params: GetExportHistoryDataParams,
  context: GetExportHistoryDataContext,
) {
  const {
    subaccount,
    vertexClient,
    allMarketsStaticData,
    primaryQuotePriceUsd,
  } = context;
  const items: ExportHistoryCollateralItem[] = [];

  let startCursor: string | undefined = undefined;
  const queryEventTypes = ((): CollateralEventType[] => {
    switch (params.type) {
      case 'deposits':
        return ['deposit_collateral'];
      case 'withdrawals':
        return ['withdraw_collateral'];
      case 'transfers':
        return ['transfer_quote'];
      default:
        throw Error(
          `Invalid history export type for getting collateral data ${params.type}`,
        );
    }
  })();

  queryLoop: while (true) {
    const queryParams: GetIndexerSubaccountCollateralEventsParams = {
      subaccountOwner: subaccount.address,
      subaccountName: subaccount.name,
      maxTimestampInclusive: millisecondsToSeconds(params.endTimeMillis),
      limit: EXPORT_HISTORY_QUERY_PAGE_SIZE,
      startCursor,
      eventTypes: queryEventTypes,
    };

    const collateralEventsResponse =
      await vertexClient.context.indexerClient.getPaginatedSubaccountCollateralEvents(
        queryParams,
      );

    for (const event of collateralEventsResponse.events) {
      const productId = event.snapshot.market.productId;
      const staticMarketData =
        productId === QUOTE_PRODUCT_ID
          ? allMarketsStaticData.primaryQuote
          : allMarketsStaticData.spot[productId];

      if (!staticMarketData) {
        continue;
      }

      const tableItem = getHistoricalCollateralEventsTableItem({
        staticMarketData,
        event,
        primaryQuotePriceUsd,
        // These are not needed for the export data
        allProductsWithdrawPoolLiquidityData: undefined,
        areWithdrawalsProcessingData: undefined,
      });

      // Check timestamp
      if (tableItem.timestampMillis < params.startTimeMillis) {
        break queryLoop;
      }

      items.push({
        time: formatExportHistoryTimestamp(tableItem.timestampMillis),
        asset: staticMarketData.metadata.token.symbol,
        balanceChange: tableItem.amount.toString(),
      });
    }

    // Update the next cursor
    startCursor = collateralEventsResponse.meta.nextCursor;
    // Break if there are no more events for pagination
    if (!collateralEventsResponse.meta.hasMore || !startCursor) {
      break;
    }
  }

  return items;
}
