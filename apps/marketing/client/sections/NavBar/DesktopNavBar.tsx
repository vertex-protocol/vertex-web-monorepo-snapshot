import { GradientButton } from 'client/components/Button/GradientButton';
import { DEFAULT_SECTION_WIDTH, EXTERNAL_LINKS } from 'client/consts';
import Link from 'next/link';
import { DesktopNavLinks } from './components/DesktopNavLinks';
import { NavLogoButton } from './components/NavLogoButton';
import { joinClassNames } from '@vertex-protocol/web-common';

export function DesktopNavBar() {
  const outerPaddingClassName = 'px-18 py-7 sm:px-16 xl:px-28';
  const innerPaddingClassName =
    'px-5 py-3 text-white duration-500 lg:pl-8 lg:pr-2.5';
  return (
    <div
      className={joinClassNames(
        'fixed z-20 flex w-full items-center justify-center',
        outerPaddingClassName,
      )}
    >
      <nav
        className={joinClassNames(
          'backdrop-blur-nav flex flex-col rounded-2xl',
          'bg-black-800 shadow-black-900/30 shadow-lg',
          innerPaddingClassName,
          DEFAULT_SECTION_WIDTH,
        )}
      >
        <div className="flex h-full w-full items-center justify-between">
          <NavLogoButton />
          <DesktopNavLinks className="flex w-full items-center justify-center gap-x-8" />
          <div className="flex h-full items-center gap-x-3.5">
            <GradientButton
              as={Link}
              href={EXTERNAL_LINKS.app}
              external
              className="px-3.5 py-2 text-base lg:rounded-xl lg:px-5"
            >
              Launch App
            </GradientButton>
          </div>
        </div>
      </nav>
    </div>
  );
}
