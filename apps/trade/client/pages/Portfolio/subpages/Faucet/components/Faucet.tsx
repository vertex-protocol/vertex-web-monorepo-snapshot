import { isSpotBalance } from '@vertex-protocol/client';
import { BigDecimals, removeDecimals } from '@vertex-protocol/utils';
import { Card, PrimaryButton } from '@vertex-protocol/web-ui';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useExecuteMintTokens } from 'client/hooks/execute/useExecuteMintTokens';
import { useAllDepositableTokenBalances } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { useCurrentSubaccountSummary } from 'client/hooks/query/subaccount/useCurrentSubaccountSummary';
import { useOnChainTransactionState } from 'client/hooks/query/useOnChainTransactionState';
import { CollateralAssetSelect } from 'client/modules/collateral/components/CollateralAssetSelect';
import { CollateralSpotProduct } from 'client/modules/collateral/types';
import { AnnotatedSpotBalanceWithProduct } from 'common/productMetadata/types';
import { useEffect, useMemo, useState } from 'react';

export const Faucet = () => {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const { data: subaccountSummary } = useCurrentSubaccountSummary();
  const { data: depositableTokenBalances } = useAllDepositableTokenBalances();

  const availableProducts: (CollateralSpotProduct & {
    tokenDecimals: number;
  })[] = useMemo(() => {
    if (!subaccountSummary) {
      return [];
    }
    return subaccountSummary.balances.filter(isSpotBalance).map((balance) => {
      const spotBalance = balance as AnnotatedSpotBalanceWithProduct;
      const token = spotBalance.metadata.token;
      // Silently fail here, should be ok
      const walletAmount =
        depositableTokenBalances?.[spotBalance.productId] ?? BigDecimals.ZERO;

      return {
        productId: spotBalance.productId,
        icon: token.icon,
        symbol: token.symbol,
        displayedAssetAmount: removeDecimals(walletAmount, token.tokenDecimals),
        displayedAssetValueUsd: undefined,
        tokenDecimals: spotBalance.metadata.token.tokenDecimals,
      };
    });
  }, [depositableTokenBalances, subaccountSummary]);

  const selectedProduct = useMemo(() => {
    return availableProducts.find(
      (option) => option.productId === selectedProductId,
    );
  }, [availableProducts, selectedProductId]);

  // Mutation
  const mintTokens = useExecuteMintTokens({
    decimals: selectedProduct?.tokenDecimals ?? 0,
  });

  // Watch for tx status
  const txState = useOnChainTransactionState({
    txResponse: mintTokens.data,
  });

  // Derive status
  const statusText = (() => {
    switch (txState.type) {
      case 'idle':
        break;
      case 'pending':
        return 'Confirming On-Chain';
      case 'error':
        return 'Rejected On-Chain';
      case 'confirmed':
        return 'Confirmed On-Chain';
    }

    switch (mintTokens.status) {
      case 'idle':
        break;
      case 'pending':
        return 'Submitting';
      case 'success':
        return 'Submitted';
      case 'error':
        return 'Transaction Error';
    }

    return 'Idle';
  })();

  // Set first product when data is loaded
  useEffect(
    () => {
      if (availableProducts.length) {
        setSelectedProductId(availableProducts[0].productId);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [availableProducts.length],
  );

  return (
    <Card className="flex flex-col gap-y-8 p-6">
      <p className="text-text-secondary text-sm">
        Obtain testnet funds. 10 tokens per request. (95 for{' '}
        {primaryQuoteToken.symbol})
      </p>
      <div className="relative flex flex-1 flex-col gap-y-2 rounded-md text-left text-sm">
        <p>Select an asset</p>
        <div className="h-10 rounded-md">
          <CollateralAssetSelect
            selectedProduct={availableProducts.find(
              (option) => option.productId === selectedProductId,
            )}
            availableProducts={availableProducts}
            assetAmountTitle="In Wallet"
            onProductSelected={(productId: number) => {
              setSelectedProductId(productId);
            }}
            className="bg-surface-2 h-full w-full rounded"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <PrimaryButton
          isLoading={mintTokens.isPending || txState.type === 'pending'}
          onClick={() => {
            if (selectedProductId == null) {
              return;
            }
            mintTokens.mutate({
              productId: selectedProductId,
            });
          }}
        >
          Mint Tokens
        </PrimaryButton>
        <div className="text-text-tertiary text-sm">Status: {statusText}</div>
      </div>
    </Card>
  );
};
