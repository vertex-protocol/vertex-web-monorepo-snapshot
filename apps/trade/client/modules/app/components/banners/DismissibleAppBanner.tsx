'use client';

import {
  AppBanner,
  AppBannerProps,
} from 'client/modules/app/components/banners/AppBanner/AppBanner';
import { BannerDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';

interface Props extends AppBannerProps {
  disclosureKey: BannerDisclosureKey;
}

export function DismissibleAppBanner({
  className,
  children,
  disclosureKey,
  ...rest
}: Props) {
  const { shouldShow, dismiss } = useShowUserDisclosure(disclosureKey);

  if (!shouldShow) {
    return null;
  }

  return (
    <AppBanner onDismiss={dismiss} className={className} {...rest}>
      {children}
    </AppBanner>
  );
}
