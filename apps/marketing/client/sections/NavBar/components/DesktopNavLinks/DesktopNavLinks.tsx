import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr/ArrowUpRight';
import { HomePageButton } from 'client/components/Button/HomePageButton';
import { LINK_CLASSNAMES } from 'client/sections/NavBar/components/DesktopNavLinks/consts';
import { DesktopNavLink } from 'client/sections/NavBar/components/DesktopNavLinks/DesktopNavLink';
import { NAV_LINKS } from 'client/sections/NavBar/data';
import Link from 'next/link';

export function DesktopNavLinks() {
  return (
    <div className="flex gap-x-8">
      {NAV_LINKS.map(({ title, href, external }, index) => {
        if (external) {
          return (
            <HomePageButton
              key={index}
              as={Link}
              href={href}
              className={LINK_CLASSNAMES}
              external={external}
              endIcon={external && <ArrowUpRight size={20} />}
            >
              {title}
            </HomePageButton>
          );
        }

        return (
          <DesktopNavLink key={index} href={href}>
            {title}
          </DesktopNavLink>
        );
      })}
    </div>
  );
}
