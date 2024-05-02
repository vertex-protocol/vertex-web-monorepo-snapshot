import { useQuery } from '@tanstack/react-query';
import { BigDecimal, TimeInSeconds } from '@vertex-protocol/utils';
import {
  createQueryKey,
  PrimaryChainID,
  usePrimaryChainId,
} from '@vertex-protocol/web-data';
import { useAllProducts24hrHistoricalSnapshot } from 'client/hooks/markets/useAllProducts24hrHistoricalSnapshot';
import { useAllMarkets } from 'client/hooks/query/markets/useAllMarkets';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { calcEstimatedLpApr } from 'client/utils/calcs/calcEstimatedLpApr';
import { calcDepositAPR } from 'client/utils/calcs/calcSpotApr';

// Can assume LP yields is slow updating, so no need for a dependency on lastUpdateTime
export function lpYieldsQueryKey(chainId?: PrimaryChainID) {
  return createQueryKey('lpYields', chainId);
}
/**
 * Hook for LP APR rates for all products
 */
export function useLpYields() {
  const primaryChainId = usePrimaryChainId();
  const { data: latestMarkets } = useAllMarkets();
  const { data: historicalSnapshots } = useAllProducts24hrHistoricalSnapshot();

  const disabled = !latestMarkets || !historicalSnapshots;

  const queryFn = () => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const quoteDepositAPR = calcDepositAPR(latestMarkets.quoteProduct.product);
    // Assume all markets data is current
    const yieldsByProductId: Record<number, BigDecimal> = {};

    Object.values(latestMarkets.spotMarkets).forEach((spotMarket) => {
      const snapshot = historicalSnapshots[spotMarket.productId];
      const productSnapshot = snapshot?.product;

      // The average deposit APR for quote & base is the minimum APR of the pool
      const productDepositAPR = calcDepositAPR(spotMarket.product);
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
    queryKey: lpYieldsQueryKey(primaryChainId),
    queryFn,
    enabled: !disabled,
  });
}
