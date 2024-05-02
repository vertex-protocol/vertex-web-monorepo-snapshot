import classNames from 'classnames';
import { HeaderCard } from 'client/components/HeaderCard';
import {
  DEFAULT_SECTION_PADDING,
  DEFAULT_SECTION_WIDTH,
  SECTION_IDS,
} from 'client/consts';
import { IncrementMarker } from 'client/sections/Speed/components/IncrementMarker';
import { SpeedBar } from 'client/sections/Speed/components/SpeedBar';
import { useSpeedSection } from 'client/sections/Speed/hooks/useSpeedSection';
import { range } from 'lodash';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import logo from 'assets/logo-light.svg';

export function Speed() {
  const { containerRef, isInView, incrementToString } = useSpeedSection();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;
    setInView(isInView);
  }, [isInView, inView]);

  return (
    <section
      className={classNames(
        'flex flex-col items-start justify-center',
        'gap-y-6 md:gap-y-16 xl:gap-y-24',
        DEFAULT_SECTION_PADDING,
        DEFAULT_SECTION_WIDTH,
      )}
      id={SECTION_IDS.speed}
    >
      <HeaderCard
        title="Speed"
        heading="Lightning fast"
        content="Order matching execution of ~30 milliseconds. Vertex is as powerful as your favorite CEX."
        contentClassNames="w-3/4 md:w-3/5 "
        className="items-start px-0 pb-6 md:pb-0"
      />
      <div
        className={classNames(
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
            <div className="flex items-center gap-x-2 leading-8">
              <Image
                src={logo}
                alt="Vertex"
                className={classNames(
                  '-mt-0.5 flex h-full justify-start delay-300 duration-500 md:scale-90',
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
      <div className="w-full">
        <div className="text-black-500 flex w-full items-center justify-end">
          {range(4).map((_, index) => (
            <IncrementMarker increment={incrementToString[index]} key={index} />
          ))}
        </div>
        <div className="font-dmSans text-white-700 text-2xs pt-6 font-normal italic lg:text-xs">
          *Stats based on Ethereum and L2 block time averages over 6 months, and
          a range of 3 of the top tier centralized exchange API speeds.
        </div>
      </div>
    </section>
  );
}
