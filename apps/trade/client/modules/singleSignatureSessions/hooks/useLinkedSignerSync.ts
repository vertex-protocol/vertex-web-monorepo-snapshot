import {
  useEVMContext,
  useVertexClientContext,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useSubaccountLinkedSigner } from 'client/hooks/query/subaccount/useSubaccountLinkedSigner';
import { useSavedSubaccountSigningPreference } from 'client/modules/singleSignatureSessions/hooks/useSavedSubaccountSigningPreference';
import { Wallet, ZeroAddress } from 'ethers';
import { useEffect, useRef } from 'react';

/**
 * Synchronization of state for linked signers:
 * - When the linked signer changes in `SubaccountContext`, change VertexClient appropriately
 * - Update local state given backend state on initial load
 */
export function useLinkedSignerSync() {
  const { primaryChainEnv } = useEVMContext();
  const { setLinkedSigner, vertexClientsByChainEnv } = useVertexClientContext();
  const {
    signingPreference: { current: localSigningPreference },
    currentSubaccount,
  } = useSubaccountContext();

  // Sync vertex client & local state
  const didLoadVertexClients = !!vertexClientsByChainEnv;
  useEffect(() => {
    if (!didLoadVertexClients) {
      return;
    }

    let linkedSigner: Wallet | null = null;
    if (
      localSigningPreference?.type === 'sign_once' &&
      localSigningPreference?.authorizedWallet
    ) {
      linkedSigner = localSigningPreference.authorizedWallet;
    }

    console.debug(
      `[useLinkedSignerSync] Updating linked signer on Vertex Client for ${primaryChainEnv}`,
      linkedSigner?.address ?? null,
    );
    setLinkedSigner({
      signer: linkedSigner,
      chainEnv: primaryChainEnv,
    });
  }, [
    didLoadVertexClients,
    localSigningPreference,
    primaryChainEnv,
    setLinkedSigner,
  ]);

  // Consume the saved state directly for a BE <> Local sync, this is because we don't have access to the private key
  // if backend is configured as sign-once but local has no saved setting
  const {
    signingPreference: savedSigningPreference,
    didLoadPersistedValue: didLoadSigningPreferencePersistedValue,
    saveSigningPreference,
  } = useSavedSubaccountSigningPreference(currentSubaccount);

  const { data: backendLinkedSigner } = useSubaccountLinkedSigner();

  // Sync backend state & local state, but do this only once on initial load
  // This prevents weird race conditions when user changes between sign always & sign once, but the indexer query
  // state has not yet updated
  const hasRunBackendSyncRef = useRef(false);

  // Reset on subaccount changes
  useEffect(() => {
    hasRunBackendSyncRef.current = false;
  }, [currentSubaccount]);

  // Sync backend state & local state
  useEffect(() => {
    if (
      !currentSubaccount.address ||
      hasRunBackendSyncRef.current ||
      !didLoadSigningPreferencePersistedValue ||
      !backendLinkedSigner
    ) {
      return;
    }
    const backendIsSignOnce = backendLinkedSigner.signer !== ZeroAddress;

    // Nothing configured locally
    if (savedSigningPreference == null && backendIsSignOnce) {
      saveSigningPreference({
        type: 'sign_once',
        rememberMe: false,
      });
    } else if (
      savedSigningPreference?.type === 'sign_once' &&
      !backendIsSignOnce
    ) {
      saveSigningPreference({
        type: 'sign_always',
      });
    } else if (
      savedSigningPreference?.type === 'sign_always' &&
      backendIsSignOnce
    ) {
      saveSigningPreference({
        type: 'sign_once',
        rememberMe: false,
      });
    }

    hasRunBackendSyncRef.current = true;
  }, [
    backendLinkedSigner,
    currentSubaccount.address,
    didLoadSigningPreferencePersistedValue,
    saveSigningPreference,
    savedSigningPreference,
  ]);
}
