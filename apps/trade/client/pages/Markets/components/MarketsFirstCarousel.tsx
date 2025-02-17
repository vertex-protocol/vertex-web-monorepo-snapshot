'use client';

import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { MarketsGainersLosers } from 'client/pages/Markets/components/cards/MarketsGainersLosers/MarketsGainersLosers';
import { MarketsHotMarkets } from 'client/pages/Markets/components/cards/MarketsHotMarkets/MarketsHotMarkets';
import { MarketsTopPredictedFunding } from 'client/pages/Markets/components/cards/MarketsTopPredictedFunding/MarketsTopPredictedFunding';
import {
  COMMON_SWIPER_CLASSNAME,
  COMMON_SWIPER_PROPS,
} from 'client/pages/Markets/components/consts';
import { SwiperNavigation } from 'client/pages/Markets/components/SwiperNavigation';
import { Swiper, SwiperSlide } from 'swiper/react';

export function MarketsFirstCarousel({ className }: WithClassnames) {
  return (
    <Swiper
      {...COMMON_SWIPER_PROPS}
      className={joinClassNames(COMMON_SWIPER_CLASSNAME, className)}
    >
      <SwiperNavigation />
      <SwiperSlide>
        <MarketsHotMarkets />
      </SwiperSlide>
      <SwiperSlide>
        <MarketsGainersLosers />
      </SwiperSlide>
      <SwiperSlide>
        <MarketsTopPredictedFunding />
      </SwiperSlide>
    </Swiper>
  );
}
