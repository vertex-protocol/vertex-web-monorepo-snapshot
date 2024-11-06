'use client';

import { WithChildren } from '@vertex-protocol/web-common';
import { scrollToElementId } from 'client/sections/NavBar/utils';
import { HomePageButton } from 'client/components/Button/HomePageButton';
import { LINK_CLASSNAMES } from 'client/sections/NavBar/components/DesktopNavLinks/consts';

interface Props extends WithChildren {
  href: string;
}

export function DesktopNavLink({ href, children }: Props) {
  return (
    <HomePageButton
      className={LINK_CLASSNAMES}
      onClick={() => scrollToElementId(href)}
    >
      {children}
    </HomePageButton>
  );
}
