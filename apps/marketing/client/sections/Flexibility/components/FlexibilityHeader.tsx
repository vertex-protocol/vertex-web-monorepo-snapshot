import { ColorBorderButton } from 'client/components/Button/ColorBorderButton';
import { HeaderCard } from 'client/components/HeaderCard';
import { EXTERNAL_LINKS } from 'client/consts';
import Link from 'next/link';
import { MdPlayArrow } from 'react-icons/md';

export const FlexibilityHeader = () => {
  return (
    // Adding right padding on mobile to center the content and compensate for
    // the lack of container padding
    <div className="flex h-full flex-col items-center justify-center gap-y-8 pr-5 sm:pr-0">
      <HeaderCard
        heading="Universal Margin Account"
        title="Flexibility & Efficiency"
        content={
          <div className="flex flex-col">
            <p>
              One trading account - share margin across all of your positions
              and assets.
            </p>
            <p>On Vertex, your portfolio is your margin.</p>
          </div>
        }
        headingClassNames="flex w-full text-center justify-center"
        contentClassNames="flex w-5/6 sm:w-full text-center"
        className="flex w-full items-center px-4 lg:px-12"
      />
      <ColorBorderButton
        as={Link}
        href={EXTERNAL_LINKS.youtube}
        startIcon={<MdPlayArrow size={24} className="-mt-px" />}
        className="flex items-center py-4 pl-9 pr-10 text-lg font-bold"
        external
      >
        See More
      </ColorBorderButton>
    </div>
  );
};
