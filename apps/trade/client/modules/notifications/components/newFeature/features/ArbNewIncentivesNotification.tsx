import { ToastProps } from 'client/components/Toast/types';
import { NewFeatureDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import { NewFeatureNotification } from 'client/modules/notifications/components/newFeature/NewFeatureNotification';
import { ROUTES } from 'client/modules/app/consts/routes';
import { Toast } from 'client/components/Toast/Toast';

interface Props extends ToastProps {
  disclosureKey: NewFeatureDisclosureKey;
}

export function ArbNewIncentivesNotification({
  disclosureKey,
  onDismiss,
  ...rest
}: Props) {
  const { dismiss: dismissNewFeatureNotification } =
    useShowUserDisclosure(disclosureKey);

  const onDismissClick = () => {
    onDismiss();
    dismissNewFeatureNotification();
  };

  const content = (
    <div className="flex flex-col gap-y-3">
      <p>A new round of ARB incentives has started.</p>
      <Toast.FooterLink href={ROUTES.rewards} onClick={onDismissClick}>
        Go to Rewards Page
      </Toast.FooterLink>
    </div>
  );

  return (
    <NewFeatureNotification
      title="ARB Incentives"
      content={content}
      onDismiss={onDismissClick}
      {...rest}
    />
  );
}
