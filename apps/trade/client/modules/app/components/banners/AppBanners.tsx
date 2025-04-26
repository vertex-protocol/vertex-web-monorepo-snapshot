'use client';

import { useUserStateError } from 'client/hooks/subaccount/useUserStateError';
import { AvaxLaunchAppBanner } from 'client/modules/app/components/banners/AvaxLaunchAppBanner/AvaxLaunchAppBanner';
import { DepositAppBanner } from 'client/modules/app/components/banners/DepositAppBanner';

export function AppBanners() {
  const userStateError = useUserStateError();

  const commonAppBannerClassnames = 'border-stroke border-b';

  // Show the deposit banner if the user needs to make an initial deposit.
  if (userStateError === 'requires_initial_deposit') {
    return <DepositAppBanner className={commonAppBannerClassnames} />;
  }

  return <AvaxLaunchAppBanner className={commonAppBannerClassnames} />;
}
