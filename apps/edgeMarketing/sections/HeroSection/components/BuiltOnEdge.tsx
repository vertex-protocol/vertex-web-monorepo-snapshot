'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { EdgeTileLink } from 'components/EdgeTileLink/EdgeTileLink';
import Link from 'next/link';
import { DesktopAppPreview } from 'sections/HeroSection/components/DesktopAppPreview';
import { useBuiltOnEdge } from 'sections/HeroSection/components/useBuiltOnEdge';

// Images
export function BuiltOnEdge() {
  const { selectedApp, appsData, setSelectedApp } = useBuiltOnEdge();

  const mobileLinkContent = (
    <div className="flex flex-wrap items-center justify-evenly gap-4 sm:hidden">
      {appsData.map(({ name, url, mobileContent }) => {
        return (
          <Link key={name} target="_blank" rel="noopener noreferrer" href={url}>
            {mobileContent}
          </Link>
        );
      })}
    </div>
  );

  const desktopLinkContent = (
    <div className="hidden flex-1 gap-x-3 sm:flex">
      {appsData.map((app) => {
        const { name, url, content, contentOnHover, bgImageOnHover } = app;

        return (
          <EdgeTileLink
            key={name}
            href={url}
            content={content}
            contentOnHover={contentOnHover}
            bgImageOnHover={bgImageOnHover}
            linkIconClassName="text-white"
            external
            onMouseEnter={() => setSelectedApp(app)}
            onMouseLeave={() => setSelectedApp(undefined)}
          />
        );
      })}
    </div>
  );

  return (
    <div className="p-6 pb-12 sm:self-end lg:px-12">
      <div
        className={joinClassNames(
          'bg-gray-light relative gap-3',
          'rounded-[22px] p-3 sm:pr-1.5',
          'flex flex-col-reverse',
          'sm:flex-row sm:items-center sm:justify-between',
        )}
      >
        {mobileLinkContent}
        {desktopLinkContent}
        <span className="sm:w-6">
          <div className="text-center whitespace-nowrap sm:-translate-y-8 sm:rotate-90">
            Built on Edge
          </div>
        </span>
        <DesktopAppPreview selectedApp={selectedApp} />
      </div>
    </div>
  );
}
