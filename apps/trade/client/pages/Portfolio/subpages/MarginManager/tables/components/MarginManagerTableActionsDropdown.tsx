import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  Button,
  getStateOverlayClassNames,
  Icons,
  SecondaryButton,
} from '@vertex-protocol/web-ui';
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

export interface MarginManagerDropdownAction {
  type: MarginManagerActionType;
  label: string;
  productId: number;
}

interface Props extends WithClassnames {
  actions: MarginManagerDropdownAction[];
  performOnClickAction: (action: MarginManagerDropdownAction) => void;
}

export function MarginManagerTableActionsDropdown({
  className,
  actions,
  performOnClickAction,
}: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <SecondaryButton
          className={joinClassNames(
            'flex items-center justify-center rounded',
            'px-1.5',
            className,
          )}
        >
          <Icons.DotsThreeVertical size={18} />
        </SecondaryButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
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
        {actions.map((action: MarginManagerDropdownAction) => {
          const { type, label } = action;

          const hoverStateOverlayClassNames = getStateOverlayClassNames({
            borderRadiusVariant: 'base',
          });

          return (
            <DropdownMenu.Item key={type} asChild>
              <Button
                className={joinClassNames(
                  'flex items-center justify-start',
                  'rounded px-1.5 py-px',
                  'text-xs capitalize',
                  'text-text-secondary',
                  hoverStateOverlayClassNames,
                )}
                onClick={() => performOnClickAction(action)}
              >
                {label}
              </Button>
            </DropdownMenu.Item>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
