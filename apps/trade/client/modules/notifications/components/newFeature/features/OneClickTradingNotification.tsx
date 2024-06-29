import { ToastProps } from 'client/components/Toast/types';
import { NewFeatureDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import { NewFeatureNotification } from 'client/modules/notifications/components/newFeature/NewFeatureNotification';
import { LinkButton } from 'client/components/LinkButton';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

interface Props extends ToastProps {
  disclosureKey: NewFeatureDisclosureKey;
}

export function OneClickTradingNotification({
  disclosureKey,
  onDismiss,
  ...rest
}: Props) {
  const { show } = useDialog();
  const { dismiss: dismissNewFeatureNotification } =
    useShowUserDisclosure(disclosureKey);

  const onDismissClick = () => {
    onDismiss();
    dismissNewFeatureNotification();
  };

  const content = (
    <div className="flex flex-col gap-y-3">
      <p>
        Enable One-Click Trading for a seamless trading experience. Sign just
        one transaction for your entire trading session.
      </p>
      <LinkButton
        colorVariant="primary"
        onClick={() => {
          show({ type: 'signature_mode_settings', params: {} });
          onDismissClick();
        }}
        className="text-text-primary w-fit"
      >
        Enable 1CT
      </LinkButton>
    </div>
  );

  return (
    <NewFeatureNotification
      title="Enable One-Click Trading"
      content={content}
      onDismiss={onDismissClick}
      {...rest}
    />
  );
}
