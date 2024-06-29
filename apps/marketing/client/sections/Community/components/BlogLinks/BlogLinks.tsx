import { HomePageButton } from 'client/components/Button/HomePageButton';
import { EXTERNAL_LINKS } from 'client/consts';
import { useLatestBlogPosts } from 'client/hooks/useLatestBlogPosts';
import Link from 'next/link';
import { MdArrowUpward } from 'react-icons/md';
import { CommunityGradientPill } from '../CommunityGradientPill';
import { BlogCard } from './BlogCard';
import { joinClassNames } from '@vertex-protocol/web-common';

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
          endIcon={<MdArrowUpward className="rotate-45 text-purple-700" />}
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
