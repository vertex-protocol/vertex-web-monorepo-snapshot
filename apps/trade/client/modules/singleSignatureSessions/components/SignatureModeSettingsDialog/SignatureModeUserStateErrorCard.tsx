import { Icons } from '@vertex-protocol/web-ui';
import { ErrorPanel } from 'client/components/ErrorPanel';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { SignatureModeSettingsUserStateError } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/useSignatureModeSettingsDialog';

export function SignatureModeUserStateErrorCard({
  userStateError,
}: {
  userStateError?: SignatureModeSettingsUserStateError;
}) {
  const { show } = useDialog();
  if (!userStateError) return null;

  const warningContentData = {
    below_minimum_value: {
      title: 'You must deposit funds first',
      description: (
        <div>
          To activate One-Click Trading, you must first deposit a min of{' '}
          <span className="text-text-primary">$5.00</span> into your Vertex
          account.
        </div>
      ),
    },
    out_of_switches: {
      title: 'You have used all of your changes',
      description: `You have enabled One-Click Trading 5 times in the past week, which is the max. Please come back next week to enable it.`,
    },
  }[userStateError];

  return (
    <ErrorPanel className="flex flex-col gap-y-2">
      <div className="flex items-center gap-x-1.5">
        <Icons.BsExclamationTriangle size={14} />
        {warningContentData.title}
      </div>
      <div className="flex flex-col items-start gap-y-3 whitespace-normal text-left text-xs">
        {warningContentData.description}
        {userStateError === 'below_minimum_value' && (
          <span
            className="text-text-primary hover:text-text-secondary cursor-pointer underline"
            onClick={() => show({ type: 'deposit', params: {} })}
          >
            Deposit
          </span>
        )}
      </div>
    </ErrorPanel>
  );
}
