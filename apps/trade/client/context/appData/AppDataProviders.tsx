import { WithChildren } from '@vertex-protocol/web-common';
import {
  ConnectionStatus,
  EVMContextProvider,
  useEVMContext,
  VertexClientContextProvider,
} from '@vertex-protocol/react-client';
import { useTimeout } from 'ahooks';
import { BrandIconLoadingIndicator } from 'client/components/BrandIconLoadingIndicator';
import { getEVMContextParams } from 'client/context/appData/getEVMContextParams';
import { useChainEnvQueryParam } from 'client/context/appData/hooks/useChainEnvQueryParam';
import { useSavedPrimaryChainEnv } from 'client/context/appData/hooks/useSavedPrimaryChainEnv';
import { SubaccountContextProvider } from 'client/context/subaccount/SubaccountContext';
import { VertexMetadataContextProvider } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useEffect, useRef, useState } from 'react';

const evmContextParams = getEVMContextParams();

/**
 * Component for aggregating all the vertex data related context providers required for the app.
 *
 * - Renders a loading overlay instead of children until initial client load is complete. This prevents initial queries being made on the incorrect
 * chain before localstorage state is loaded.
 * - Listens to the `chain` query param to set the saved chain env if provided. The query param acts as the source of truth and has higher priority
 * than the saved chain env.
 */
export function AppDataProviders({ children }: WithChildren) {
  const {
    savedPrimaryChainEnv,
    setSavedPrimaryChainEnv,
    didLoadPersistedValue,
  } = useSavedPrimaryChainEnv();

  const chainEnvQueryParam = useChainEnvQueryParam({
    supportedChainEnvs: evmContextParams.supportedChainEnvs,
  });
  const didHandleChainQueryParam = useRef(false);

  useEffect(() => {
    if (didHandleChainQueryParam.current || !chainEnvQueryParam) {
      return;
    }

    // Out of sync - set the saved chain env
    if (didLoadPersistedValue && savedPrimaryChainEnv !== chainEnvQueryParam) {
      console.debug(
        '[AppDataProviders] Setting saved chain env from query param',
        chainEnvQueryParam,
      );
      setSavedPrimaryChainEnv(chainEnvQueryParam);
      didHandleChainQueryParam.current = true;
    }
  }, [
    chainEnvQueryParam,
    didLoadPersistedValue,
    savedPrimaryChainEnv,
    setSavedPrimaryChainEnv,
  ]);

  return (
    <EVMContextProvider
      {...evmContextParams}
      primaryChainEnv={savedPrimaryChainEnv}
      setPrimaryChainEnv={setSavedPrimaryChainEnv}
    >
      <InitialLoadOverlay didLoadChainEnv={didLoadPersistedValue}>
        <VertexClientContextProvider>
          <SubaccountContextProvider>
            <VertexMetadataContextProvider>
              {children}
            </VertexMetadataContextProvider>
          </SubaccountContextProvider>
        </VertexClientContextProvider>
      </InitialLoadOverlay>
    </EVMContextProvider>
  );
}

const INITIAL_LOAD_CONNECTION_STATUSES: Set<ConnectionStatus['type']> = new Set(
  ['initializing', 'reconnecting'],
);

/**
 * Loading overlay shown when localstorage for last persisted chain env is being loaded & when wagmi is still initializing/reconnecting
 * This must be a child of EVMContextProvider as we need to access the context state
 */
function InitialLoadOverlay({
  children,
  didLoadChainEnv,
}: WithChildren<{ didLoadChainEnv: boolean }>) {
  const { connectionStatus } = useEVMContext();
  const isLoadingWalletConnection = INITIAL_LOAD_CONNECTION_STATUSES.has(
    connectionStatus.type,
  );

  const showOverlay = !didLoadChainEnv || isLoadingWalletConnection;

  // Timeout to show the app in case of some weird case where we're stuck in a loading state
  const [isTimedOut, setIsTimedOut] = useState(false);
  useTimeout(() => {
    if (!showOverlay) {
      console.warn(
        '[InitialLoadOverlay] Timed out waiting for initial load to complete',
      );
    }
    setIsTimedOut(true);
  }, 7500);

  const overlay = (
    <div className="bg-background absolute inset-0 z-50 flex h-full w-full items-center justify-center">
      <BrandIconLoadingIndicator size={72} />
    </div>
  );

  if (showOverlay && !isTimedOut) {
    return overlay;
  }

  return <>{children}</>;
}
