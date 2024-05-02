import { WithChildren } from '@vertex-protocol/web-common';
import { useEVMContext } from '@vertex-protocol/web-data';
import { HIDDEN_PRODUCT_IDS_BY_CHAIN } from 'common/hiddenProductIdsByChain';
import { NEW_PRODUCT_IDS_BY_CHAIN } from 'common/newProductIdsByChain';
import {
  PERP_METADATA_BY_CHAIN,
  SPOT_METADATA_BY_CHAIN,
} from 'common/productMetadata/metadataByChain';
import { PRIMARY_QUOTE_TOKEN_BY_CHAIN } from 'common/productMetadata/primaryQuoteTokenByChain';
import {
  PROTOCOL_TOKEN_BY_CHAIN,
  PROTOCOL_TOKEN_PRODUCT_ID_BY_CHAIN,
} from 'common/productMetadata/protocolTokenByChain';
import {
  PerpProductMetadata,
  SpotProductMetadata,
  Token,
} from 'common/productMetadata/types';
import { createContext, useCallback, useContext, useMemo } from 'react';

export interface VertexMetadataContextData {
  protocolToken: Token;
  protocolTokenProductId: number;
  // The token used as the primary quote product (product ID of 0)
  primaryQuoteToken: Token;
  // We often want to hide certain markets for trading. Positions will still be shown but the market won't
  // show up in the markets dropdown
  getIsHiddenMarket(productId: number): boolean;

  // We want to feature new markets on the UI, this centralizes the logic for determining whether a market is new
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
      protocolToken: PROTOCOL_TOKEN_BY_CHAIN[primaryChainId],
      protocolTokenProductId:
        PROTOCOL_TOKEN_PRODUCT_ID_BY_CHAIN[primaryChainId],
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
