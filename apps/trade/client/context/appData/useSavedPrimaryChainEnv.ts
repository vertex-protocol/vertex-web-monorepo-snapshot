import { ChainEnv } from '@vertex-protocol/client';
import { useSavedGlobalState } from 'client/modules/localstorage/globalState/useSavedGlobalState';
import { useCallback } from 'react';

export function useSavedPrimaryChainEnv() {
  const { savedGlobalState, setSavedGlobalState, didLoadPersistedValue } =
    useSavedGlobalState();

  const savedPrimaryChainEnv = savedGlobalState.lastSelectedChainEnv;
  const setSavedPrimaryChainEnv = useCallback(
    (chainEnv: ChainEnv) => {
      setSavedGlobalState((prev) => {
        return {
          ...prev,
          lastSelectedChainEnv: chainEnv,
        };
      });
      // App isn't setup for "hot" swapping of chain envs yet, so force a page refresh
      location.reload();
    },
    [setSavedGlobalState],
  );

  return {
    savedPrimaryChainEnv,
    setSavedPrimaryChainEnv,
    didLoadPersistedValue,
  };
}
