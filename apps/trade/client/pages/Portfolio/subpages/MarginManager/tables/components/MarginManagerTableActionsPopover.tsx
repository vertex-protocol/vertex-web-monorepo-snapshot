import * as Popover from '@radix-ui/react-popover';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Button, Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { DialogType } from 'client/modules/app/dialogs/types';

export type MarginManagerActionType =
  | Extract<
      DialogType,
      | 'withdraw'
      | 'repay'
      | 'borrow'
      | 'deposit'
      | 'provide_liquidity'
      | 'withdraw_liquidity'
    >
  | 'trade_spot'
  | 'trade_perp';

export interface MarginManagerPopoverAction {
  type: MarginManagerActionType;
  label: string;
  productId: number;
}

interface Props extends WithClassnames {
  actions: MarginManagerPopoverAction[];
  performOnClickAction: (action: MarginManagerPopoverAction) => void;
}

export function MarginManagerTableActionsPopover({
  className,
  actions,
  performOnClickAction,
}: Props) {
  const userActionState = useUserActionState();

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <SecondaryButton
          className={joinClassNames(
            'flex items-center justify-center rounded',
            'px-1.5',
            className,
          )}
          size="md"
        >
          <Icons.FiMoreVertical size={18} />
        </SecondaryButton>
      </Popover.Trigger>
      <Popover.Content
        className={joinClassNames(
          'w-28',
          'bg-surface-2 border-stroke rounded border',
          'flex flex-col gap-y-1',
          'p-1',
        )}
        sideOffset={4}
        side="left"
        align="end"
      >
        {actions.map((action: MarginManagerPopoverAction) => {
          const { type, label } = action;

          const isActionDisabled = (() => {
            // Deposit / Repay / Withdraw Liquidity disabled if block all
            if (
              type === 'deposit' ||
              type === 'repay' ||
              type === 'withdraw_liquidity'
            ) {
              return userActionState === 'block_all';
            }

            // Borrow and Withdraw, Provide Liquidity disabled if not allow all
            if (
              type === 'borrow' ||
              type === 'withdraw' ||
              type === 'provide_liquidity'
            ) {
              return userActionState !== 'allow_all';
            }

            // Spot / Perp Trade actions are always enabled
            return false;
          })();

          return (
            <Popover.Close asChild key={type}>
              <Button
                className={joinClassNames(
                  'hover:bg-surface-2 rounded',
                  'flex items-center justify-start',
                  'px-1.5 py-px',
                  'text-text-tertiary hover:bg-overlay-hover/5 text-xs capitalize',
                )}
                disabled={isActionDisabled}
                onClick={() => performOnClickAction(action)}
              >
                {label}
              </Button>
            </Popover.Close>
          );
        })}
      </Popover.Content>
    </Popover.Root>
  );
}
