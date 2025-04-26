import { toBigDecimal } from '@vertex-protocol/client';
import { BigDecimal } from '@vertex-protocol/utils';
import { useAllMarkets } from 'client/hooks/query/markets/allMarkets/useAllMarkets';
import { useMemo } from 'react';

/**
 * This hooks returns decimal-adjusted minimum initial deposit amount by product ID
 * The minimum initial deposit amount to open a subaccount is 5 USDC worth of the product
 */
export function useMinInitialDepositAmountByProductId() {
  const { data, ...rest } = useAllMarkets();

  const mappedData = useMemo(() => {
    if (!data) {
      return;
    }
    const amountByProductId: Record<number, BigDecimal> = {};

    Object.values(data.spotProducts).forEach((market) => {
      amountByProductId[market.productId] = toBigDecimal(5)
        .div(market.product.oraclePrice)
        .precision(2, BigDecimal.ROUND_UP);
    });

    return amountByProductId;
  }, [data]);

  return {
    data: mappedData,
    ...rest,
  };
}
