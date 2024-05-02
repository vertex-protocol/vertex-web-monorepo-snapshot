import { joinClassNames } from '@vertex-protocol/web-common';
import { Button, Divider, Icons } from '@vertex-protocol/web-ui';
import { useToggle } from 'ahooks';
import { PortfolioSubNavButton } from 'client/pages/Portfolio/components/navigation/PortfolioSubNavButton';
import { usePortfolioNavItems } from 'client/pages/Portfolio/hooks/usePortfolioNavItems';
import { Fragment } from 'react';

export function DesktopPortfolioSubNavMenu() {
  const [sidebarHidden, { toggle: toggleSidebarHidden }] = useToggle(false);
  const navItems = usePortfolioNavItems();

  const ChevronIcon = sidebarHidden
    ? Icons.FiChevronRight
    : Icons.FiChevronLeft;

  return (
    <div className="relative hidden lg:flex">
      <Button
        className={joinClassNames(
          'bg-surface-1 absolute left-full top-12 z-10',
          'h-6 w-3 -translate-x-1/2 -translate-y-1/2 rounded',
          'hover:border-accent hover:text-text-primary',
          'border-stroke border p-0',
        )}
        onClick={toggleSidebarHidden}
        startIcon={<ChevronIcon size={16} />}
      />
      {/*Desktop Sidebar*/}
      <div
        className={joinClassNames(
          'flex h-full flex-col overflow-hidden',
          'bg-background',
          'border-stroke border-r duration-200',
          sidebarHidden ? 'w-4' : 'w-subnav-menu',
        )}
      >
        <div
          className={joinClassNames(
            'w-full min-w-max',
            sidebarHidden ? '-translate-x-full' : 'translate-x-0',
          )}
        >
          {navItems.map(
            ({ href, label, associatedCount, disabled, selected }) => (
              <Fragment key={label}>
                <PortfolioSubNavButton
                  href={href}
                  label={label}
                  associatedCount={associatedCount}
                  disabled={disabled}
                  selected={selected}
                />
                <Divider className="bg-stroke" />
              </Fragment>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
