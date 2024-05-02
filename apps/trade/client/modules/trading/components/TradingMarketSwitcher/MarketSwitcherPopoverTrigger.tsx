import * as Popover from '@radix-ui/react-popover';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { Button } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { TradeSwitcherItem } from 'client/modules/trading/hooks/useTradeSwitcher/types';
import Image from 'next/image';

interface Props {
  selectedMarket: TradeSwitcherItem | undefined;
  disabled: boolean;
  open: boolean;
}

export function MarketSwitcherPopoverTrigger({
  className,
  selectedMarket,
  disabled,
  open,
}: WithClassnames<Props>) {
  const leftSide = (() => {
    const content = (() => {
      if (open || !selectedMarket) {
        return 'Choose market';
      }

      return (
        <>
          {selectedMarket && (
            <Image
              src={selectedMarket.market.icon.asset}
              alt={selectedMarket.market.symbol}
              width={24}
              height={24}
            />
          )}
          {selectedMarket?.market.name ?? ''}
        </>
      );
    })();

    return (
      <div className="text-text-primary flex gap-x-2 font-medium">
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
      <Button
        className={joinClassNames(
          'flex items-center p-3',
          !disabled && 'hover:bg-overlay-hover/5',
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
