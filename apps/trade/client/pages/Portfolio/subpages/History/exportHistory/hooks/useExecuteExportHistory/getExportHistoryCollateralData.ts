import { GetIndexerSubaccountCollateralEventsParams } from '@vertex-protocol/client';
import { CollateralEventType } from '@vertex-protocol/indexer-client/dist/types/collateralEventType';
import { getStaticMarketDataForProductId } from 'client/hooks/markets/marketsStaticData/getStaticMarketDataForProductId';
import { SpotStaticMarketData } from 'client/hooks/markets/marketsStaticData/types';
import {
  EXPORT_HISTORY_QUERY_DELAY_MILLIS,
  EXPORT_HISTORY_QUERY_PAGE_SIZE,
} from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/consts';
import { GetExportHistoryDataContext } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/types';
import { updateProgressFrac } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/utils';
import {
  ExportHistoryCollateralItem,
  GetExportHistoryDataParams,
} from 'client/pages/Portfolio/subpages/History/exportHistory/types';
import { getHistoricalCollateralEventsTableItem } from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalCollateralEventsTable';
import { delay } from 'client/utils/delay';
import { millisecondsToSeconds } from 'date-fns';
import { last } from 'lodash';

export async function getExportHistoryCollateralData(
  params: GetExportHistoryDataParams,
  context: GetExportHistoryDataContext,
) {
  const {
    subaccount,
    vertexClient,
    allMarketsStaticData,
    primaryQuotePriceUsd,
    getSubaccountProfile,
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
        throw new Error(
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
      const staticSpotMarketData =
        getStaticMarketDataForProductId<SpotStaticMarketData>(
          productId,
          allMarketsStaticData,
        );

      if (!staticSpotMarketData) {
        continue;
      }

      const tableItem = getHistoricalCollateralEventsTableItem({
        event,
        staticSpotMarketData,
        allMarketsStaticData,
        primaryQuotePriceUsd,
        getSubaccountProfile,
        // These are not needed for the export data
        allProductsWithdrawPoolLiquidityData: undefined,
        areWithdrawalsProcessingData: undefined,
      });

      // Check timestamp
      if (tableItem.timestampMillis < params.startTimeMillis) {
        break queryLoop;
      }

      items.push({
        time: new Date(tableItem.timestampMillis),
        asset: staticSpotMarketData.metadata.token.symbol,
        balanceChange: tableItem.amount,
        ...tableItem.transferEventData,
      });
    }

    // Update the next cursor
    startCursor = collateralEventsResponse.meta.nextCursor;
    // Break if there are no more events for pagination
    if (!collateralEventsResponse.meta.hasMore || !startCursor) {
      break;
    }

    updateProgressFrac(params, context, last(items)?.time);

    // Reduce chance of rate limiting.
    await delay(EXPORT_HISTORY_QUERY_DELAY_MILLIS);
  }

  return items;
}
