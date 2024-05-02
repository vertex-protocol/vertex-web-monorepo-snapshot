import { TabsList, Root as TabsRoot, TabsTrigger } from '@radix-ui/react-tabs';
import { BalanceSide } from '@vertex-protocol/contracts';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { Button } from '@vertex-protocol/web-ui';
import { useFormContext } from 'react-hook-form';
import { BaseOrderFormValues } from '../types';

interface OrderSideButtonProps extends WithClassnames {
  side: 'long' | 'short';
  active: boolean;
}

function OrderSideTabButton({ side, active, className }: OrderSideButtonProps) {
  const sideClassNames = (() => {
    if (side === 'long') {
      return active
        ? 'text-positive bg-surface-2'
        : 'text-text-tertiary bg-surface-1';
    }

    return active
      ? 'text-negative bg-surface-2'
      : 'text-text-tertiary bg-surface-1';
  })();

  return (
    <TabsTrigger key={side} value={side} asChild>
      <Button
        className={joinClassNames(
          'hover:bg-surface-2 rounded py-2 text-xs font-medium uppercase leading-4',
          sideClassNames,
          className,
        )}
      >
        {side === 'long' ? 'Buy' : 'Sell'}
      </Button>
    </TabsTrigger>
  );
}

export function OrderSideTabs({ className }: WithClassnames) {
  const { setValue, watch } = useFormContext<BaseOrderFormValues>();
  const side = watch('side');

  return (
    <TabsRoot
      className={joinClassNames('flex gap-x-2', className)}
      value={side}
      onValueChange={(side) => setValue('side', side as BalanceSide)}
      asChild
    >
      <TabsList className="flex">
        <OrderSideTabButton
          className="flex-1"
          side="long"
          active={side === 'long'}
        />
        <OrderSideTabButton
          className="flex-1"
          side="short"
          active={side === 'short'}
        />
      </TabsList>
    </TabsRoot>
  );
}
