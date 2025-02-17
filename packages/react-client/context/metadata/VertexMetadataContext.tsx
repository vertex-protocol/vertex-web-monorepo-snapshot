'use client';

import { ChainEnv } from '@vertex-protocol/client';
import { useEVMContext } from '@vertex-protocol/react-client';
import { WithChildren } from '@vertex-protocol/web-common';
import { createContext, use, useCallback, useMemo } from 'react';
import { ChainMetadata, getChainMetadata } from './chainMetadata';
import { HIDDEN_PRODUCT_IDS_BY_CHAIN_ENV } from './consts/hiddenProductIdsByChainEnv';
import { NEW_PRODUCT_IDS_BY_CHAIN_ENV } from './consts/newProductIdsByChainEnv';
import {
  PERP_METADATA_BY_CHAIN_ENV,
  SPOT_METADATA_BY_CHAIN_ENV,
} from './productMetadata/metadataByChainEnv';
import { PRIMARY_QUOTE_TOKEN_BY_CHAIN_ENV } from './productMetadata/primaryQuoteTokenByChainEnv';
import {
  PROTOCOL_TOKEN_METADATA_BY_CHAIN_ENV,
  ProtocolTokenMetadata,
} from './productMetadata/protocolTokenMetadataByChainEnv';
import {
  PerpProductMetadata,
  SpotProductMetadata,
  Token,
} from './productMetadata/types';

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

  getSpotMetadataByChainEnv(
    chainEnv: ChainEnv,
    productId: number,
  ): SpotProductMetadata | undefined;

  /**
   * Primary chain metadata.
   */
  primaryChainMetadata: ChainMetadata;

  getChainMetadata: (chainEnv: ChainEnv) => ChainMetadata;
}

const VertexMetadataContext = createContext<VertexMetadataContextData>(
  {} as VertexMetadataContextData,
);

export const useVertexMetadataContext = () => use(VertexMetadataContext);

export function VertexMetadataContextProvider({ children }: WithChildren) {
  const { primaryChainEnv } = useEVMContext();

  const getSpotMetadata = useCallback(
    (productId: number): SpotProductMetadata | undefined => {
      return SPOT_METADATA_BY_CHAIN_ENV[primaryChainEnv][productId];
    },
    [primaryChainEnv],
  );

  const getSpotMetadataByChainEnv = useCallback(
    (
      chainEnv: ChainEnv,
      productId: number,
    ): SpotProductMetadata | undefined => {
      return SPOT_METADATA_BY_CHAIN_ENV[chainEnv][productId];
    },
    [],
  );

  const getPerpMetadata = useCallback(
    (productId: number): PerpProductMetadata | undefined => {
      return PERP_METADATA_BY_CHAIN_ENV[primaryChainEnv][productId];
    },
    [primaryChainEnv],
  );

  const getIsHiddenMarket = useCallback(
    (productId: number): boolean => {
      return HIDDEN_PRODUCT_IDS_BY_CHAIN_ENV[primaryChainEnv].has(productId);
    },
    [primaryChainEnv],
  );

  const getIsNewMarket = useCallback(
    (productId: number): boolean => {
      return NEW_PRODUCT_IDS_BY_CHAIN_ENV[primaryChainEnv].has(productId);
    },
    [primaryChainEnv],
  );

  const primaryChainMetadata = useMemo(
    () => getChainMetadata(primaryChainEnv),
    [primaryChainEnv],
  );

  const data: VertexMetadataContextData = useMemo(() => {
    return {
      primaryQuoteToken: PRIMARY_QUOTE_TOKEN_BY_CHAIN_ENV[primaryChainEnv],
      protocolTokenMetadata:
        PROTOCOL_TOKEN_METADATA_BY_CHAIN_ENV[primaryChainEnv],
      getIsHiddenMarket,
      getIsNewMarket,
      getPerpMetadata,
      getSpotMetadata,
      getChainMetadata,
      getSpotMetadataByChainEnv,
      primaryChainMetadata,
    };
  }, [
    getIsHiddenMarket,
    getIsNewMarket,
    getPerpMetadata,
    getSpotMetadata,
    getSpotMetadataByChainEnv,
    primaryChainEnv,
    primaryChainMetadata,
  ]);

  return <VertexMetadataContext value={data}>{children}</VertexMetadataContext>;
}
