import {
  addDecimals,
  BigDecimal,
  BigDecimals,
  calcPerpBalanceNotionalValue,
  QUOTE_PRODUCT_ID,
  removeDecimals,
  SubaccountTx,
} from '@vertex-protocol/client';
import { getMarketPriceFormatSpecifier } from '@vertex-protocol/react-client';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useLatestOraclePrices } from 'client/hooks/query/markets/useLatestOraclePrices';
import { useSubaccountIsolatedPositions } from 'client/hooks/query/subaccount/isolatedPositions/useSubaccountIsolatedPositions';
import { useCollateralEstimateSubaccountInfoChange } from 'client/modules/collateral/hooks/useCollateralEstimateSubaccountInfoChange';
import { SUBACCOUNT_QUOTE_TRANSFER_FEE } from 'client/modules/subaccounts/consts';
import { calcIsoPositionLeverage } from 'client/utils/calcs/calcIsoPositionLeverage';
import { calcIsoPositionNetMargin } from 'client/utils/calcs/calcIsoPositionNetMargin';
import { calcEstimatedLiquidationPriceFromBalance } from 'client/utils/calcs/liquidationPriceCalcs';
import { useMemo } from 'react';

interface IsolatedAdjustMarginSummary {
  isoNetMarginUsd: BigDecimal | undefined;
  isoPositionLeverage: BigDecimal | undefined;
  isoLiquidationPrice: BigDecimal | undefined | null;
  crossAccountQuoteBalance: BigDecimal | undefined;
  fundsAvailable: BigDecimal | undefined;
  crossMarginUsageFrac: BigDecimal | undefined;
}

interface Params {
  validAmount: BigDecimal | undefined;
  isoSubaccountName: string;
  isAddMargin: boolean;
}

