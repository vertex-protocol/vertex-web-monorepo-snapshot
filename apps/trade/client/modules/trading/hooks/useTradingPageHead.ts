import {
  formatNumber,
  getMarketPriceFormatSpecifier,
} from '@vertex-protocol/react-client';
import { useDebounce } from 'ahooks';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useLatestOrderFill } from 'client/hooks/markets/useLatestOrderFill';
import { clientEnv } from 'common/environment/clientEnv';
import { useLayoutEffect } from 'react';

interface Props {
  productId: number | undefined;
}

/**
 * Hook used to apply a title to the trading page based on the latest price
 */
export function useTradingPageHead({ productId }: Props) {
  const { data: latestPrice } = useLatestOrderFill({
    productId: productId,
  });
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const debouncedFill = useDebounce(latestPrice, { wait: 1000 });

  const marketData = productId
    ? allMarketsStaticData?.all[productId]
    : undefined;

  // Since the data is client-side, we directly update the `document` title
  useLayoutEffect(() => {
    if (!document || !marketData || !debouncedFill) {
      return;
    }

    const marketName = marketData.metadata.marketName;
    const priceFormatSpecifier = getMarketPriceFormatSpecifier(
      marketData.priceIncrement,
    );

    // Formatting to be consistent with the title template applied in the root layout
    // ex "60,577 BTC-PERP | Vertex"
    document.title = `${formatNumber(debouncedFill?.price, {
      formatSpecifier: priceFormatSpecifier,
    })} ${marketName} | ${clientEnv.brandMetadata.displayName}`;
  }, [debouncedFill, marketData]);
}
