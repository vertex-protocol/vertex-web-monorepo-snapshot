import { SecondaryButton } from '@vertex-protocol/web-ui';
import { CheckmarkIcon } from 'client/components/CheckmarkIcon';

export function TutorialFlowSuccessContent({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-y-2 rounded-lg py-4">
      <CheckmarkIcon size={90} />
      <div className="flex flex-col gap-y-5 px-4">
        <div className="flex flex-col gap-y-1 text-center">
          <p className="text-text-primary text-xl">You&apos;re all set up.</p>
          <p className="text-text-tertiary text-sm leading-6">
            Enjoy the seamless trading experience.
          </p>
        </div>
        <SecondaryButton size="lg" onClick={onClose}>
          Close
        </SecondaryButton>
      </div>
    </div>
  );
}
