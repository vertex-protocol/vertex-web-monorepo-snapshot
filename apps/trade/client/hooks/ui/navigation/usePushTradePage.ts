import { ProductEngineType } from '@vertex-protocol/contracts';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { ROUTES } from 'client/modules/app/consts/routes';
import { get, startsWith } from 'lodash';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface Params {
  productId: number;
}

export function usePushTradePage() {
  const { push, replace } = useRouter();
  const pathname = usePathname();
  const productTradingLinks = useProductTradingLinks();

  const isOnSpot = startsWith(pathname, ROUTES.spotTrading);
  const isOnPerp = startsWith(pathname, ROUTES.perpTrading);

  return useCallback(
    async (params: Params) => {
      const productTradingLink = get(
        productTradingLinks,
        params.productId,
        undefined,
      );

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
