import {
  formatNumber,
  PresetNumberFormatSpecifier,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { Icons, Value } from '@vertex-protocol/web-ui';
import { TokenPairIcons } from 'client/components/TokenPairIcons';
import { StaticMarketData } from 'client/hooks/markets/marketsStaticData/types';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useLpYields } from 'client/hooks/markets/useLpYields';
import { EarnLinkCardButton } from 'client/modules/app/navBar/earn/components/EarnLinkCardButton';
import { BaseEarnLinkProps } from 'client/modules/app/navBar/earn/types';
import { last, sortBy } from 'lodash';
import { useMemo } from 'react';

export function PoolsEarnLinkCardButton({
  href,
  pageLabel,
}: BaseEarnLinkProps) {
  const { metadata, primaryQuoteToken, yieldApr } = usePoolEarnLinkCardButton();

  return (
    <EarnLinkCardButton
      href={href}
      pageLabel={pageLabel}
      pageIcon={Icons.Intersect}
      topOpportunityContent={
        <>
          <Value sizeVariant="sm" endElement="APR">
            {formatNumber(yieldApr, {
              formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
            })}
          </Value>
          {!!metadata && (
            <TokenPairIcons
              size={20}
              first={{
                src: metadata.token.icon.asset,
                alt: metadata.token.symbol,
              }}
              second={{
                src: primaryQuoteToken.icon.asset,
                alt: primaryQuoteToken.symbol,
              }}
            />
          )}
        </>
      }
    />
  );
}

function usePoolEarnLinkCardButton() {
  const { data: lpYields } = useLpYields();
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { data: marketStaticData } = useAllMarketsStaticData();

  const { metadata, yieldApr } = useMemo(() => {
    if (!lpYields || !marketStaticData) {
      return {};
    }

    const [productId, yieldApr] =
      last(sortBy(Object.entries(lpYields), (arr) => arr[1].toNumber())) ?? [];

    const marketData: StaticMarketData | undefined =
      marketStaticData.spotMarkets[Number(productId)];

    return {
      metadata: marketData?.metadata,
      yieldApr,
    };
  }, [lpYields, marketStaticData]);

  return {
    metadata,
    yieldApr,
    primaryQuoteToken,
  };
}
