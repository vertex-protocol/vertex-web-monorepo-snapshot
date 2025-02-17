import {
  addDecimals,
  BigDecimal,
  QUOTE_PRODUCT_ID,
  removeDecimals,
  toBigDecimal,
} from '@vertex-protocol/client';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useSubaccountFeeRates } from 'client/hooks/query/subaccount/useSubaccountFeeRates';
import { useAllProductsWithdrawPoolLiquidity } from 'client/hooks/query/withdrawPool/useAllProductsWithdrawPoolLiquidity';
import { useWithdrawPoolFeeAmount } from 'client/hooks/query/withdrawPool/useWithdrawPoolFeeAmount';
import { useAreWithdrawalsProcessing } from 'client/modules/collateral/hooks/useAreWithdrawalsProcessing';
import { useMemo } from 'react';

interface Params {
  submissionIndex: string;
  productId: number;
  withdrawalSize: BigDecimal;
}

export function useFastWithdrawFormData({
  productId,
  submissionIndex,
  withdrawalSize,
}: Params) {
  const { data: feeRatesData } = useSubaccountFeeRates();
  const { data: withdrawPoolLiquidityData } =
    useAllProductsWithdrawPoolLiquidity();
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const withdrawalsProcessingData = useAreWithdrawalsProcessing({
    submissionIndices: [submissionIndex],
  });

  const productMetadata = useMemo(() => {
    if (!allMarketsStaticData) {
      return;
    }

    return productId === QUOTE_PRODUCT_ID
      ? allMarketsStaticData.primaryQuote.metadata
      : allMarketsStaticData.spot[productId]?.metadata;
  }, [allMarketsStaticData, productId]);

  const { data: withdrawPoolFeeAmountData } = useWithdrawPoolFeeAmount({
    productId,
    amount: addDecimals(withdrawalSize, productMetadata?.token.tokenDecimals),
  });

  const withdrawalFeeAmount = useMemo(() => {
    if (!feeRatesData || !withdrawPoolFeeAmountData) {
      return;
    }

    const decimalAdjustedNormalWithdrawalFee = removeDecimals(
      toBigDecimal(feeRatesData.withdrawal[productId]),
    );

    const decimalAdjustedWithdrawPoolFeeAmount = removeDecimals(
      withdrawPoolFeeAmountData,
      productMetadata?.token.tokenDecimals,
    );

    return decimalAdjustedWithdrawPoolFeeAmount.plus(
      decimalAdjustedNormalWithdrawalFee,
    );
  }, [feeRatesData, productId, productMetadata, withdrawPoolFeeAmountData]);

  return {
    isWithdrawProcessing: withdrawalsProcessingData?.[submissionIndex],
    withdrawPoolLiquidity: removeDecimals(
      withdrawPoolLiquidityData?.[productId],
      productMetadata?.token.tokenDecimals,
    ),
    withdrawalFeeAmount,
    productMetadata,
  };
}
