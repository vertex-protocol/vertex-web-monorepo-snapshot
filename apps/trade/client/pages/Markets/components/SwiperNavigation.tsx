import { joinClassNames } from '@vertex-protocol/web-common';
import { IconButton, Icons } from '@vertex-protocol/web-ui';
import { useSwiper } from 'swiper/react';

export function SwiperNavigation({
  fullWidthOnDesktop,
}: {
  fullWidthOnDesktop?: boolean;
}) {
  const swiper = useSwiper();

  const iconClassName = 'pointer-events-auto';

  return (
    <div
      className={joinClassNames(
        'pointer-events-none absolute right-2 top-3 z-10 flex gap-x-3 px-2',
        fullWidthOnDesktop &&
          'lg:right-auto lg:top-1/2 lg:w-full lg:-translate-y-1/2 lg:justify-between',
      )}
    >
      <IconButton
        className={iconClassName}
        size="xs"
        borderRadiusVariant="full"
        icon={Icons.CaretLeft}
        onClick={() => swiper?.slidePrev()}
      />
      <IconButton
        className={iconClassName}
        size="xs"
        borderRadiusVariant="full"
        icon={Icons.CaretRight}
        onClick={() => swiper?.slideNext()}
      />
    </div>
  );
}
