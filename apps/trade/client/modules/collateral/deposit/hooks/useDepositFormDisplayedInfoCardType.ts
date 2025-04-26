import { QUOTE_PRODUCT_ID } from '@vertex-protocol/client';
import {
  KNOWN_PRODUCT_IDS,
  useIsChainEnvType,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import {
  DepositInfoCardType,
  DepositProductSelectValue,
} from 'client/modules/collateral/deposit/types';
import { useMemo } from 'react';

interface Params {
  selectedProduct: DepositProductSelectValue | undefined;
  hasLoadedDepositableBalances: boolean;
}

export function useDepositFormDisplayedInfoCardType({
  selectedProduct,
  hasLoadedDepositableBalances,
}: Params) {
  const {
    protocolTokenMetadata: { productId: protocolTokenProductId },
  } = useVertexMetadataContext();
  const { isArb, isBase, isBlast, isMantle, isSei, isSonic, isAvax } =
    useIsChainEnvType();

  return useMemo((): DepositInfoCardType | undefined => {
    if (!selectedProduct) {
      return;
    }

    // Arb
    if (isArb) {
      if (
        selectedProduct.productId === KNOWN_PRODUCT_IDS.wethArb &&
        hasLoadedDepositableBalances
      ) {
        return 'wrap_weth';
      }

      if (selectedProduct.productId === protocolTokenProductId) {
        return 'vrtx_margin';
      }
    }

    // Base
    if (
      isBase &&
      selectedProduct.productId === KNOWN_PRODUCT_IDS.wethBase &&
      hasLoadedDepositableBalances
    ) {
      return 'wrap_weth';
    }

    // Blast
    if (isBlast) {
      // wETH on blast mainnet is 91 and 3 on testnet
      const isBlastWethProductId =
        selectedProduct.productId === KNOWN_PRODUCT_IDS.wethBlast ||
        selectedProduct.productId === KNOWN_PRODUCT_IDS.wethBlastSepolia;

      if (isBlastWethProductId && hasLoadedDepositableBalances) {
        return 'wrap_weth';
      }

      // wETH & USDB are eligible for blast native yield
      const isEligibleForBlastNativeYield =
        isBlastWethProductId || selectedProduct.productId === QUOTE_PRODUCT_ID;

      if (isEligibleForBlastNativeYield) {
        return 'blast_native_yield';
      }
    }

    // Mantle
    // Note: no need for `weth` dismissible on Mantle as MNT is the native token, not ETH
    if (
      isMantle &&
      selectedProduct.productId === KNOWN_PRODUCT_IDS.wmnt &&
      hasLoadedDepositableBalances
    ) {
      return 'wrap_wmnt';
    }

    // Sei
    if (
      isSei &&
      selectedProduct.productId === KNOWN_PRODUCT_IDS.wsei &&
      hasLoadedDepositableBalances
    ) {
      return 'wrap_wsei';
    }

    // Sonic
    if (
      isSonic &&
      selectedProduct.productId === KNOWN_PRODUCT_IDS.wS &&
      hasLoadedDepositableBalances
    ) {
      return 'wrap_ws';
    }

    // Avax
    if (
      isAvax &&
      selectedProduct.productId === KNOWN_PRODUCT_IDS.wavax &&
      hasLoadedDepositableBalances
    ) {
      return 'wrap_wavax';
    }
  }, [
    selectedProduct,
    isArb,
    isBase,
    hasLoadedDepositableBalances,
    isBlast,
    isMantle,
    isSei,
    isSonic,
    isAvax,
    protocolTokenProductId,
  ]);
}
