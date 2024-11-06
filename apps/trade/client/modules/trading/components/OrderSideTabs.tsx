import { TabsList, Root as TabsRoot, TabsTrigger } from '@radix-ui/react-tabs';
import { BalanceSide } from '@vertex-protocol/contracts';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { TradeTabButton, TradeTabButtonProps } from '@vertex-protocol/web-ui';
import { BaseOrderFormValues } from 'client/modules/trading/types';
import { useFormContext } from 'react-hook-form';

function OrderSideTabButton({
  side,
  active,
  ref: _ref,
  ...rest
}: TradeTabButtonProps) {
  return (
    <TabsTrigger key={side} value={side} asChild>
      <TradeTabButton side={side} active={active} {...rest}>
        {side === 'long' ? 'Buy' : 'Sell'}
      </TradeTabButton>
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
