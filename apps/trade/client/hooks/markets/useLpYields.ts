import { useQuery } from '@tanstack/react-query';
import { ChainEnv, QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
} from '@vertex-protocol/react-client';
import { BigDecimal, BigDecimals, TimeInSeconds } from '@vertex-protocol/utils';
import { useAllProducts24hrHistoricalSnapshot } from 'client/hooks/markets/useAllProducts24hrHistoricalSnapshot';
import { useSpotInterestRates } from 'client/hooks/markets/useSpotInterestRates';
import { useAllMarkets } from 'client/hooks/query/markets/useAllMarkets';
import { calcEstimatedLpApr } from 'client/utils/calcs/calcEstimatedLpApr';
import { get } from 'lodash';

// Can assume LP yields is slow updating, so no need for a dependency on lastUpdateTime
export function lpYieldsQueryKey(chainEnv?: ChainEnv) {
  return createQueryKey('lpYields', chainEnv);
}

/**
 * Hook for LP APR rates for all products
 */
export function useLpYields() {
  const { primaryChainEnv } = useEVMContext();
  const { data: latestMarkets } = useAllMarkets();
  const { data: spotInterestRates } = useSpotInterestRates();
  const { data: historicalSnapshots } = useAllProducts24hrHistoricalSnapshot();

  const disabled = !latestMarkets || !historicalSnapshots || !spotInterestRates;

  const queryFn = () => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const quoteDepositAPR =
      get(spotInterestRates, QUOTE_PRODUCT_ID, undefined)?.deposit ??
      BigDecimals.ZERO;
    // Assume all markets data is current
    const yieldsByProductId: Record<number, BigDecimal> = {};

    Object.values(latestMarkets.spotMarkets).forEach((spotMarket) => {
      const snapshot = historicalSnapshots[spotMarket.productId];
      const productSnapshot = snapshot?.product;

      // The average deposit APR for quote & base is the minimum APR of the pool
      const productDepositAPR =
        get(spotInterestRates, spotMarket.productId, undefined)?.deposit ??
        BigDecimals.ZERO;
      const lpDepositAPR = productDepositAPR.plus(quoteDepositAPR).div(2);

      if (!productSnapshot) {
        yieldsByProductId[spotMarket.productId] = lpDepositAPR;
        return;
      }
      const estimatedLpApr = calcEstimatedLpApr(
        productSnapshot,
        spotMarket.product,
        // Using 1 day here is not quite correct as the snapshot could be older - but it's close enough
        TimeInSeconds.DAY,
      );
      // If no LP deposits, use the deposit APR
      yieldsByProductId[spotMarket.productId] = BigDecimal.max(
        lpDepositAPR,
        estimatedLpApr,
      );
    });

    return yieldsByProductId;
  };

  return useQuery({
    queryKey: lpYieldsQueryKey(primaryChainEnv),
    queryFn,
    enabled: !disabled,
  });
}
