'use client';

import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { MarketsDepositRates } from 'client/pages/Markets/components/cards/MarketsDepositRates/MarketsDepositRates';
import { MarketsRecentlyAdded } from 'client/pages/Markets/components/cards/MarketsRecentlyAdded/MarketsRecentlyAdded';
import { MarketsStaking } from 'client/pages/Markets/components/cards/MarketsStaking/MarketsStaking';
import {
  COMMON_SWIPER_CLASSNAME,
  COMMON_SWIPER_PROPS,
} from 'client/pages/Markets/components/consts';
import { SwiperNavigation } from 'client/pages/Markets/components/SwiperNavigation';
import { clientEnv } from 'common/environment/clientEnv';
import { Swiper, SwiperSlide } from 'swiper/react';

export function MarketsSecondCarousel({ className }: WithClassnames) {
  return (
    <Swiper
      {...COMMON_SWIPER_PROPS}
      className={joinClassNames(COMMON_SWIPER_CLASSNAME, className)}
    >
      <SwiperNavigation />
      {clientEnv.base.brandName === 'vertex' && (
        <SwiperSlide>
          <MarketsStaking />
        </SwiperSlide>
      )}
      <SwiperSlide>
        <MarketsDepositRates />
      </SwiperSlide>
      <SwiperSlide>
        <MarketsRecentlyAdded />
      </SwiperSlide>
    </Swiper>
  );
}
