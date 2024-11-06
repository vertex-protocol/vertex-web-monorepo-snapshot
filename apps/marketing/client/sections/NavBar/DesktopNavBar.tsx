import { joinClassNames } from '@vertex-protocol/web-common';
import { DEFAULT_SECTION_WIDTH } from 'client/consts';
import { DesktopNavLinks } from 'client/sections/NavBar/components/DesktopNavLinks/DesktopNavLinks';
import { LaunchAppButton } from 'client/sections/NavBar/components/LaunchAppButton';
import { NavLogoButton } from 'client/sections/NavBar/components/NavLogoButton';

export function DesktopNavBar() {
  const outerPaddingClassName = 'px-18 py-7 sm:px-16 xl:px-28';
  const innerPaddingClassName =
    'px-5 py-3 text-white duration-500 lg:pl-8 lg:pr-2.5';
  return (
    <div className={joinClassNames('fixed z-20 w-full', outerPaddingClassName)}>
      <nav
        className={joinClassNames(
          'backdrop-blur-nav flex justify-between',
          'bg-black-800 shadow-black-900/30 rounded-2xl shadow-lg',
          innerPaddingClassName,
          DEFAULT_SECTION_WIDTH,
        )}
      >
        <NavLogoButton />
        <DesktopNavLinks />
        <LaunchAppButton />
      </nav>
    </div>
  );
}
