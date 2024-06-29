import {
  PopoverContent,
  PopoverTrigger,
  Root as PopoverRoot,
} from '@radix-ui/react-popover';
import { joinClassNames } from '@vertex-protocol/web-common';
import { useEVMContext } from '@vertex-protocol/react-client';
import {
  Card,
  Icons,
  NavCardButton,
  SecondaryButton,
} from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { UserActionState } from 'client/hooks/subaccount/useUserActionState';
import { DialogParams } from 'client/modules/app/dialogs/types';
import { useMemo, useState } from 'react';

interface Props {
  userActionState: UserActionState;
  onShowDialog: (dialog: DialogParams) => void;
  triggerClassName?: string;
}

export function DepositOptionsPopover({
  triggerClassName,
  userActionState,
  onShowDialog,
}: Props) {
  const { connectionStatus } = useEVMContext();
  const [open, setOpen] = useState(false);
  const isConnected = connectionStatus.type === 'connected';

  const depositOptions = useMemo(() => {
    return [
      {
        title: 'Direct Deposit',
        description: 'Deposit assets directly',
        disabled: userActionState === 'block_all',
        icon: Icons.PiArrowDownLeft,
        onClick: () => {
          onShowDialog({ type: 'deposit', params: {} });
        },
      },
      {
        title: 'Cross-Chain Deposit',
        description: 'Deposit assets from other chains',
        disabled: !isConnected,
        icon: Icons.PiShuffleSimple,
        onClick: () => onShowDialog({ type: 'bridge', params: {} }),
      },
      {
        title: 'Buy Crypto',
        description: 'Purchase with fiat',
        disabled: !isConnected,
        icon: Icons.PiCurrencyCircleDollarBold,
        onClick: () =>
          onShowDialog({ type: 'transak_onramp_notice', params: {} }),
      },
    ];
  }, [isConnected, onShowDialog, userActionState]);

  return (
    <PopoverRoot onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <SecondaryButton
          // Custom right padding ('pr-5' -> 'pr-3') to balance the chevron icon's padding visually.
          className={joinClassNames('pr-3', triggerClassName)}
          endIcon={<UpDownChevronIcon open={open} />}
        >
          Deposit
        </SecondaryButton>
      </PopoverTrigger>
      <PopoverContent asChild align="start" sideOffset={4}>
        <Card
          className={joinClassNames(
            'bg-surface-2 z-10 flex flex-col',
            'max-w-[280px] gap-y-2 p-1.5',
          )}
        >
          {depositOptions.map(
            ({ title, description, icon, disabled, onClick }) => {
              return (
                <NavCardButton
                  key={title}
                  title={title}
                  description={description}
                  icon={icon}
                  disabled={disabled}
                  onClick={onClick}
                />
              );
            },
          )}
        </Card>
      </PopoverContent>
    </PopoverRoot>
  );
}
