import { getStaticMarketDataForProductId } from 'client/hooks/markets/marketsStaticData/getStaticMarketDataForProductId';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSpotBalances } from 'client/hooks/subaccount/useSpotBalances';
import { getHealthWeights } from 'client/utils/calcs/healthCalcs';
import { useMemo } from 'react';

interface Params {
  productId: number;
}

export function useSpotBalanceHealthMetrics({ productId }: Params) {
  const { data: marketsStaticData, isLoading: isLoadingMarketsStaticData } =
    useAllMarketsStaticData();
  const { balances: spotBalances } = useSpotBalances();

  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const mappedData = useMemo(() => {
    if (!marketsStaticData || !spotBalances) {
      return;
    }

    const spotBalance = spotBalances?.find(
      (balance) => balance.productId === productId,
    );

    if (!spotBalance) {
      return;
    }

    const staticSpotMarketData = getStaticMarketDataForProductId(
      productId,
      marketsStaticData,
    );

    if (!staticSpotMarketData) {
      return;
    }

    const healthWeights = getHealthWeights(
      spotBalance.amount,
      staticSpotMarketData,
    );

    return {
      initialHealth: {
        marginUsd:
          spotBalance.healthMetrics.initial.multipliedBy(primaryQuotePriceUsd),
        weight: healthWeights.initial,
      },
      maintenanceHealth: {
        marginUsd:
          spotBalance.healthMetrics.maintenance.multipliedBy(
            primaryQuotePriceUsd,
          ),
        weight: healthWeights.maintenance,
      },
    };
  }, [marketsStaticData, primaryQuotePriceUsd, productId, spotBalances]);

  return {
    data: mappedData,
    isLoading: isLoadingMarketsStaticData,
  };
}
