'use client';

import { WithChildren, WithClassnames } from '@vertex-protocol/web-common';
import ReactSlickSlider from 'react-slick';
import { SLIDER_SETTINGS } from 'client/sections/Interface/data';
import { useRef } from 'react';

export function Slider({ children, className }: WithChildren<WithClassnames>) {
  const sliderRef = useRef<ReactSlickSlider>(null);

  return (
    <ReactSlickSlider
      {...SLIDER_SETTINGS}
      ref={sliderRef}
      className={className}
    >
      {children}
    </ReactSlickSlider>
  );
}
