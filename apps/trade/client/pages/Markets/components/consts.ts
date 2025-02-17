import { CARD_CLASSNAMES } from '@vertex-protocol/web-ui';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { SwiperProps } from 'swiper/react';

// To avoid unnecessary complexity with the bullets we use a selector to target the span element with a custom className `swiper-pagination-bullet`
// All general styling is managed withing the library's CSS files and we only add a background-color to the bullet by selecting this className
// and applying the background-color to it
export const COMMON_SWIPER_PAGINATION_BULLET_CLASSNAME =
  '[&_span.swiper-pagination-bullet]:bg-text-primary';

export const COMMON_SWIPER_CLASSNAME = [
  'select-none w-full',
  'overflow-hidden',
  CARD_CLASSNAMES,
  COMMON_SWIPER_PAGINATION_BULLET_CLASSNAME,
];

export const COMMON_SWIPER_PROPS: Partial<SwiperProps> = {
  modules: [Navigation, Pagination, Autoplay],
  pagination: {
    clickable: true,
  },
  speed: 1000,
  navigation: true,
  autoplay: {
    delay: 5000,
    pauseOnMouseEnter: true,
    disableOnInteraction: false,
  },
  loop: true,
};
