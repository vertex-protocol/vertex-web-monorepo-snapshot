import { SignatureModeSlowModeEntrypoint } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeEntrypoint';

export function SignatureModeInfo({
  isSmartContractWalletConnected,
}: {
  isSmartContractWalletConnected: boolean | undefined;
}) {
  return (
    <div className="text-text-tertiary flex flex-col gap-y-2">
      <p>
        Enjoy a seamless trading experience with 1-Click Trading. Sign 1
        approval transaction at the start of your session and you won&apos;t
        need to sign again.
      </p>
      <SignatureModeSlowModeEntrypoint
        isSmartContractWalletConnected={isSmartContractWalletConnected}
      />
    </div>
  );
}
