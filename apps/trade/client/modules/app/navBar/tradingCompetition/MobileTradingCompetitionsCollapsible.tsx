import { WithClassnames } from '@vertex-protocol/web-common';
import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { MobileNavCustomCollapsible } from 'client/modules/app/navBar/components/MobileNavCustomCollapsible';
import { NavPopoverHeader } from 'client/modules/app/navBar/components/NavPopoverHeader';
import { useGetIsActiveRoute } from 'client/modules/app/navBar/hooks/useGetIsActiveRoute';
import { useMobileCollapsible } from 'client/modules/app/navBar/hooks/useMobileCollapsible';
import {
  NAV_POPOVER_CONTEST_ITEM_HREFS,
  NAV_POPOVER_CONTEST_ITEMS,
} from 'client/modules/app/navBar/tradingCompetition/consts';
import { TradingCompetitionNavItemTimeline } from 'client/modules/app/navBar/tradingCompetition/TradingCompetitionNavItemTimeline';
import { NavPopoverContestItem } from 'client/modules/app/navBar/tradingCompetition/types';

export function MobileTradingCompetitionsCollapsible({
  className,
}: WithClassnames) {
  const getIsActiveRoute = useGetIsActiveRoute();
  const { onCollapsibleLinkClick } = useMobileCollapsible();

  const currentlySelected = getIsActiveRoute(...NAV_POPOVER_CONTEST_ITEM_HREFS);

  return (
    <MobileNavCustomCollapsible.Root
      className={className}
      triggerContent={
        <AppNavItemButton
          withMobilePadding
          withCaret
          active={currentlySelected}
        >
          🏆 Competitions
        </AppNavItemButton>
      }
      collapsibleContent={
        <MobileNavCustomCollapsible.LinksContainer className="gap-y-3">
          {Object.entries(NAV_POPOVER_CONTEST_ITEMS).map(
            ([chain, contests]) => (
              <ItemsGroup
                key={chain}
                title={chain}
                items={contests}
                onClick={onCollapsibleLinkClick}
              />
            ),
          )}
        </MobileNavCustomCollapsible.LinksContainer>
      }
    />
  );
}

interface ItemsGroupProps {
  title: string;
  items: NavPopoverContestItem[];
  onClick: () => void;
}

function ItemsGroup({ title, items, onClick }: ItemsGroupProps) {
  const getIsActiveRoute = useGetIsActiveRoute();

  return (
    <div className="flex flex-col gap-y-1">
      <NavPopoverHeader className="capitalize" title={title} />
      <div>
        {items.map(({ title, startTimeMillis, endTimeMillis, href }) => (
          <MobileNavCustomCollapsible.LinkButton
            key={href}
            href={href}
            active={getIsActiveRoute(href)}
            onClick={onClick}
            className="flex-col items-start"
          >
            {title}
            <TradingCompetitionNavItemTimeline
              startTimeMillis={startTimeMillis}
              endTimeMillis={endTimeMillis}
            />
          </MobileNavCustomCollapsible.LinkButton>
        ))}
      </div>
    </div>
  );
}
