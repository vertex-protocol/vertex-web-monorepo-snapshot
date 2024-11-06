'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import logo from 'assets/logo-light.svg';
import { SpeedBar } from 'client/sections/Speed/components/SpeedBar';
import { useSpeedBars } from 'client/sections/Speed/hooks/useSpeedBars';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function SpeedBars() {
  const { containerRef, isInView } = useSpeedBars();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;
    setInView(isInView);
  }, [isInView, inView]);

  return (
    <div
      className={joinClassNames(
        'flex w-full flex-col items-start justify-center gap-y-9',
        'text-black-500 font-bold',
        'md:gap-y-4',
        'xl:text-xl',
      )}
      ref={containerRef}
    >
      <SpeedBar
        label="Ethereum DEX (13.23s)"
        className="w-[77%] delay-100 duration-[1.5s]"
        inView={inView}
      />
      <SpeedBar
        label="L2 DEX (1.31s)"
        className="w-[27%] delay-150 duration-1000"
        inView={inView}
      />
      <SpeedBar
        label="Popular CEX (1-50ms)"
        className="w-[2%] delay-300 duration-200"
        inView={inView}
      />
      <SpeedBar
        label={
          <div className="flex items-center gap-x-2">
            <Image
              src={logo}
              alt="Vertex"
              className={joinClassNames(
                'delay-300 duration-500 md:scale-90',
                inView ? 'opacity-100' : 'opacity-0',
              )}
            />{' '}
            (10-30ms)
          </div>
        }
        className="bg-speedGradient w-[1%] delay-[400ms] duration-200"
        inView={inView}
      />
    </div>
  );
}
