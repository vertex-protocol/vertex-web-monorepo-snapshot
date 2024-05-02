import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { LatestMarketPrice } from 'client/hooks/query/markets/types';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import {
  SpotBalanceItem,
  useSpotBalances,
} from 'client/hooks/subaccount/useSpotBalances';
import { RepayConvertProduct } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/types';
import { sortByDisplayedAssetValue } from 'client/modules/collateral/utils/sortByDisplayedAssetValue';
import { useMemo } from 'react';

interface Params {
  repayProductIdInput: number;
  sourceProductIdInput: number | undefined;
}

export function useRepayConvertProducts({
  sourceProductIdInput,
  repayProductIdInput,
}: Params) {
  const { balances } = useSpotBalances();
  const { data: allMarketPrices } = useAllMarketsLatestPrices();

  const availableRepayProducts = useMemo((): RepayConvertProduct[] => {
    return (
      balances
        ?.filter((balance) => balance.amount.isNegative())
        .map((balance) => {
          return toRepayConvertProduct(
            balance,
            false,
            allMarketPrices?.[balance.productId],
          );
        }) ?? []
    ).sort(sortByDisplayedAssetValue);
  }, [allMarketPrices, balances]);

  const selectedRepayProduct = useMemo(() => {
    return availableRepayProducts.find(
      (product) => product.productId === repayProductIdInput,
    );
  }, [availableRepayProducts, repayProductIdInput]);

  // Given the selected repay product, what are the available source products?
  const availableSourceProducts = useMemo((): RepayConvertProduct[] => {
    if (!selectedRepayProduct) {
      return [];
    }

    return (
      balances
        ?.filter((balance) => {
          if (balance.amount.lte(0)) {
            return false;
          }
          // If repaying USDC, can't sell USDC, if repaying asset, can only sell USDC
          return selectedRepayProduct.productId === QUOTE_PRODUCT_ID
            ? balance.productId !== QUOTE_PRODUCT_ID
            : balance.productId === QUOTE_PRODUCT_ID;
        })
        .map((balance) => {
          return toRepayConvertProduct(
            balance,
            true,
            allMarketPrices?.[balance.productId],
          );
        }) ?? []
    );
  }, [selectedRepayProduct, balances, allMarketPrices]);

  const selectedSourceProduct = useMemo(() => {
    return availableSourceProducts.find(
      (product) => product.productId === sourceProductIdInput,
    );
  }, [availableSourceProducts, sourceProductIdInput]);

  return {
    availableRepayProducts,
    availableSourceProducts,
    selectedRepayProduct,
    selectedSourceProduct,
  };
}

function toRepayConvertProduct(
  balance: SpotBalanceItem,
  isSourceProduct: boolean,
  marketPrices: LatestMarketPrice | undefined,
): RepayConvertProduct {
  const token = balance.metadata.token;
  const amountBorrowed = balance.amountBorrowed.abs();
  const amountDeposited = balance.amountDeposited;
  const displayedAssetAmount = isSourceProduct
    ? amountDeposited
    : amountBorrowed;

  return {
    productId: balance.productId,
    icon: token.icon,
    marketName: balance.metadata.marketName,
    symbol: token.symbol,
    displayedAssetAmount,
    displayedAssetValueUsd:
      balance.oraclePriceUsd.multipliedBy(displayedAssetAmount),
    amountBorrowed,
    decimalAdjustedVertexBalance: balance.amount,
    oraclePriceUsd: balance.oraclePriceUsd,
    marketPrices,
  };
}
