'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { ClientVideo } from 'client/components/ClientVideo/ClientVideo';
import { AnimatedOrderList } from 'client/components/OrderbookVisual/AnimatedOrderList';
import {
  ANIMATION_DURATION,
  BID_COMBINATIONS,
  OFFER_COMBINATIONS,
  TRADERS_DATA,
} from 'client/components/OrderbookVisual/data';
import { TradersList } from 'client/components/TradersList/TradersList';
import React, { useEffect, useRef, useState } from 'react';

export function OrderbookVisual() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [animationCycle, setAnimationCycle] = useState(0);

  // Sets the animation cycle and plays the video.
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationCycle((prev) => prev + 1);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }, ANIMATION_DURATION);

    return () => clearInterval(interval);
  }, []);

  const orderbookClasses = joinClassNames(
    'bg-black flex items-center justify-between rounded-lg px-2 sm:p-6',
    'flex-row relative overflow-hidden h-[350px] sm:h-[420px] max-w-[400px] sm:max-w-none',
  );

  const videoClasses = joinClassNames(
    'absolute inset-0 h-[320px] w-full top-[15px] rounded-lg',
    'object-cover contrast-[1.05] sm:h-[390px] sm:top-[10px]',
  );

  return (
    <div className={orderbookClasses}>
      <div className="absolute inset-0 bg-black" />
      <ClientVideo
        videoRef={videoRef}
        videoSrc="/video/multichain.mp4"
        loop={false}
        className={videoClasses}
        muted={true}
      />
      <div className="relative z-10 flex flex-1 flex-col gap-y-4 sm:gap-y-8">
        <div>
          <h3 className="text-body-gray text-body-13 mb-4">Offers from</h3>
          <AnimatedOrderList
            combinations={OFFER_COMBINATIONS}
            borderColor="border-red"
            animationCycle={animationCycle}
          />
        </div>
        <div>
          <h3 className="text-body-gray text-body-13 my-4">Bids from</h3>
          <AnimatedOrderList
            combinations={BID_COMBINATIONS}
            borderColor="border-green"
            animationCycle={animationCycle}
          />
        </div>
      </div>
      <TradersList traders={TRADERS_DATA} animationCycle={animationCycle} />
    </div>
  );
}
