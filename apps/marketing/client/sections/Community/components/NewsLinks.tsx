import { HomePageButton } from 'client/components/Button/HomePageButton';
import { formatDate } from 'client/utils/formatDate';
import Link from 'next/link';
import { NEWS_LINKS } from 'client/sections/Community/data';
import { CommunityGradientPill } from 'client/sections/Community/components/CommunityGradientPill';
import { joinClassNames } from '@vertex-protocol/web-common';

export function NewsLinks() {
  return (
    <div className="flex flex-col items-start gap-y-7">
      <CommunityGradientPill content="In the media" />
      <div
        className={joinClassNames(
          'grid gap-y-11',
          'sm:grid-cols-2 sm:gap-x-8',
          'md:h-40 md:grid-cols-3',
        )}
      >
        {NEWS_LINKS.map(({ date, title, href }) => (
          <HomePageButton
            key={date.toLocaleString()}
            as={Link}
            href={href}
            external
            className="flex flex-col gap-y-2 whitespace-pre-wrap hover:opacity-80 md:h-full"
          >
            <span className="text-white-700 text-sm">{formatDate(date)}</span>
            <span className="text-lg font-bold text-white">{title}</span>
          </HomePageButton>
        ))}
      </div>
    </div>
  );
}
