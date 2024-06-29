import { useQuery } from '@tanstack/react-query';
import {
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useEffect } from 'react';

export function useGeolocationBlock() {
  const vertexClient = usePrimaryChainVertexClient();
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
