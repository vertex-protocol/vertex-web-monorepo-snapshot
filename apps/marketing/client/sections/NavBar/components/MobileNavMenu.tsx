import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { HomePageButton } from 'client/components/Button/HomePageButton';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import { NAV_LINKS } from '../data';
import { scrollToElementId } from '../utils';

export function MobileNavMenu({
  toggleShowNav,
  className,
}: WithClassnames<{ toggleShowNav: () => void }>) {
  const linkClassNames =
    'border-white-600 flex w-full flex-1 items-center justify-between border-t py-4 text-sm font-bold leading-5 last:border-b-0 active:brightness-125';
  const iconClassNames = 'text-white-700 text-lg';

  const handleClick = (id: string) => {
    toggleShowNav();
    scrollToElementId(id);
  };

  return (
    <div
      className={joinClassNames(
        'text-white-700 flex h-full w-full flex-col items-start justify-center px-1 pt-8 duration-500',
        className,
      )}
    >
      {NAV_LINKS.map(({ title, href, external }, index) => {
        if (external) {
          return (
            <HomePageButton
              as={Link}
              className={linkClassNames}
              key={index}
              href={href}
              title={title}
              endIcon={<BsArrowRight className={iconClassNames} />}
              external={external}
            >
              {title}
            </HomePageButton>
          );
        }
        return (
          <HomePageButton
            className={linkClassNames}
            key={index}
            onClick={() => handleClick(href)}
            endIcon={<BsArrowRight className={iconClassNames} />}
            title={title}
          >
            {title}
          </HomePageButton>
        );
      })}
    </div>
  );
}
