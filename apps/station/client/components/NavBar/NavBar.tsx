'use client';

import * as Popover from '@radix-ui/react-popover';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  IconButton,
  Icons,
  TabTextButton,
  Z_INDEX,
} from '@vertex-protocol/web-ui';
import { NavBarChainSelect } from 'client/components/NavBar/NavBarChainSelect';
import { useNavBarLinks } from 'client/components/NavBar/useNavBarLinks';
import Link from 'next/link';

export function NavBar() {
  return (
    <nav className={joinClassNames('bg-surface-card h-14', Z_INDEX.navbar)}>
      <DesktopNavBarContent className="hidden sm:flex" />
      <MobileNavBarContent className="sm:hidden" />
    </nav>
  );
}

function MobileNavBarContent({ className }: WithClassnames) {
  const navBarLinks = useNavBarLinks();

  return (
    <Popover.Root>
      <Popover.Anchor asChild>
        <div
          className={joinClassNames(
            'flex h-full w-full items-center justify-between px-4 py-1',
            className,
          )}
        >
          <Popover.Trigger asChild>
            <IconButton icon={Icons.List} size="sm" />
          </Popover.Trigger>
          <NavBarChainSelect />
          <Popover.Content side="top" align="start" asChild>
            <div
              className="bg-surface-card flex w-screen flex-col gap-y-3 p-4"
              style={{
                height: 'var(--radix-popper-available-height)',
              }}
            >
              {navBarLinks.map(({ route, label, isActive }) => (
                <Popover.Close asChild key={route}>
                  <TabTextButton
                    as={Link}
                    href={route}
                    active={isActive}
                    className="justify-start text-2xl"
                  >
                    {label}
                  </TabTextButton>
                </Popover.Close>
              ))}
            </div>
          </Popover.Content>
        </div>
      </Popover.Anchor>
    </Popover.Root>
  );
}

function DesktopNavBarContent({ className }: WithClassnames) {
  const navBarLinks = useNavBarLinks();

  return (
    <div
      className={joinClassNames(
        'h-full items-center justify-between px-12',
        className,
      )}
    >
      <div className="flex items-baseline gap-x-4">
        <span className="text-accent">Vertex Station</span>
        {navBarLinks.map(({ route, label, isActive }) => (
          <TabTextButton key={route} as={Link} href={route} active={isActive}>
            {label}
          </TabTextButton>
        ))}
      </div>
      <div>
        <NavBarChainSelect />
      </div>
    </div>
  );
}
