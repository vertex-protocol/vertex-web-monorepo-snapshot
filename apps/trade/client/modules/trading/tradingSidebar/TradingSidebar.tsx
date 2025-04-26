import {
  TabsContent,
  TabsList,
  Root as TabsRoot,
  TabsTrigger,
} from '@radix-ui/react-tabs';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import {
  Divider,
  Icons,
  TextButton,
  UpDownChevronIcon,
} from '@vertex-protocol/web-ui';
import { TradingSidebarTabID } from 'client/modules/localstorage/userState/types/userTradingSidebarTypes';
import { EmptyWatchlistPlaceholder } from 'client/modules/trading/tradingSidebar/EmptyWatchlistPlaceholder';
import { TradingSidebarMarketsTab } from 'client/modules/trading/tradingSidebar/markets/TradingSidebarMarketsTab';
import { TradingSidebarWatchlistTabButtons } from 'client/modules/trading/tradingSidebar/TradingSidebarWatchlistTabButtons';
import { useTradingSidebar } from 'client/modules/trading/tradingSidebar/useTradingSidebar';
import { useMemo } from 'react';

interface Props extends WithClassnames {
  flexDirectionByConsolePosition: 'flex-row' | 'flex-row-reverse';
}

export function TradingSidebar({
  flexDirectionByConsolePosition,
  className,
}: Props) {
  const {
    selectedSidebarTabId,
    onTabClick,
    selectedWatchlistTabId,
    setSelectedWatchlistTabId,
    isTradingSidebarOpen,
    setIsTradingSidebarOpen,
    isWatchlistTabSelected,
    isEmptyWatchlist,
  } = useTradingSidebar();

  const tabs = useMemo(() => {
    return [
      {
        id: 'market_info' as TradingSidebarTabID,
        Icon: Icons.ListMagnifyingGlass,
        content: <TradingSidebarMarketsTab className="flex-1" />,
      },
    ];
  }, []);

  const isSidebarOnRight = flexDirectionByConsolePosition === 'flex-row';
  const tabBorderClasses =
    'after:bg-stroke relative after:absolute after:right-0 after:top-0 after:h-full after:w-0.5';
  const tabBorderAnimationClasses =
    'after:transform-gpu after:rounded-xs after:duration-200';
  const inactiveTabAnimationClasses = 'after:scale-y-0';
  const activeTabClasses =
    'data-[state=active]:after:bg-primary data-[state=active]:text-text-primary data-[state=active]:after:scale-y-100';

  return (
    <TabsRoot
      className={joinClassNames(
        'flex',
        isTradingSidebarOpen ? 'w-trade-sidebar' : 'w-max',
        flexDirectionByConsolePosition,
        className,
      )}
      value={selectedSidebarTabId}
      orientation="vertical"
    >
      {tabs.map(({ id, content }) => (
        <TabsContent key={id} value={id} asChild>
          <div
            className={joinClassNames(
              // `overflow-hidden` here to keep the product filter tabs from overflowing
              'border-overlay-divider flex-1 overflow-hidden',
              isSidebarOnRight ? 'border-r' : 'border-l',
              isTradingSidebarOpen ? 'flex flex-col gap-y-0.5' : 'hidden',
            )}
          >
            <TradingSidebarWatchlistTabButtons
              // Padding to match the orderbook tabs
              className="px-3 py-2"
              selectedWatchlistTabId={selectedWatchlistTabId}
              setSelectedWatchlistTabId={setSelectedWatchlistTabId}
            />
            {isWatchlistTabSelected && isEmptyWatchlist ? (
              <EmptyWatchlistPlaceholder />
            ) : (
              content
            )}
          </div>
        </TabsContent>
      ))}
      <div className="flex flex-col">
        <TabsList className="flex flex-1 flex-col gap-y-1 py-1">
          {tabs.map(({ id, Icon }) => (
            <TabsTrigger value={id} key={id} asChild>
              <TextButton
                colorVariant="tertiary"
                className={joinClassNames(
                  'p-2',

                  // subtle highlight for active tab even when sidebar is closed
                  // this help user know which tab to expect if they open the sidebar from chevron button
                  'data-[state=active]:text-text-secondary',

                  tabBorderClasses,
                  tabBorderAnimationClasses,
                  inactiveTabAnimationClasses,
                  isTradingSidebarOpen && activeTabClasses,

                  // Position the active highlight border on the correct side
                  // which is on the side where the sidebar content is
                  isSidebarOnRight ? 'after:left-0' : 'after:right-0',
                )}
                endIcon={<Icon className="size-5" />}
                onClick={() => onTabClick(id)}
              />
            </TabsTrigger>
          ))}
        </TabsList>
        <Divider />
        <TextButton
          colorVariant="secondary"
          className="p-2"
          endIcon={
            <UpDownChevronIcon
              open={isTradingSidebarOpen}
              className={joinClassNames(
                'size-5',
                isSidebarOnRight ? 'rotate-90' : '-rotate-90',
              )}
            />
          }
          onClick={() => setIsTradingSidebarOpen(!isTradingSidebarOpen)}
        />
      </div>
    </TabsRoot>
  );
}
