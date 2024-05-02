import { WithChildren } from '@vertex-protocol/web-common';
import {
  EVMContextProvider,
  VertexClientContextProvider,
} from '@vertex-protocol/web-data';
import { getEVMContextParams } from 'client/context/appData/getEVMContextParams';
import { useSavedPrimaryChainEnv } from 'client/context/appData/useSavedPrimaryChainEnv';
import { SubaccountContextProvider } from 'client/context/subaccount/SubaccountContext';
import { VertexMetadataContextProvider } from 'client/context/vertexMetadata/VertexMetadataContext';
import { InitialMountLoadingOverlay } from 'client/modules/app/InitialMountLoadingOverlay';

const evmContextParams = getEVMContextParams();

/**
 * Component for aggregating all the vertex data related context providers required for the app. Renders a loading overlay
 * instead of children until initial client load is complete. This prevents initial queries being made on the incorrect
 * chain before localstorage state is loaded
 */
export function AppDataProviders({ children }: WithChildren) {
  const {
    savedPrimaryChainEnv,
    setSavedPrimaryChainEnv,
    didLoadPersistedValue,
  } = useSavedPrimaryChainEnv();

  if (!didLoadPersistedValue) {
    return <InitialMountLoadingOverlay />;
  }

  return (
    <EVMContextProvider
      {...evmContextParams}
      primaryChainEnv={savedPrimaryChainEnv}
      setPrimaryChainEnv={setSavedPrimaryChainEnv}
    >
      <VertexClientContextProvider>
        <SubaccountContextProvider>
          <VertexMetadataContextProvider>
            {children}
          </VertexMetadataContextProvider>
        </SubaccountContextProvider>
      </VertexClientContextProvider>
    </EVMContextProvider>
  );
}
