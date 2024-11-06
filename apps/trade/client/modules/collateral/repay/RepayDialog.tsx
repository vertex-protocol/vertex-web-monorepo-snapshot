import * as Tabs from '@radix-ui/react-tabs';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import {
  Icons,
  SecondaryButton,
  SegmentedControl,
} from '@vertex-protocol/web-ui';
import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { RepayConvertTab } from 'client/modules/collateral/repay/components/RepayConvertTab';
import { RepayDepositTab } from 'client/modules/collateral/repay/components/RepayDepositTab';
import { useHasRepayableBalances } from 'client/modules/collateral/repay/hooks/useHasRepayableBalances';
import { useMemo } from 'react';

/**
 * Tabs for repay / convert
 */
export interface RepayDialogParams {
  initialProductId?: number;
}

export function RepayDialog({ initialProductId }: RepayDialogParams) {
  const { hide } = useDialog();
  const canRepay = useHasRepayableBalances();

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Repay</BaseAppDialog.Title>
      {/*Relative required for the RepayConvertDisclosure*/}
      <BaseAppDialog.Body className="relative" asChild>
        {canRepay ? (
          <RepayTabs initialProductId={initialProductId} />
        ) : (
          <NoBorrows />
        )}
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}

function RepayTabs({
  className,
  initialProductId,
}: WithClassnames<{ initialProductId: number | undefined }>) {
  const { setSelectedUntypedTabId, selectedTabId, tabs } = useTabs(
    useMemo(
      () => [
        {
          id: 'deposit',
          content: <RepayDepositTab initialProductId={initialProductId} />,
        },
        {
          id: 'convert',
          content: <RepayConvertTab initialProductId={initialProductId} />,
        },
      ],
      [initialProductId],
    ),
  );

  return (
    <Tabs.Root
      className={joinClassNames('flex flex-col gap-y-4', className)}
      value={selectedTabId}
      onValueChange={setSelectedUntypedTabId}
    >
      <Tabs.List asChild>
        <SegmentedControl.Container>
          {tabs.map(({ id }) => {
            const isSelected = id === selectedTabId;
            return (
              <Tabs.Trigger value={id} key={id} asChild>
                <SegmentedControl.Button
                  as="div"
                  active={isSelected}
                  className="flex-1 capitalize"
                >
                  {id}
                </SegmentedControl.Button>
              </Tabs.Trigger>
            );
          })}
        </SegmentedControl.Container>
      </Tabs.List>
      {tabs.map(({ id, content }) => (
        <Tabs.Content key={id} value={id}>
          {content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

function NoBorrows({ className }: WithClassnames) {
  const { hide } = useDialog();
  return (
    <div className={joinClassNames('flex flex-col', className)}>
      <div className="text-text-primary flex flex-col items-center gap-y-2 text-center text-sm">
        <Icons.CheckCircle size={97} className="text-positive" />
        <div>You have no borrows at the moment.</div>
      </div>
      <SecondaryButton onClick={hide} className="mt-6 w-full">
        Close
      </SecondaryButton>
    </div>
  );
}