export function useIsolatedAdjustMarginSummary({
  validAmount,
  isoSubaccountName,
  isAddMargin,
}: Params) {
  const { data: isoPositions } = useSubaccountIsolatedPositions();
  const { data: latestOraclePrices } = useLatestOraclePrices();
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const currentIsoPosition = useMemo(
    () =>
      isoPositions?.find(
        (iso) => iso.subaccount.subaccountName === isoSubaccountName,
      ),
    [isoPositions, isoSubaccountName],
  );

  const currentProductId = currentIsoPosition?.baseBalance.productId;

  const estimateCrossAccountStateTxs = useMemo((): SubaccountTx[] => {
    if (!validAmount) {
      return [];
    }

    const validAmountWithDecimals = addDecimals(validAmount);

    const amountDelta = isAddMargin
      ? validAmountWithDecimals.negated()
      : addDecimals(validAmount.minus(SUBACCOUNT_QUOTE_TRANSFER_FEE));

    return [
      {
        type: 'apply_delta',
        tx: {
          productId: QUOTE_PRODUCT_ID,
          vQuoteDelta: BigDecimals.ZERO,
          amountDelta,
        },
      },
    ];
  }, [validAmount, isAddMargin]);

  const {
    current: currentCollateralSummary,
    estimated: estimatedCollateralSummary,
  } = useCollateralEstimateSubaccountInfoChange({
    estimateStateTxs: estimateCrossAccountStateTxs,
    productId: QUOTE_PRODUCT_ID,
  });

  const {
    isoNetMargin,
    isoPositionLeverage,
    isoNotionalValue,
    isoLiquidationPrice,
  } = useMemo(() => {
    if (!currentIsoPosition) {
      return {};
    }

    const isoNetMargin = calcIsoPositionNetMargin(
      currentIsoPosition.baseBalance,
      currentIsoPosition.quoteBalance,
    );

    const isoNotionalValue = calcPerpBalanceNotionalValue(
      currentIsoPosition.baseBalance,
    );

    const isoPositionLeverage = calcIsoPositionLeverage(
      isoNetMargin,
      isoNotionalValue,
    );

    const isoLiquidationPrice = calcEstimatedLiquidationPriceFromBalance(
      currentIsoPosition.baseBalance,
      isoNetMargin,
    );

    return {
      isoNetMargin,
      isoNotionalValue,
      isoPositionLeverage,
      isoLiquidationPrice,
    };
  }, [currentIsoPosition]);

  const currentSummary = useMemo((): IsolatedAdjustMarginSummary => {
    return {
      isoNetMarginUsd:
        removeDecimals(isoNetMargin)?.multipliedBy(primaryQuotePriceUsd),
      isoPositionLeverage,
      isoLiquidationPrice,
      crossAccountQuoteBalance: currentCollateralSummary?.vertexBalance,
      fundsAvailable: currentCollateralSummary?.fundsAvailableUsdBounded,
      crossMarginUsageFrac: currentCollateralSummary?.marginUsageBounded,
    };
  }, [
    isoNetMargin,
    isoPositionLeverage,
    primaryQuotePriceUsd,
    isoLiquidationPrice,
    currentCollateralSummary,
  ]);

  const estimatedSummary = useMemo(():
    | IsolatedAdjustMarginSummary
    | undefined => {
    if (!validAmount || !currentSummary) {
      return undefined;
    }

    const validAmountWithFee = validAmount.minus(SUBACCOUNT_QUOTE_TRANSFER_FEE);
    const validAmountWithDecimals = addDecimals(validAmount);
    const validAmountWithDecimalsWithFee = addDecimals(validAmountWithFee);

    const estimatedIsoNetMargin = isAddMargin
      ? isoNetMargin?.plus(validAmountWithDecimalsWithFee)
      : isoNetMargin?.minus(validAmountWithDecimals);

    const estimatedIsoLiquidationPrice = (() => {
      if (!currentIsoPosition || !estimatedIsoNetMargin) {
        return undefined;
      }

      return calcEstimatedLiquidationPriceFromBalance(
        currentIsoPosition.baseBalance,
        estimatedIsoNetMargin,
      );
    })();

    const estimatedIsoLeverage = (() => {
      if (!estimatedIsoNetMargin || !isoNotionalValue) {
        return;
      }

      return calcIsoPositionLeverage(estimatedIsoNetMargin, isoNotionalValue);
    })();

    return {
      isoNetMarginUsd: removeDecimals(estimatedIsoNetMargin)?.multipliedBy(
        primaryQuotePriceUsd,
      ),
      isoPositionLeverage: estimatedIsoLeverage,
      isoLiquidationPrice: estimatedIsoLiquidationPrice,
      crossAccountQuoteBalance: estimatedCollateralSummary?.vertexBalance,
      fundsAvailable: estimatedCollateralSummary?.fundsAvailableUsdBounded,
      crossMarginUsageFrac: estimatedCollateralSummary?.marginUsageBounded,
    };
  }, [
    currentSummary,
    validAmount,
    isAddMargin,
    primaryQuotePriceUsd,
    isoNetMargin,
    isoNotionalValue,
    currentIsoPosition,
    estimatedCollateralSummary,
  ]);

  const oraclePrice = (() => {
    if (!currentProductId) {
      return undefined;
    }

    // Use fast oracle price if available, otherwise use the current oracle price
    return latestOraclePrices?.[currentProductId]
      ? latestOraclePrices[currentProductId].oraclePrice
      : currentIsoPosition?.baseBalance.oraclePrice;
  })();

  const marketPriceFormatSpecifier = getMarketPriceFormatSpecifier(
    currentProductId
      ? allMarketsStaticData?.perp[currentProductId]?.priceIncrement
      : undefined,
  );

  return {
    currentSummary,
    estimatedSummary,
    marketPriceFormatSpecifier,
    metadata: currentIsoPosition?.baseBalance.metadata,
    side: currentIsoPosition?.baseBalance.amount.isPositive()
      ? 'long'
      : 'short',
    oraclePrice,
  };
}
