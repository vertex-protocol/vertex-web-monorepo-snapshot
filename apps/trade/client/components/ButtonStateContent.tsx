import { Icons } from '@vertex-protocol/web-ui';
import { useIsSingleSignatureSession } from 'client/modules/singleSignatureSessions/hooks/useIsSingleSignatureSession';

function SuccessButtonContent({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-x-1">
      <Icons.Check />
      <span>{message}</span>
    </div>
  );
}

function LoadingButtonContent({
  singleSignatureMessage,
}: {
  singleSignatureMessage: string;
}) {
  const isSingleSignatureSession = useIsSingleSignatureSession({
    requireActive: true,
  });

  return (
    <>
      {isSingleSignatureSession
        ? singleSignatureMessage
        : 'Confirm Transaction'}
    </>
  );
}

export const ButtonStateContent = {
  Success: SuccessButtonContent,
  Loading: LoadingButtonContent,
};
