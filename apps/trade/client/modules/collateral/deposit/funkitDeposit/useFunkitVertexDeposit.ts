import { FunkitCheckoutActionParams, useFunkitCheckout } from '@funkit/connect';
import {
  addDecimals,
  BigDecimal,
  QUOTE_PRODUCT_ID,
  subaccountToHex,
  VERTEX_ABIS,
} from '@vertex-protocol/client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
  useEVMContext,
  usePrimaryChainVertexClient,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { NextImageSrc, nonNullFilter } from '@vertex-protocol/web-common';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { EXECUTE_DEPOSIT_COLLATERAL_REFETCH_QUERY_KEYS } from 'client/hooks/execute/useExecuteDepositCollateral';
import { useRefetchQueries } from 'client/hooks/execute/util/useRefetchQueries';
import { useRequiresInitialDeposit } from 'client/hooks/subaccount/useRequiresInitialDeposit';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useDepositFormData } from 'client/modules/collateral/deposit/hooks/useDepositFormData';
import { edgeReferralCodeAtom } from 'client/store/referralsStore';
import { roundToString } from 'client/utils/rounding';
import { useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { Address, erc20Abi, getAddress } from 'viem';

const DEFAULT_TARGET_ASSET_AMOUNT = 100;
const DEFAULT_CHECKOUT_EXPIRATION_MS = 35 * 60 * 1000; // 35 minutes
const DEFAULT_PRODUCT_ID = QUOTE_PRODUCT_ID;
const FALLBACK_REFERRAL_ID = '-1';

interface FunkitDepositAsset {
  productId: number;
  tokenAddress: Address;
  tokenChainId: string;
  tokenSymbol: string;
  tokenDecimals: number;
  iconSrc: string;
  isDefault: boolean;
  badgeText: string;
  targetAssetMinAmount: number;
}

/**
 * Hook to start a Funkit deposit checkout into a Vertex account.
 * Requires user to be logged in.
 */
export function useFunkitVertexDeposit() {
  const { hide } = useDialog();
  const [edgeReferralCodeAtomValue] = useAtom(edgeReferralCodeAtom);

  const refetchQueries = useRefetchQueries(
    EXECUTE_DEPOSIT_COLLATERAL_REFETCH_QUERY_KEYS,
  );
  const {
    currentSubaccount: { address: subaccountAddress, name: subaccountName },
  } = useSubaccountContext();

  const vertexClient = usePrimaryChainVertexClient();
  const { primaryQuoteToken, getSpotMetadata } = useVertexMetadataContext();
  const {
    primaryChain: { id: primaryChainId },
  } = useEVMContext();

  const { availableProducts } = useDepositFormData({
    // Unused - rely on useDepositFormData hook only for a list of depositable products
    productIdInput: QUOTE_PRODUCT_ID,
  });

  const requiresInitialDeposit = useRequiresInitialDeposit();

  const isFunkitCheckoutReady =
    !!subaccountAddress && !!availableProducts.length;

  const depositAssets = useMemo(() => {
    if (!isFunkitCheckoutReady) {
      return;
    }

    return availableProducts
      .map((product): FunkitDepositAsset | undefined => {
        const metadata = getSpotMetadata(product.productId);
        if (!metadata) {
          return;
        }
        return {
          productId: product.productId,
          tokenAddress: getAddress(metadata.token.address),
          tokenChainId: metadata.token.chainId.toString(),
          tokenSymbol: product.symbol,
          tokenDecimals: product.tokenDecimals,
          iconSrc: getNextImageSrcStr(metadata.token.icon.asset),
          isDefault: product.productId === DEFAULT_PRODUCT_ID,
          badgeText: `APR: ${formatNumber(product.depositAPR, {
            formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
          })}`,
          // Determine whether a min deposit amount is required
          targetAssetMinAmount: requiresInitialDeposit
            ? Number(product.decimalAdjustedMinimumInitialDepositAmount)
            : 0,
        };
      })
      .filter(nonNullFilter);
  }, [
    availableProducts,
    getSpotMetadata,
    isFunkitCheckoutReady,
    requiresInitialDeposit,
  ]);

  const generateFunkitActionsParams = useCallback(
    (
      targetAssetAmount: number,
      outputConfig?: { targetChain: string; targetAsset: Address },
    ): FunkitCheckoutActionParams[] => {
      if (!depositAssets?.length || !subaccountAddress || !vertexClient)
        return [];
      if (!outputConfig) return [];

      const selectedAsset = depositAssets.find((asset) => {
        return (
          asset.tokenAddress.toLowerCase() ===
          outputConfig.targetAsset.toLowerCase()
        );
      });
      if (!selectedAsset) return [];

      const endpointContractAddress =
        vertexClient.context.contractAddresses.endpoint;

      const targetAmountWithDecimals = roundToString(
        addDecimals(targetAssetAmount, selectedAsset.tokenDecimals),
        0,
        BigDecimal.ROUND_DOWN,
      );

      return [
        {
          contractAbi: erc20Abi,
          contractAddress: selectedAsset.tokenAddress,
          functionName: 'approve',
          functionArgs: [endpointContractAddress, targetAmountWithDecimals],
        },
        {
          contractAbi: VERTEX_ABIS['endpoint'],
          contractAddress: endpointContractAddress as Address,
          functionName: 'depositCollateralWithReferral',
          functionArgs: [
            // Vertex subaccount
            subaccountToHex({
              subaccountOwner: subaccountAddress,
              subaccountName: subaccountName,
            }),
            // Product Id
            selectedAsset.productId,
            // Amount
            targetAmountWithDecimals,
            // Referral code
            edgeReferralCodeAtomValue ?? FALLBACK_REFERRAL_ID,
          ],
        },
      ];
    },
    [
      depositAssets,
      edgeReferralCodeAtomValue,
      subaccountAddress,
      subaccountName,
      vertexClient,
    ],
  );

  const { beginCheckout } = useFunkitCheckout({
    config: useMemo(() => {
      return {
        modalTitle: 'Deposit',
        iconSrc: getNextImageSrcStr(primaryQuoteToken.icon.asset),
        targetChain: primaryChainId.toString(),
        targetAsset: getAddress(primaryQuoteToken.address),
        targetAssetTicker: primaryQuoteToken.symbol,
        checkoutItemTitle: primaryQuoteToken.symbol,
        targetAssetAmount: DEFAULT_TARGET_ASSET_AMOUNT,
        expirationTimestampMs: DEFAULT_CHECKOUT_EXPIRATION_MS,
        dynamicTargetAssetCandidates: depositAssets,
        generateActionsParams: generateFunkitActionsParams,
        customRecipient: undefined,
      };
    }, [
      depositAssets,
      generateFunkitActionsParams,
      primaryChainId,
      primaryQuoteToken.address,
      primaryQuoteToken.icon.asset,
      primaryQuoteToken.symbol,
    ]),
    onClose: useCallback(() => {
      refetchQueries();
      hide();
    }, [refetchQueries, hide]),
  });

  const startFunkitDeposit = useCallback(() => {
    if (!isFunkitCheckoutReady) {
      return;
    }
    beginCheckout().catch((err) => {
      console.warn('[useFunkitVertexDeposit] Failed to begin checkout', err);
    });
  }, [isFunkitCheckoutReady, beginCheckout]);

  return {
    isFunkitCheckoutReady,
    startFunkitDeposit,
  };
}

/**
 * Hack to get the src url of the image, assumes that the `img` is a static import
 * @param img
 */
function getNextImageSrcStr(img: NextImageSrc): string {
  return typeof img === 'object' && 'src' in img ? img.src : '';
}
