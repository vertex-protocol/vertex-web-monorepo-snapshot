import { SecondaryButton } from '@vertex-protocol/web-ui';
import { usePushHistoryPage } from 'client/hooks/ui/navigation/usePushHistoryPage';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useMemo } from 'react';

export function HistoryTabContent() {
  const pushHistoryPage = usePushHistoryPage();
  const { hide } = useDialog();

  const historyTabItems = useMemo(
    () => [
      {
        id: 'trades',
        onClick: () => {
          pushHistoryPage('trades');
          hide();
        },
      },
      {
        id: 'deposits',
        onClick: () => {
          pushHistoryPage('deposits');
          hide();
        },
      },
      {
        id: 'withdrawals',
        onClick: () => {
          pushHistoryPage('withdrawals');
          hide();
        },
      },
    ],
    [pushHistoryPage, hide],
  );

  return (
    <div className="flex flex-col gap-y-2 py-2">
      {historyTabItems.map(({ id, onClick }) => (
        <SecondaryButton
          // h-10 to align height of buttons between tabs
          className="h-10 justify-start capitalize"
          onClick={onClick}
          key={id}
          size="lg"
        >
          {id}
        </SecondaryButton>
      ))}
    </div>
  );
}
