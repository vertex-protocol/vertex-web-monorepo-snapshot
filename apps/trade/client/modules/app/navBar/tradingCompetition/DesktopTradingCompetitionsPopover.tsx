import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Divider, NavCardButton } from '@vertex-protocol/web-ui';
import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { DesktopNavCustomPopover } from 'client/modules/app/navBar/components/DesktopNavCustomPopover';
import { NavPopoverHeader } from 'client/modules/app/navBar/components/NavPopoverHeader';
import { useGetIsActiveRoute } from 'client/modules/app/navBar/hooks/useGetIsActiveRoute';
import {
  NAV_POPOVER_CONTEST_ITEM_HREFS,
  NAV_POPOVER_CONTEST_ITEMS,
} from 'client/modules/app/navBar/tradingCompetition/consts';
import { TradingCompetitionNavItemTimeline } from 'client/modules/app/navBar/tradingCompetition/TradingCompetitionNavItemTimeline';
import { NavPopoverContestItem } from 'client/modules/app/navBar/tradingCompetition/types';
import Link from 'next/link';
import { Fragment } from 'react';

export function DesktopTradingCompetitionsPopover() {
  const getIsActiveRoute = useGetIsActiveRoute();

  const popoverTriggerIsActive = getIsActiveRoute(
    ...NAV_POPOVER_CONTEST_ITEM_HREFS,
  );

  return (
    <DesktopNavCustomPopover
      triggerContent={
        <AppNavItemButton active={popoverTriggerIsActive} withCaret>
          🏆 Competitions
        </AppNavItemButton>
      }
      popoverClassName="flex flex-col gap-y-3 w-64"
      popoverContent={Object.entries(NAV_POPOVER_CONTEST_ITEMS).map(
        ([chain, contests]) => (
          <Fragment key={chain}>
            <Divider className="first:hidden" />
            <ItemsGroup title={chain} items={contests} />
          </Fragment>
        ),
      )}
    />
  );
}

interface ItemsGroupProps {
  title: string;
  items: NavPopoverContestItem[];
}

function ItemsGroup({ title, items }: ItemsGroupProps) {
  return (
    <div className="flex flex-col gap-y-1">
      <NavPopoverHeader className="capitalize" title={title} />
      <div className="flex flex-col">
        {items.map(({ title, startTimeMillis, endTimeMillis, href }) => (
          <NavigationMenu.Link key={href} asChild>
            <NavCardButton
              as={Link}
              title={title}
              description={
                <TradingCompetitionNavItemTimeline
                  startTimeMillis={startTimeMillis}
                  endTimeMillis={endTimeMillis}
                />
              }
              href={href}
            />
          </NavigationMenu.Link>
        ))}
      </div>
    </div>
  );
}
