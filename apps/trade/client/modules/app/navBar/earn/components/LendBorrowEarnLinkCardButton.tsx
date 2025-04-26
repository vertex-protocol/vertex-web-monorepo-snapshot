import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { Icons, Value } from '@vertex-protocol/web-ui';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useSpotInterestRates } from 'client/hooks/markets/useSpotInterestRates';
import { EarnLinkCardButton } from 'client/modules/app/navBar/earn/components/EarnLinkCardButton';
import { BaseEarnLinkProps } from 'client/modules/app/navBar/earn/types';
import { last, sortBy } from 'lodash';
import Image from 'next/image';
import { useMemo } from 'react';

export function LendBorrowEarnLinkCardButton({
  href,
  pageLabel,
}: BaseEarnLinkProps) {
  const { depositRate, metadata } = useLendBorrowEarnLinkCardButton();

  return (
    <EarnLinkCardButton
      href={href}
      pageLabel={pageLabel}
      pageIcon={Icons.ArrowsLeftRight}
      topOpportunityContent={
        <>
          <Value sizeVariant="sm" endElement="APR">
            {formatNumber(depositRate, {
              formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
            })}
          </Value>
          {!!metadata && (
            <Image
              src={metadata.token.icon.asset}
              alt=""
              className="h-5 w-auto"
            />
          )}
        </>
      }
    />
  );
}

function useLendBorrowEarnLinkCardButton() {
  const { data: spotInterestRates } = useSpotInterestRates();
  const { data: marketsStaticData } = useAllMarketsStaticData();

  return useMemo(() => {
    if (!spotInterestRates || !marketsStaticData) {
      return {};
    }

    const [productId, interestRates] =
      last(
        sortBy(Object.entries(spotInterestRates), (arr) =>
          arr[1].deposit.toNumber(),
        ),
      ) ?? [];

    const market = productId
      ? marketsStaticData.spotProducts[Number(productId)]
      : undefined;

    return {
      depositRate: interestRates?.deposit,
      metadata: market?.metadata,
    };
  }, [spotInterestRates, marketsStaticData]);
}
