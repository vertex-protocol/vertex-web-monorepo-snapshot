import { useQuery } from '@tanstack/react-query';
import { useVertexClient } from '@vertex-protocol/web-data';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { useEffect } from 'react';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function useGeolocationBlock() {
  const vertexClient = useVertexClient();
  const { disconnect } = useSubaccountContext();
  const { show } = useDialog();

  const disabled = !vertexClient;
  const { data: isBlocked } = useQuery({
    queryKey: ['isBlockedIp'],
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.context.engineClient.getIsBlockedIp();
    },
    enabled: !disabled,
  });

  // Disconnect & show dialog if geolocation is blocked
  useEffect(() => {
    if (isBlocked) {
      disconnect();
      show({ type: 'location_restricted', params: {} });
    }
  }, [disconnect, isBlocked, show]);

  return { isBlockedGeolocation: Boolean(isBlocked) };
}
