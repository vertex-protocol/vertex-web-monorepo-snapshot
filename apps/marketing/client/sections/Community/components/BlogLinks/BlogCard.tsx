import { joinClassNames } from '@vertex-protocol/web-common';
import { HomePageButton } from 'client/components/Button/HomePageButton';
import { BlogPost } from 'client/hooks/useLatestBlogPosts';
import { formatDate } from 'client/utils/formatDate';
import Image from 'next/image';
import Link from 'next/link';

import defaultBlogImage from 'assets/default-blog-image.jpeg';

export function BlogCard({ image, title, url, date, ...rest }: BlogPost) {
  return (
    <HomePageButton
      className={joinClassNames(
        'flex min-h-max flex-col md:grid md:h-44',
        'grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1',
        'gap-6 overflow-hidden hover:opacity-80',
      )}
      as={Link}
      href={url}
      external
      {...rest}
    >
      <div className="relative h-56 w-full overflow-hidden rounded-md md:h-full">
        <Image
          src={image ?? defaultBlogImage}
          alt={title}
          sizes="(max-width: 875px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
        />
      </div>
      <div className="flex flex-col gap-y-4 md:h-full md:justify-end">
        <p className="text-white-700 w-full text-sm">{formatDate(date)}</p>
        <h3
          className={joinClassNames(
            'line-clamp-4 whitespace-pre-wrap font-bold leading-tight text-white',
            'sm:text-lg',
            'lg:text-2xl',
          )}
        >
          {title}
        </h3>
      </div>
    </HomePageButton>
  );
}
