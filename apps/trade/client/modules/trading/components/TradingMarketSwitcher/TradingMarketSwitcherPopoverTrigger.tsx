import * as Popover from '@radix-ui/react-popover';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { DropdownUi, UpDownChevronIcon } from '@vertex-protocol/web-ui';
import { MarketSwitcherItem } from 'client/modules/trading/hooks/useMarketSwitcher/types';
import Image from 'next/image';

interface Props {
  selectedMarket: MarketSwitcherItem | undefined;
  disabled: boolean;
  open: boolean;
}

export function TradingMarketSwitcherPopoverTrigger({
  className,
  selectedMarket,
  disabled,
  open,
}: WithClassnames<Props>) {
  const leftSide = (() => {
    const content = (() => {
      if (open || !selectedMarket) {
        return 'Choose Market';
      }

      return (
        <>
          {selectedMarket && (
            <Image
              src={selectedMarket.market.icon.asset}
              alt={selectedMarket.market.symbol}
              className="h-6 w-auto"
            />
          )}
          {selectedMarket?.market.marketName ?? ''}
        </>
      );
    })();

    return (
      <div className="text-text-primary flex flex-1 items-center gap-x-2 text-base">
        {content}
      </div>
    );
  })();

  const rightSide = (() => {
    const content = open ? 'Close' : 'All Markets';
    return (
      <div className="text-text-tertiary flex items-center gap-x-2 text-xs">
        {content}
        <UpDownChevronIcon size={20} open={open} />
      </div>
    );
  })();

  return (
    <Popover.Trigger asChild>
      <DropdownUi.Trigger
        className={joinClassNames(
          'p-3',
          // On desktop all four corners are rounded, while on mobile only the
          // top two are. To accommodate both styles, we apply `overflow-hidden`
          // here, which prevents the overlay's 0 border radius from overflowing
          // the rounded corners.
          'overflow-hidden',
          className,
        )}
        disabled={disabled}
      >
        {leftSide}
        {rightSide}
      </DropdownUi.Trigger>
    </Popover.Trigger>
  );
}
