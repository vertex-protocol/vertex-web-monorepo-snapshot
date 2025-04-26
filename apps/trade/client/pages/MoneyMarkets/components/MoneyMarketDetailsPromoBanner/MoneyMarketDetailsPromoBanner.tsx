'use client';

import { joinClassNames, NextImageSrc } from '@vertex-protocol/web-common';
import { Icons, TextButton } from '@vertex-protocol/web-ui';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import Image from 'next/image';

import vrtxMoneyMarketDetailsPromoBannerBg from 'client/pages/MoneyMarkets/components/MoneyMarketDetailsPromoBanner/assets/vrtx-money-market-details-promo-banner-bg.png';
import blitzMoneyMarketDetailsPromoBannerBg from 'client/pages/MoneyMarkets/components/MoneyMarketDetailsPromoBanner/assets/blitz-money-market-details-promo-banner-bg.png';
import { clientEnv } from 'common/environment/clientEnv';
import { BrandName } from 'common/environment/types';

const BG_IMAGE_SRC_BY_BRAND: Record<BrandName, NextImageSrc> = {
  vertex: vrtxMoneyMarketDetailsPromoBannerBg,
  blitz: blitzMoneyMarketDetailsPromoBannerBg,
};

export function MoneyMarketDetailsPromoBanner() {
  const { shouldShow, dismiss } = useShowUserDisclosure(
    'money_market_details_promo_banner',
  );

  if (!shouldShow) {
    return null;
  }

  const bgImageSrc = BG_IMAGE_SRC_BY_BRAND[clientEnv.base.brandName];

  return (
    <div
      className={joinClassNames(
        'rounded-sm',
        'relative overflow-hidden p-4',
        'flex items-center gap-1',
        'text-xs',
      )}
    >
      <span className="text-text-primary ml-auto">
        <span className="font-bold">NEW:</span> Click on{' '}
        <Icons.CaretCircleRight className="inline-block align-middle" /> in the
        table rows to see historical rates and margin details.
      </span>
      <Image
        className="absolute inset-0 -z-10"
        src={bgImageSrc}
        priority
        fill
        quality={100}
        alt=""
      />
      <TextButton
        as="button"
        colorVariant="secondary"
        endIcon={<Icons.X size={12} />}
        onClick={dismiss}
        className="ml-auto"
      />
    </div>
  );
}
