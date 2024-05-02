import {
  PopoverContent,
  Root as PopoverRoot,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { joinClassNames, mergeClassNames } from '@vertex-protocol/web-common';
import { useEVMContext } from '@vertex-protocol/web-data';
import {
  Card,
  Icons,
  NavCardButton,
  SecondaryButton,
} from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { UserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { DialogParams } from 'client/modules/app/dialogs/types';
import { useState } from 'react';

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
  const { trackEvent } = useAnalyticsContext();

  return (
    <PopoverRoot onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <SecondaryButton
          size="lg"
          // Custom right padding ('pr-5' -> 'pr-3') to balance the chevron icon's padding visually.
          className={joinClassNames('pr-3', triggerClassName)}
          endIcon={<UpDownChevronIcon open={open} />}
        >
          Deposit
        </SecondaryButton>
      </PopoverTrigger>
      <PopoverContent asChild align="start" sideOffset={4}>
        <Card
          className={mergeClassNames(
            'bg-surface-2 z-10 flex flex-col',
            'max-w-[280px] gap-y-2 p-1.5',
          )}
        >
          <NavCardButton
            title="Direct Deposit"
            description="Deposit assets directly"
            icon={Icons.PiArrowDownLeft}
            disabled={userActionState === 'block_all'}
            onClick={() => {
              onShowDialog({ type: 'deposit', params: {} });
              trackEvent({
                type: 'deposit_clicked',
                data: { fromLocation: 'portfolio' },
              });
            }}
          />
          <NavCardButton
            title="Cross-Chain Deposit"
            description="Deposit assets from other chains"
            icon={Icons.PiShuffleSimple}
            disabled={connectionStatus.type !== 'connected'}
            onClick={() => onShowDialog({ type: 'bridge', params: {} })}
          />
        </Card>
      </PopoverContent>
    </PopoverRoot>
  );
}
