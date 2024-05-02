import { openMobileNavAtom } from 'client/store/navigationStore';
import { useAtom } from 'jotai';
import { useState } from 'react';

export function useMobileCollapsible() {
  const [, setOpenMobileNav] = useAtom(openMobileNavAtom);
  const [collapsibleIsOpen, setCollapsibleIsOpen] = useState(false);

  const onCollapsibleLinkClick = () => {
    setCollapsibleIsOpen(false);
    setOpenMobileNav(false);
  };

  return {
    collapsibleIsOpen,
    setCollapsibleIsOpen,
    onCollapsibleLinkClick,
  };
}
