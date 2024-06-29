import { GradientButton } from 'client/components/Button/GradientButton';
import { EXTERNAL_LINKS } from 'client/consts';
import Link from 'next/link';
import { useToggle } from 'ahooks';
import { MobileNavMenu } from './components/MobileNavMenu';
import { NavHamburgerButton } from './components/NavHamburgerButton';
import { NavLogoButton } from './components/NavLogoButton';
import { joinClassNames } from '@vertex-protocol/web-common';

export function MobileNavBar() {
  const [showNav, { toggle: toggleShowNav }] = useToggle();
  const outerPaddingClassName = 'px-4 py-8 sm:px-11 sm:py-7';
  const innerPaddingClassName =
    'px-5 py-2.5 text-white duration-500 sm:pr-5 sm:py-3';
  return (
    <div
      className={joinClassNames(
        'fixed z-20 flex w-full items-center justify-center',
        outerPaddingClassName,
      )}
    >
      <nav
        className={joinClassNames(
          'backdrop-blur-nav  flex w-full flex-col overflow-hidden',
          'shadow-black-900/30 bg-black-800 rounded-2xl shadow-lg',
          innerPaddingClassName,
        )}
      >
        <div className="flex h-full w-full items-center justify-between">
          <NavLogoButton />
          <div className="flex h-full items-center gap-x-2 sm:gap-x-3.5">
            <GradientButton
              as={Link}
              href={EXTERNAL_LINKS.app}
              external
              className="px-3.5 py-2 text-xs sm:text-base"
            >
              Launch App
            </GradientButton>
            <NavHamburgerButton
              toggleShowNav={toggleShowNav}
              showNav={showNav}
            />
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
      </nav>
    </div>
  );
}
