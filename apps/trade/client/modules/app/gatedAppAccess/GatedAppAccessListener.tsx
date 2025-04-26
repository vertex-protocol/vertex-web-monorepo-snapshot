'use client';

import {
  useEVMContext,
  useQueryIpBlockStatus,
} from '@vertex-protocol/react-client';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useCloudflareRedirect } from 'client/modules/app/gatedAppAccess/UseCloudflareRedirect';
import { useEffect } from 'react';

/**
 * Listener and event handler for workflows that involve access restriction for the frontend, for example:
 * - Disconnecting currently connected wallet if IP blocked
 * - Redirecting to the Cloudflare JS challenge page if required
 */
export function GatedAppAccessListener() {
  const { show } = useDialog();
  const { disconnect } = useEVMContext();

  const { data: ipBlockStatus } = useQueryIpBlockStatus();
  useCloudflareRedirect();

  const isIpBlocked = !!ipBlockStatus;
  // Disconnect & show dialog if geolocation is blocked
  useEffect(() => {
    if (isIpBlocked) {
      disconnect();
      show({ type: 'location_restricted', params: {} });
    }
  }, [disconnect, isIpBlocked, show]);

  return null;
}
