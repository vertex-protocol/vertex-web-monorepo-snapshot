import {
  addDecimals,
  BigDecimal,
  removeDecimals,
  toBigDecimal,
} from '@vertex-protocol/client';
import { getStaticMarketDataForProductId } from 'client/hooks/markets/marketsStaticData/getStaticMarketDataForProductId';
import { SpotStaticMarketData } from 'client/hooks/markets/marketsStaticData/types';
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
    return getStaticMarketDataForProductId<SpotStaticMarketData>(
      productId,
      allMarketsStaticData,
    )?.metadata;
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
