import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { joinClassNames } from '@vertex-protocol/web-common';
import { NavPopoverContentContainer } from 'client/modules/app/navBar/components/NavPopoverContentContainer';
import { ReactNode } from 'react';

interface Props {
  /**
   * Note this should be a single node. Passing in a fragment will result in the
   * trigger not functioning correctly.
   */
  triggerContent: ReactNode;
  popoverContent: ReactNode;
  popoverClassName?: string;
}

export function DesktopNavCustomPopover({
  triggerContent,
  popoverContent,
  popoverClassName,
}: Props) {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger asChild>{triggerContent}</NavigationMenu.Trigger>
      <NavigationMenu.Content asChild>
        <NavPopoverContentContainer
          className={joinClassNames('absolute top-8', popoverClassName)}
        >
          {popoverContent}
        </NavPopoverContentContainer>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}
