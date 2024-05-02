import classNames from 'classnames';
import { GradientButton } from 'client/components/Button/GradientButton';
import { EXTERNAL_LINKS, SECTION_IDS } from 'client/consts';
import Link from 'next/link';

export function LearnMore() {
  return (
    <section
      className="relative flex w-full items-center justify-center px-2 sm:px-5 md:px-14"
      id={SECTION_IDS.learnMore}
    >
      <div
        className={classNames(
          'flex w-full flex-col items-center justify-center',
          'overflow-hidden rounded-lg py-6 text-white',
          'bg-mobileLearnMore bg-cover bg-center bg-no-repeat',
          'sm:bg-learnMore sm:bg-cover sm:bg-center sm:py-12',
        )}
      >
        <div className="text-4xl font-bold md:text-5xl lg:text-6xl">
          Trade &amp; Earn
        </div>
        <div className="font-dmSans text-white-700 w-full text-center text-base md:text-2xl">
          Trade on Vertex and EARN $VRTX
        </div>
        <div className="flex flex-col items-center justify-center gap-x-8 pt-8">
          <GradientButton
            as={Link}
            href={EXTERNAL_LINKS.app}
            className="px-12 py-4 text-base"
            external
          >
            Start Trading
          </GradientButton>
        </div>
      </div>
    </section>
  );
}
