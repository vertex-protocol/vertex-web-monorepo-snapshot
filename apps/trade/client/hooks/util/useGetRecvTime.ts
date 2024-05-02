import { useCallback } from 'react';
import { getDefaultRecvTime } from '@vertex-protocol/contracts';
import { useServerTime } from 'client/hooks/query/useServerTime';
import { useSyncedRef } from 'client/hooks/util/useSyncedRef';

/**
 * Util hook for computing recvTime with server time (if available). This makes the app more bulletproof
 * against cases where the client's time is not synced.
 */
export function useGetRecvTime() {
  const { data: serverTime } = useServerTime();
  const serverTimeRef = useSyncedRef(serverTime);

  // Compute recvTime via server time, but if the query fails (i.e. no data), default back to client time
  return useCallback(async () => {
    return getDefaultRecvTime(serverTimeRef.current ?? Date.now());
  }, [serverTimeRef]);
}
