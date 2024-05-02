import { WithClassnames } from '@vertex-protocol/web-common';
import classNames from 'classnames';
import { HomePageButton } from 'client/components/Button/HomePageButton';
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

export function NavHamburgerButton({
  toggleShowNav,
  showNav,
  className,
}: WithClassnames<{
  toggleShowNav: () => void;
  showNav: boolean;
}>) {
  const Icon = showNav ? IoMdClose : FiMenu;
  return (
    <HomePageButton
      className={classNames(
        'border-white-400 bg-black-800 text-white-700 rounded-lg border p-1.5 sm:p-2',
        className,
      )}
      onClick={toggleShowNav}
      startIcon={<Icon size={22} />}
    />
  );
}
