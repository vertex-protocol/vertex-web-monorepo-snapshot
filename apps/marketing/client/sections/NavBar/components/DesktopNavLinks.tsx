import { WithClassnames } from '@vertex-protocol/web-common';
import { HomePageButton } from 'client/components/Button/HomePageButton';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

import { NAV_LINKS } from '../data';
import { scrollToElementId } from '../utils';

export function DesktopNavLinks({ className }: WithClassnames) {
  const linkClassNames =
    'text-white-700 font-dmSans h-full items-center justify-center gap-x-1 px-2.5 text-base transition hover:text-purple-800';
  return (
    <div className={className}>
      {NAV_LINKS.map(({ title, href, external }, index) => {
        if (external) {
          return (
            <HomePageButton
              key={index}
              as={Link}
              href={href}
              className={linkClassNames}
              external={external}
              endIcon={external && <FiArrowUpRight size={24} />}
            >
              {title}
            </HomePageButton>
          );
        }

        return (
          <HomePageButton
            key={index}
            className={linkClassNames}
            onClick={() => scrollToElementId(href)}
          >
            {title}
          </HomePageButton>
        );
      })}
    </div>
  );
}
