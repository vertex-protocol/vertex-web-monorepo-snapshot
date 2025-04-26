import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { DropdownUi, Icons, SecondaryButton } from '@vertex-protocol/web-ui';
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
            'flex items-center justify-center rounded-sm',
            'px-1.5',
            className,
          )}
        >
          <Icons.DotsThreeVertical size={18} />
        </SecondaryButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content asChild sideOffset={4} side="left" align="end">
        <DropdownUi.Content className="w-28 gap-y-px">
          {actions.map((action: MarginManagerDropdownAction) => {
            const { type, label } = action;

            return (
              <DropdownMenu.Item key={type} asChild>
                <DropdownUi.Item
                  className="py-1 capitalize"
                  onClick={() => performOnClickAction(action)}
                >
                  {label}
                </DropdownUi.Item>
              </DropdownMenu.Item>
            );
          })}
        </DropdownUi.Content>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
