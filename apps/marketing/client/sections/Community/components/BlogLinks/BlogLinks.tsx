'use client';

import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr/ArrowUpRight';
import { joinClassNames } from '@vertex-protocol/web-common';
import { HomePageButton } from 'client/components/Button/HomePageButton';
import { EXTERNAL_LINKS } from 'client/consts';
import { useLatestBlogPosts } from 'client/hooks/useLatestBlogPosts';
import { BlogCard } from 'client/sections/Community/components/BlogLinks/BlogCard';
import { CommunityGradientPill } from 'client/sections/Community/components/CommunityGradientPill';
import Link from 'next/link';

export type BlogCardData = {
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
};

export function BlogLinks() {
  const { data: blogPosts } = useLatestBlogPosts();

  if (!blogPosts) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-y-8">
      <div className="flex w-full items-center justify-between">
        <CommunityGradientPill content="Blog Posts" />
        <HomePageButton
          className="bg-mainPurpleGradient gradient-text text-sm font-bold uppercase sm:text-base"
          endIcon={<ArrowUpRight className="text-purple-700" />}
          as={Link}
          href={EXTERNAL_LINKS.blog}
        >
          See all blog posts
        </HomePageButton>
      </div>
      <div
        className={joinClassNames(
          'relative grid w-full grid-cols-1 justify-between gap-12',
          'sm:grid-cols-2 md:gap-16',
        )}
      >
        {blogPosts
          .slice(0, 2)
          .map(({ date, description, image, title, url }) => (
            <BlogCard
              key={title}
              date={date}
              description={description}
              title={title}
              url={url}
              image={image}
            />
          ))}
      </div>
    </div>
  );
}
