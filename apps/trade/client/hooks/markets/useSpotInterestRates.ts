import {
  calcBorrowRateForTimeRange,
  calcRealizedDepositRateForTimeRange,
} from '@vertex-protocol/contracts';
import { BigDecimal, TimeInSeconds } from '@vertex-protocol/utils';
import { useAllMarkets } from 'client/hooks/query/markets/allMarkets/useAllMarkets';
import { useMinDepositRates } from 'client/hooks/query/markets/useMinDepositRates';
import { useMemo } from 'react';

/**
 * Rates are represented as an annualized APR in fractional form
 */
export interface SpotInterestRate {
  deposit: BigDecimal;
  borrow: BigDecimal;
}

/**
 * Returns a mapping of product ID -> interest rates for quote + spot markets
 */
export function useSpotInterestRates() {
  const { data: minDepositRatesData } = useMinDepositRates();
  const { data: allMarkets } = useAllMarkets();

  const data = useMemo(() => {
    if (!allMarkets) {
      return;
    }

    const rates: Record<number, SpotInterestRate> = {};
    [
      allMarkets.primaryQuoteProduct,
      ...Object.values(allMarkets.spotMarkets),
    ].forEach(({ product }) => {
      const minDepositRate =
        minDepositRatesData?.minDepositRates?.[product.productId];

      rates[product.productId] = {
        deposit: calcRealizedDepositRateForTimeRange(
          product,
          TimeInSeconds.YEAR,
          0.2,
          minDepositRate?.minDepositRate ?? 0,
        ),
        borrow: calcBorrowRateForTimeRange(
          product,
          TimeInSeconds.YEAR,
          minDepositRate?.minDepositRate ?? 0,
        ),
      };
    });

    return rates;
  }, [allMarkets, minDepositRatesData?.minDepositRates]);

  return {
    data,
  };
}
