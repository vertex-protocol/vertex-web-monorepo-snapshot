import * as Tabs from '@radix-ui/react-tabs';
import {
  Icons,
  SecondaryButton,
  SegmentedControl,
} from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { RepayConvertTab } from 'client/modules/collateral/repay/components/RepayConvertTab';
import { RepayDepositTab } from 'client/modules/collateral/repay/components/RepayDepositTab';
import { useHasRepayableBalances } from 'client/modules/collateral/repay/hooks/useHasRepayableBalances';

const TABS = [
  {
    id: 'deposit',
    content: <RepayDepositTab />,
  },
  {
    id: 'convert',
    content: <RepayConvertTab />,
  },
] as const;

/**
 * Tabs for repay / convert
 */
export function RepayDialog() {
  const { hide } = useDialog();
  const canRepay = useHasRepayableBalances();

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>Repay</BaseDialog.Title>
      {/*Relative required for the RepayConvertDisclosure*/}
      <BaseDialog.Body className="relative flex flex-col">
        {canRepay ? <RepayContent /> : <NoBorrows />}
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}

function RepayContent() {
  const { setSelectedUntypedTabId, selectedTabId, tabs } = useTabs(TABS);

  return (
    <Tabs.Root
      className="flex flex-col gap-y-4"
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
                  size="lg"
                  as="div"
                  active={isSelected}
                  className="w-full capitalize"
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

function NoBorrows() {
  const { hide } = useDialog();
  return (
    <div className="flex w-full flex-col">
      <div className="text-text-primary flex flex-col items-center gap-y-2 text-center text-sm">
        <Icons.MdTaskAlt size={97} className="text-positive" />
        <div>You have no borrows at the moment.</div>
      </div>
      <SecondaryButton size="lg" onClick={hide} className="mt-6 w-full">
        Close
      </SecondaryButton>
    </div>
  );
}
