import { ProductEngineType } from '@vertex-protocol/client';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { ROUTES } from 'client/modules/app/consts/routes';
import { mapValues } from 'lodash';
import { useMemo } from 'react';

export function useProductTradingLinks() {
  const { data: staticMarketData } = useAllMarketsStaticData();

  return useMemo(() => {
    return mapValues(
      staticMarketData?.all,
      ({ type: productType, metadata }) => {
        const marketName = metadata.marketName;

        const baseRoute =
          productType === ProductEngineType.SPOT
            ? ROUTES.spotTrading
            : ROUTES.perpTrading;

        const link = `${baseRoute}/${marketName}`;

        return {
          link,
          productType,
        };
      },
    );
  }, [staticMarketData]);
}
