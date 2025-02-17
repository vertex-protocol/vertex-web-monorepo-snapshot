import {
  ConnectionStatus,
  EVMContextProvider,
  useEVMContext,
  useWagmiConfig,
  VertexClientContextProvider,
  VertexMetadataContextProvider,
} from '@vertex-protocol/react-client';
import { WithChildren } from '@vertex-protocol/web-common';
import { useTimeout } from 'ahooks';
import { BrandLoadingWrapper } from 'client/components/BrandIconLoadingWrapper/BrandLoadingWrapper';
import { getEVMContextParams } from 'client/context/appData/getEVMContextParams';
import { useChainEnvQueryParam } from 'client/context/appData/hooks/useChainEnvQueryParam';
import { useSavedPrimaryChainEnv } from 'client/context/appData/hooks/useSavedPrimaryChainEnv';
import { SubaccountContextProvider } from 'client/context/subaccount/SubaccountContextProvider';
import { AppVersion } from 'client/modules/app/components/AppVersion';
import { useSavedGlobalState } from 'client/modules/localstorage/globalState/useSavedGlobalState';
import { useEffect, useState } from 'react';
import { WagmiProvider } from 'wagmi';

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
    savedGlobalState: { readOnlyAddressOverride },
  } = useSavedGlobalState();
  const {
    savedPrimaryChainEnv,
    setSavedPrimaryChainEnv,
    didLoadPersistedValue,
  } = useSavedPrimaryChainEnv();

  const chainEnvQueryParam = useChainEnvQueryParam({
    supportedChainEnvs: evmContextParams.supportedChainEnvs,
  });
  const [didDetermineChainEnv, setDidDetermineChainEnv] = useState(false);

  useEffect(() => {
    if (didDetermineChainEnv || !didLoadPersistedValue) {
      return;
    }

    // Out of sync - set the saved chain env
    if (chainEnvQueryParam && savedPrimaryChainEnv !== chainEnvQueryParam) {
      console.debug(
        '[AppDataProviders] Setting saved chain env from query param',
        chainEnvQueryParam,
      );
      setSavedPrimaryChainEnv(chainEnvQueryParam);
    }

    setDidDetermineChainEnv(true);
  }, [
    chainEnvQueryParam,
    didLoadPersistedValue,
    savedPrimaryChainEnv,
    setSavedPrimaryChainEnv,
    didDetermineChainEnv,
    setDidDetermineChainEnv,
  ]);

  const wagmiConfig = useWagmiConfig({
    supportedChains: evmContextParams.supportedChains,
    connectorOptions: evmContextParams.connectorOptions,
  });

  return (
    <WagmiProvider config={wagmiConfig}>
      <EVMContextProvider
        primaryChainEnv={savedPrimaryChainEnv}
        setPrimaryChainEnv={setSavedPrimaryChainEnv}
        supportedChainEnvs={evmContextParams.supportedChainEnvs}
        supportedChains={evmContextParams.supportedChains}
        readOnlyAddressOverride={readOnlyAddressOverride}
      >
        <InitialLoadOverlay didDetermineChainEnv={didDetermineChainEnv}>
          <VertexClientContextProvider>
            <SubaccountContextProvider>
              <VertexMetadataContextProvider>
                {children}
              </VertexMetadataContextProvider>
            </SubaccountContextProvider>
          </VertexClientContextProvider>
        </InitialLoadOverlay>
      </EVMContextProvider>
    </WagmiProvider>
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
  didDetermineChainEnv,
}: WithChildren<{ didDetermineChainEnv: boolean }>) {
  const { connectionStatus } = useEVMContext();
  const isLoadingWalletConnection = INITIAL_LOAD_CONNECTION_STATUSES.has(
    connectionStatus.type,
  );

  const showOverlay = !didDetermineChainEnv || isLoadingWalletConnection;

  // Timeout to show the app in case of some weird case where we're stuck in a loading state
  const [isTimedOut, setIsTimedOut] = useState(false);
  useTimeout(() => {
    if (showOverlay) {
      console.warn(
        '[InitialLoadOverlay] Timed out waiting for initial load to complete',
      );
    }
    setIsTimedOut(true);
  }, 7500);

  return (
    <BrandLoadingWrapper
      indicatorContainerClassName="bg-background absolute inset-0 z-50 h-full w-full"
      isLoading={showOverlay && !isTimedOut}
      extraContent={
        <AppVersion className="absolute bottom-2 right-2 text-xs" />
      }
    >
      {children}
    </BrandLoadingWrapper>
  );
}
