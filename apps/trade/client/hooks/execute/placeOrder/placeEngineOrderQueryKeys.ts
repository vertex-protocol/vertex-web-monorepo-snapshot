import {
  MAX_SIZE_QUERY_KEYS,
  SUBACCOUNT_SUMMARY_QUERY_KEYS,
} from 'client/hooks/execute/util/refetchQueryKeys';
import { subaccountLatestFillOrderEventsQueryKey } from 'client/hooks/query/subaccount/useSubaccountLatestFillOrderEvents';

export const PLACE_ENGINE_ORDER_QUERY_KEYS = [
  ...SUBACCOUNT_SUMMARY_QUERY_KEYS,
  ...MAX_SIZE_QUERY_KEYS,
  // If there is a fill, then historical data is refetched via ORDER_FILL_QUERY_KEYS
  // If there is no fill, then nothing else should be impacted
  subaccountLatestFillOrderEventsQueryKey(),
];
