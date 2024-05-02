import { useLatestOrderFill } from 'client/hooks/markets/useLatestOrderFill';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import Head from 'next/head';
import { useMemo } from 'react';
import { useDebounce } from 'ahooks';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
import { clientEnv } from 'common/environment/clientEnv';

interface Props {
  productId?: number;
  marketName?: string;
}

export function TradingPageHead({ productId, marketName }: Props) {
  const { data: latestPrice } = useLatestOrderFill({
    productId: productId,
  });
  const { data: marketStaticData } = useAllMarketsStaticData();
  const debouncedFill = useDebounce(latestPrice, { wait: 1000 });

  const formatSpecifier = useMemo(() => {
    const priceIncrement = productId
      ? marketStaticData?.all[productId]?.priceIncrement
      : undefined;
    return getMarketPriceFormatSpecifier(priceIncrement);
  }, [marketStaticData?.all, productId]);

  const title = useMemo(() => {
    // Use custom title if market is initialized
    if (marketName) {
      return `${formatNumber(debouncedFill?.price, {
        formatSpecifier,
      })} ${marketName} | ${clientEnv.brandMetadata.displayName}`;
    }
    // Default
    return `Trade | ${clientEnv.brandMetadata.displayName}`;
  }, [debouncedFill?.price, formatSpecifier, marketName]);

  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
