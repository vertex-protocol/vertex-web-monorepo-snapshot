'use client';

import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Card, Divider } from '@vertex-protocol/web-ui';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { PortfolioSubNavButton } from 'client/pages/Portfolio/components/navigation/PortfolioSubNavButton';
import { PortfolioSubNavSubaccountSwitcher } from 'client/pages/Portfolio/components/navigation/PortfolioSubNavSubaccountSwitcher';
import { usePortfolioNavItems } from 'client/pages/Portfolio/hooks/usePortfolioNavItems';
import { Fragment } from 'react';

export function DesktopPortfolioSubNavMenu({ className }: WithClassnames) {
  const navItems = usePortfolioNavItems();

  const isConnected = useIsConnected();

  return (
    <Card
      className={joinClassNames(
        'hidden w-48 flex-col overflow-hidden lg:flex',
        className,
      )}
    >
      {isConnected && (
        <>
          <div className="px-2 py-3">
            <PortfolioSubNavSubaccountSwitcher className="w-full" />
          </div>
          <Divider />
        </>
      )}
      {navItems.map(({ href, label, associatedCount, disabled, selected }) => (
        <Fragment key={label}>
          <PortfolioSubNavButton
            href={href}
            label={label}
            associatedCount={associatedCount}
            disabled={disabled}
            selected={selected}
          />
          <Divider />
        </Fragment>
      ))}
    </Card>
  );
}
