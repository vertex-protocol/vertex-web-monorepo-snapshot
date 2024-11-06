'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { useToggle } from 'ahooks';
import { LaunchAppButton } from 'client/sections/NavBar/components/LaunchAppButton';
import { MobileNavMenu } from 'client/sections/NavBar/components/MobileNavMenu';
import { NavHamburgerButton } from 'client/sections/NavBar/components/NavHamburgerButton';
import { NavLogoButton } from 'client/sections/NavBar/components/NavLogoButton';

export function MobileNavContent() {
  const [showNav, { toggle: toggleShowNav }] = useToggle();

  return (
    <>
      <div className="flex justify-between">
        <NavLogoButton />
        <div className="flex gap-x-2 sm:gap-x-3.5">
          <LaunchAppButton />
          <NavHamburgerButton toggleShowNav={toggleShowNav} showNav={showNav} />
        </div>
      </div>
      <div
        className={joinClassNames(
          'duration-300 ease-linear',
          showNav ? 'max-h-96' : 'max-h-0',
        )}
      >
        <MobileNavMenu toggleShowNav={toggleShowNav} />
      </div>
    </>
  );
}
