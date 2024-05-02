import { ProductEngineType } from '@vertex-protocol/contracts';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useProductTradingLinks } from './useProductTradingLinks';

interface Params {
  productId: number;
}

export function usePushTradePage() {
  const { push, replace, asPath } = useRouter();
  const productTradingLinks = useProductTradingLinks();

  const isOnSpot = asPath.startsWith(ROUTES.spotTrading);
  const isOnPerp = asPath.startsWith(ROUTES.perpTrading);

  return useCallback(
    async (params: Params) => {
      const productTradingLink = productTradingLinks[params.productId];

      if (!productTradingLink) {
        return;
      }

      const { link, productType } = productTradingLink;

      // If already on the correct page, do a replace instead of a push
      const useReplace =
        (isOnSpot && productType === ProductEngineType.SPOT) ||
        (isOnPerp && productType === ProductEngineType.PERP);
      const routerUpdateFn = useReplace ? replace : push;

      routerUpdateFn(link);
    },
    [productTradingLinks, isOnSpot, isOnPerp, replace, push],
  );
}
