import { joinClassNames } from '@vertex-protocol/web-common';
import { MobileNavContent } from 'client/sections/NavBar/components/MobileNavContent';

export function MobileNavBar() {
  const outerPaddingClassName = 'px-4 py-8 sm:px-11 sm:py-7';
  const innerPaddingClassName =
    'px-5 py-2.5 text-white duration-500 sm:pr-5 sm:py-3';

  return (
    <div className={joinClassNames('fixed z-20 w-full', outerPaddingClassName)}>
      <nav
        className={joinClassNames(
          'backdrop-blur-nav flex flex-col overflow-hidden',
          'shadow-black-900/30 bg-black-800 rounded-2xl shadow-lg',
          innerPaddingClassName,
        )}
      >
        <MobileNavContent />
      </nav>
    </div>
  );
}
