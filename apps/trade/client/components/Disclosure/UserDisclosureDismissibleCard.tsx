import { UserDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import {
  DisclosureCardProps,
  DisclosureDismissibleCard,
} from '@vertex-protocol/web-ui';

interface Props extends DisclosureCardProps {
  disclosureKey: UserDisclosureKey;
}

export function UserDisclosureDismissibleCard({
  disclosureKey,
  title,
  description,
  className,
}: Props) {
  const { shouldShow, dismiss } = useShowUserDisclosure(disclosureKey);

  if (!shouldShow) return null;

  return (
    <DisclosureDismissibleCard
      className={className}
      title={title}
      description={description}
      onDismiss={dismiss}
    />
  );
}
