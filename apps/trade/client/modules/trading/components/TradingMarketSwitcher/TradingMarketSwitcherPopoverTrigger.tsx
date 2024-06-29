import * as Popover from '@radix-ui/react-popover';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { Button, getStateOverlayClassNames } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
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
          {selectedMarket?.market.name ?? ''}
        </>
      );
    })();

    return <div className="text-text-primary flex gap-x-2">{content}</div>;
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

  const stateOverlayClassnames = getStateOverlayClassNames({ disabled });

  return (
    <Popover.Trigger asChild>
      <Button
        className={joinClassNames(
          'flex items-center p-3',
          // On desktop all four corners are rounded, while on mobile only the
          // top two are. To accommodate both styles, we apply `overflow-hidden`
          // here, which prevents the overlay's 0 border radius from overflowing
          // the rounded corners.
          ['overflow-hidden', stateOverlayClassnames],
          className,
        )}
        disabled={disabled}
      >
        {leftSide}
        <div className="flex-1" />
        {rightSide}
      </Button>
    </Popover.Trigger>
  );
}
