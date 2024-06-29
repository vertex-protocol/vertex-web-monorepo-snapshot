import {
  formatNumber,
  getMarketPriceFormatSpecifier,
} from '@vertex-protocol/react-client';
import { useDebounce } from 'ahooks';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useLatestOrderFill } from 'client/hooks/markets/useLatestOrderFill';
import { clientEnv } from 'common/environment/clientEnv';
import Head from 'next/head';
import { useMemo } from 'react';

interface Props {
  productId: number | undefined;
}

export function TradingPageHead({ productId }: Props) {
  const { data: latestPrice } = useLatestOrderFill({
    productId: productId,
  });
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const debouncedFill = useDebounce(latestPrice, { wait: 1000 });

  const marketData = productId
    ? allMarketsStaticData?.all[productId]
    : undefined;

  const title = useMemo(() => {
    if (!marketData) {
      return `Trade | ${clientEnv.brandMetadata.displayName}`;
    }

    const marketName = marketData.metadata.marketName;
    const priceFormatSpecifier = getMarketPriceFormatSpecifier(
      marketData.priceIncrement,
    );

    return `${formatNumber(debouncedFill?.price, {
      formatSpecifier: priceFormatSpecifier,
    })} ${marketName} | ${clientEnv.brandMetadata.displayName}`;
  }, [debouncedFill?.price, marketData]);

  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
