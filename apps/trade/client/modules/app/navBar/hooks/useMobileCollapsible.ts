import { openMobileNavAtom } from 'client/store/navigationStore';
import { useAtom } from 'jotai';

export function useMobileCollapsible() {
  const [, setOpenMobileNav] = useAtom(openMobileNavAtom);

  const onCollapsibleLinkClick = () => {
    setOpenMobileNav(false);
  };

  return {
    onCollapsibleLinkClick,
  };
}
