import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { ProductFilterTabs } from 'client/components/ProductFilterTabs';
import { SearchBar } from 'client/components/SearchBar';
import { Footer } from 'client/modules/commandCenter/components/Footer';
import { NoResultsMessage } from 'client/modules/commandCenter/components/NoResultsMessage';
import { BalancesGroup } from 'client/modules/commandCenter/components/groups/BalancesGroup';
import { MarketsGroup } from 'client/modules/commandCenter/components/groups/MarketsGroup';
import { NavItemsGroup } from 'client/modules/commandCenter/components/groups/NavItemsGroup';
import { PositionsGroup } from 'client/modules/commandCenter/components/groups/PositionsGroup';
import { useCommandCenter } from 'client/modules/commandCenter/hooks/useCommandCenter';
import { Command } from 'cmdk';

export function CommandCenter({ className }: WithClassnames) {
  const {
    query,
    setQuery,
    marketType,
    setMarketType,
    markets,
    positions,
    balances,
    navItems,
    shouldShowMarkets,
    shouldShowPositions,
    shouldShowBalances,
    shouldShowNavItems,
  } = useCommandCenter();

  return (
    <Command
      className={className}
      // We use our own filtering function for this instance so we opt out of cmdk's.
      shouldFilter={false}
      loop // Allow looping between first and last items.
    >
      {/* cmdk also adds a visually hidden label element to its children, so we wrap */}
      {/* our own here to isolate them for styling. */}
      <div className="divide-overlay-divider/10 flex h-[80vh] flex-col divide-y lg:h-[600px]">
        <div className="flex flex-col gap-y-3 p-2 lg:p-4">
          <SearchBar
            hideSearchIcon
            sizeVariant="base"
            query={query}
            setQuery={setQuery}
          />
          <ProductFilterTabs
            marketType={marketType}
            setMarketType={setMarketType}
          />
        </div>
        <Command.List
          className={joinClassNames(
            'no-scrollbar flex-1 overflow-y-auto',
            // We add extra scroll padding so that, when using keyboard nav, the
            // group and table headers scroll completely into view when scrolling
            // to the first item, and the last item scrolls completely into view
            // along with some extra bottom padding.
            'scroll-py-20',
            // Force the inner wrapping element to always take up full height so we can
            // vertically center other elements (e.g. no results msg).
            '*:h-full',
            '*:divide-overlay-divider/10 *:divide-y',
          )}
        >
          <PositionsGroup items={positions} shouldShow={shouldShowPositions} />
          <MarketsGroup items={markets} shouldShow={shouldShowMarkets} />
          <BalancesGroup items={balances} shouldShow={shouldShowBalances} />
          <NavItemsGroup items={navItems} shouldShow={shouldShowNavItems} />
          <NoResultsMessage className="h-full" />
        </Command.List>
        <Footer />
      </div>
    </Command>
  );
}
