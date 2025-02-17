import { GetAccountReturnType } from '@wagmi/core/src/actions/getAccount';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { useAccount } from 'wagmi';

const PENDING_ACCOUNT_STATUSES: GetAccountReturnType['status'][] = [
  'connecting',
  'reconnecting',
];

/**
 * Util hook for determining when wagmi has successfully initialized connector state.
 *
 * Observed sequence is:
 * - `isClient` is `false` on the server and during hydration, `true` after hydration.
 * - When `isClient` is initially switched to `true`, `useAccount` status can still be in a `reconnecting`/`connecting` state.
 */
export function useDidInitializeWalletConnection() {
  const isClient = useIsClient();
  const { status: accountStatus } = useAccount();
  const [didInitialize, setDidInitialize] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (
      !didInitialize &&
      isClient &&
      // Only set didInitialize to true when we're in a "finalized" state - i.e disconnected / connected
      !PENDING_ACCOUNT_STATUSES.includes(accountStatus)
    ) {
      // Small delay to account for any potential lag for wagmi to load client state
      timeout = setTimeout(() => {
        setDidInitialize(true);
      }, 250);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [accountStatus, didInitialize, isClient]);

  return didInitialize;
}

/**
 * Returns `false` when on the server and during hydration, `true` after hydration.
 * https://tkdodo.eu/blog/avoiding-hydration-mismatches-with-use-sync-external-store
 */
export function useIsClient() {
  return useSyncExternalStore(
    // An empty subscribe, basically a no-op.
    emptySubscribe,
    // Called on the client after hydration.
    () => true,
    // Called on the server and during hydration.
    () => false,
  );
}

function emptySubscribe() {
  return () => {};
}
