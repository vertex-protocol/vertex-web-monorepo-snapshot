import { LinkButton } from '@vertex-protocol/web-ui';
import { ErrorPanel } from 'client/components/ErrorPanel';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { SignatureModeSettingsUserStateError } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeEnable1CTDialogContent/useSignatureModeEnable1CTDialogContent';

export function SignatureModeUserStateErrorCard({
  userStateError,
}: {
  userStateError?: SignatureModeSettingsUserStateError;
}) {
  const { push } = useDialog();
  if (!userStateError) return null;

  const errorDescription = {
    below_minimum_value: (
      <>
        <p>
          To activate One-Click Trading, you must first deposit a minimum of{' '}
          <span className="text-text-primary">$5.00</span> into your account.
        </p>
        <LinkButton
          colorVariant="primary"
          onClick={() => push({ type: 'deposit', params: {} })}
        >
          Deposit Now
        </LinkButton>
      </>
    ),
    out_of_switches: `You have already enabled 1-Click Trading 5 times in the past week, which is the maximum number allowed. Please come back next week to enable 1CT.`,
  }[userStateError];

  return <ErrorPanel>{errorDescription}</ErrorPanel>;
}
