'use client';

import { useEVMContext } from '@vertex-protocol/react-client';
import { WithChildren } from '@vertex-protocol/web-common';
import { createContext, useCallback, useContext, useMemo } from 'react';
import { HIDDEN_PRODUCT_IDS_BY_CHAIN } from '../consts/hiddenProductIdsByChain';
import { NEW_PRODUCT_IDS_BY_CHAIN } from '../consts/newProductIdsByChain';
import {
  PERP_METADATA_BY_CHAIN,
  SPOT_METADATA_BY_CHAIN,
} from '../productMetadata/metadataByChain';
import { PRIMARY_QUOTE_TOKEN_BY_CHAIN } from '../productMetadata/primaryQuoteTokenByChain';
import {
  PROTOCOL_TOKEN_METADATA_BY_CHAIN,
  ProtocolTokenMetadata,
} from '../productMetadata/protocolToken';
import {
  PerpProductMetadata,
  SpotProductMetadata,
  Token,
} from '../productMetadata/types';

export interface VertexMetadataContextData {
  protocolTokenMetadata: ProtocolTokenMetadata;
  /**
   * The token used as the primary quote product (product ID of 0)
   */
  primaryQuoteToken: Token;
  /**
   * We often want to hide certain markets for trading. Positions will still be shown but the market won't
   * show up in the markets dropdown
   */
  getIsHiddenMarket(productId: number): boolean;

  /**
   * We want to feature new markets on the UI, this centralizes the logic for determining whether a market is new
   */
  getIsNewMarket(productId: number): boolean;

  getSpotMetadata(productId: number): SpotProductMetadata | undefined;

  getPerpMetadata(productId: number): PerpProductMetadata | undefined;
}

const VertexMetadataContext = createContext<VertexMetadataContextData>(
  {} as VertexMetadataContextData,
);

export const useVertexMetadataContext = () => useContext(VertexMetadataContext);

export function VertexMetadataContextProvider({ children }: WithChildren) {
  const {
    primaryChain: { id: primaryChainId },
  } = useEVMContext();

  const getSpotMetadata = useCallback(
    (productId: number): SpotProductMetadata | undefined => {
      return SPOT_METADATA_BY_CHAIN[primaryChainId][productId];
    },
    [primaryChainId],
  );

  const getPerpMetadata = useCallback(
    (productId: number): PerpProductMetadata | undefined => {
      return PERP_METADATA_BY_CHAIN[primaryChainId][productId];
    },
    [primaryChainId],
  );

  const getIsHiddenMarket = useCallback(
    (productId: number): boolean => {
      return HIDDEN_PRODUCT_IDS_BY_CHAIN[primaryChainId].has(productId);
    },
    [primaryChainId],
  );

  const getIsNewMarket = useCallback(
    (productId: number): boolean => {
      return NEW_PRODUCT_IDS_BY_CHAIN[primaryChainId].has(productId);
    },
    [primaryChainId],
  );

  const data: VertexMetadataContextData = useMemo(() => {
    return {
      primaryQuoteToken: PRIMARY_QUOTE_TOKEN_BY_CHAIN[primaryChainId],
      protocolTokenMetadata: PROTOCOL_TOKEN_METADATA_BY_CHAIN[primaryChainId],
      getIsHiddenMarket,
      getIsNewMarket,
      getPerpMetadata,
      getSpotMetadata,
    };
  }, [
    getIsHiddenMarket,
    getIsNewMarket,
    getPerpMetadata,
    getSpotMetadata,
    primaryChainId,
  ]);

  return (
    <VertexMetadataContext.Provider value={data}>
      {children}
    </VertexMetadataContext.Provider>
  );
}
