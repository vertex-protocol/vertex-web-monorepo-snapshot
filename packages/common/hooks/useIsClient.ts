import { useSyncExternalStore } from 'react';

/**
 * Returns `false` when on the server and during hydration, `true` after hydration.
 * Helpful for avoiding hydration mismatch errors and generally controlling when client-specific logic should run.
 * Uses `useSyncExternalStore` internally. For a full explanation, see the following article:
 * https://tkdodo.eu/blog/avoiding-hydration-mismatches-with-use-sync-external-store
 */
export function useIsClient() {
  const isClient = useSyncExternalStore(
    // An empty subscribe, basically a no-op.
    emptySubscribe,
    // Called on the client after hydration.
    () => true,
    // Called on the server and during hydration.
    () => false,
  );

  return isClient;
}

function emptySubscribe() {
  return () => {};
}
