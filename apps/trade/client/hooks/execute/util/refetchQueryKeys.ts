import { currentSubaccountSummaryQueryKey } from 'client/hooks/query/subaccount/useCurrentSubaccountSummary';
import { maxMintLpAmountQueryKey } from 'client/hooks/query/subaccount/useMaxMintLpAmount';
import { maxOrderSizeQueryKey } from 'client/hooks/query/subaccount/useMaxOrderSize';
import { maxWithdrawableQueryKey } from 'client/hooks/query/subaccount/useMaxWithdrawableAmount';
import { subaccountIndexerSnapshotsQueryKey } from 'client/hooks/query/subaccount/useSubaccountIndexerSnapshots';
import { subaccountOpenEngineOrdersQueryKey } from 'client/hooks/query/subaccount/useSubaccountOpenEngineOrders';
import { subaccountOpenTriggerOrdersQueryKey } from 'client/hooks/query/subaccount/useSubaccountOpenTriggerOrders';
import { subaccountPaginatedHistoricalTradesQueryKey } from 'client/hooks/query/subaccount/useSubaccountPaginatedHistoricalTrades';
import { subaccountPaginatedRealizedPnlEventsQueryKey } from 'client/hooks/query/subaccount/useSubaccountPaginatedRealizedPnlEvents';

export const SUBACCOUNT_SUMMARY_QUERY_KEYS = [
  currentSubaccountSummaryQueryKey(),
  subaccountIndexerSnapshotsQueryKey(),
];

export const MAX_SIZE_QUERY_KEYS = [
  maxOrderSizeQueryKey(),
  maxWithdrawableQueryKey(),
  maxMintLpAmountQueryKey(),
];

export const OPEN_TRIGGER_ORDER_QUERY_KEYS = [
  subaccountOpenTriggerOrdersQueryKey(),
];

// This can be used to "dumb-refetch" all engine orders for the subaccount. Usage of this is generally discouraged
// Use `useRefetchOpenEngineOrders` instead
export const OPEN_ENGINE_ORDER_QUERY_KEYS = [
  subaccountOpenEngineOrdersQueryKey(),
];

// Query keys associated with an order fill, does NOT contain the query key for historical order fills, because these keys
// are used to refetch queries as a result of a historical fill. If we added the historical fill query key here, we would
// end up refetching the historical fills as well, resulting in a loop of sorts
export const ORDER_FILL_QUERY_KEYS = [
  subaccountPaginatedRealizedPnlEventsQueryKey(),
  subaccountPaginatedHistoricalTradesQueryKey(),
  ...SUBACCOUNT_SUMMARY_QUERY_KEYS,
  ...MAX_SIZE_QUERY_KEYS,
];
