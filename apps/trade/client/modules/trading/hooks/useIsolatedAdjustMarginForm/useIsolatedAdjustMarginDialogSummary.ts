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
import { SEQUENCER_FEE_AMOUNT_USDC } from 'client/consts/sequencerFee';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useLatestOraclePrices } from 'client/hooks/query/markets/useLatestOraclePrices';
import { useSubaccountIsolatedPositions } from 'client/hooks/query/subaccount/isolatedPositions/useSubaccountIsolatedPositions';
import { useCollateralEstimateSubaccountInfoChange } from 'client/modules/collateral/hooks/useCollateralEstimateSubaccountInfoChange';
import { calcIsoPositionLeverage } from 'client/utils/calcs/perp/calcIsoPositionLeverage';
import { calcIsoPositionNetMargin } from 'client/utils/calcs/perp/calcIsoPositionNetMargin';
import { calcEstimatedLiquidationPriceFromBalance } from 'client/utils/calcs/perp/liquidationPriceCalcs';
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
      : addDecimals(validAmount.minus(SEQUENCER_FEE_AMOUNT_USDC));

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
      currentIsoPosition.healths.maintenance,
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
      fundsAvailable: currentCollateralSummary?.fundsAvailableBoundedUsd,
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

    const validAmountWithFee = validAmount.minus(SEQUENCER_FEE_AMOUNT_USDC);
    const validAmountWithDecimals = addDecimals(validAmount);
    const validAmountWithDecimalsWithFee = addDecimals(validAmountWithFee);

    const isoNetMarginDeltaWithDecimals = isAddMargin
      ? validAmountWithDecimalsWithFee
      : validAmountWithDecimals.negated();
    const estimatedIsoNetMarginWithDecimals = isoNetMargin?.plus(
      isoNetMarginDeltaWithDecimals,
    );

    const estimatedIsoLiquidationPrice = (() => {
      if (!currentIsoPosition) {
        return undefined;
      }

      return calcEstimatedLiquidationPriceFromBalance(
        currentIsoPosition.baseBalance,
        currentIsoPosition.healths.maintenance.plus(
          isoNetMarginDeltaWithDecimals,
        ),
      );
    })();

    const estimatedIsoLeverage = (() => {
      if (!estimatedIsoNetMarginWithDecimals || !isoNotionalValue) {
        return;
      }

      return calcIsoPositionLeverage(
        estimatedIsoNetMarginWithDecimals,
        isoNotionalValue,
      );
    })();

    return {
      isoNetMarginUsd: removeDecimals(
        estimatedIsoNetMarginWithDecimals,
      )?.multipliedBy(primaryQuotePriceUsd),
      isoPositionLeverage: estimatedIsoLeverage,
      isoLiquidationPrice: estimatedIsoLiquidationPrice,
      crossAccountQuoteBalance: estimatedCollateralSummary?.vertexBalance,
      fundsAvailable: estimatedCollateralSummary?.fundsAvailableBoundedUsd,
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
      ? allMarketsStaticData?.perpMarkets[currentProductId]?.priceIncrement
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
