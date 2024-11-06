import { List } from '@phosphor-icons/react/dist/ssr/List';
import { X } from '@phosphor-icons/react/dist/ssr/X';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { HomePageButton } from 'client/components/Button/HomePageButton';

export function NavHamburgerButton({
  toggleShowNav,
  showNav,
  className,
}: WithClassnames<{
  toggleShowNav: () => void;
  showNav: boolean;
}>) {
  const Icon = showNav ? X : List;
  return (
    <HomePageButton
      className={joinClassNames(
        'border-white-400 bg-black-800 text-white-700 rounded-lg border p-1.5 sm:p-2',
        className,
      )}
      onClick={toggleShowNav}
      startIcon={<Icon size={22} />}
    />
  );
}
