import { HeaderCard } from 'client/components/HeaderCard';
import {
  DEFAULT_SECTION_PADDING,
  DEFAULT_SECTION_WIDTH,
  SECTION_IDS,
} from 'client/consts';
import { IncrementMarker } from 'client/sections/Speed/components/IncrementMarker';
import { range } from 'lodash';
import { joinClassNames } from '@vertex-protocol/web-common';
import { SpeedBars } from 'client/sections/Speed/components/SpeedBars';

const INCREMENT_TO_STRING: { [key: number]: string } = {
  0: '1s',
  1: '5s',
  2: '10s',
  3: '30s',
};

export function Speed() {
  return (
    <section
      className={joinClassNames(
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
        contentClassNames="w-3/4 md:w-3/5"
        className="items-start px-0 pb-6 md:pb-0"
      />
      <SpeedBars />
      <div className="w-full">
        <div className="text-black-500 flex w-full items-center justify-end">
          {range(4).map((_, index) => (
            <IncrementMarker
              increment={INCREMENT_TO_STRING[index]}
              key={index}
            />
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
