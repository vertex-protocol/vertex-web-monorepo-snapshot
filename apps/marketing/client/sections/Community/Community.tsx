import { HeaderCard } from 'client/components/HeaderCard';
import {
  DEFAULT_SECTION_PADDING,
  DEFAULT_SECTION_WIDTH,
  SECTION_IDS,
} from 'client/consts';
import { BlogLinks } from './components/BlogLinks/BlogLinks';
import { NewsLinks } from './components/NewsLinks';
import { SocialLinks } from './components/SocialLinks/SocialLinks';
import { joinClassNames } from '@vertex-protocol/web-common';

export const Community = () => {
  return (
    <section
      className={joinClassNames(
        'flex scroll-m-10 flex-col gap-y-12',
        'lg:gap-y-16 lg:pb-0',
        DEFAULT_SECTION_PADDING,
        DEFAULT_SECTION_WIDTH,
      )}
      id={SECTION_IDS.community}
    >
      <HeaderCard
        heading="Let's Build the Future of DeFi. Together"
        title="community"
        headingClassNames="w-full md:w-5/6 lg:w-3/4 xl:w-3/5"
        contentClassNames="md:py-4"
        className="px-0 pb-0 md:w-3/4"
      />
      <SocialLinks />
      <div className="flex w-full flex-col gap-y-12">
        <BlogLinks />
        <div className="bg-white-600 h-px" />
        <NewsLinks />
      </div>
    </section>
  );
};
