import { useEVMContext } from '@vertex-protocol/web-data';
import { ProfileAvatarIcon } from 'client/modules/userProfile/components/ProfileAvatarIcon';
import { useSavedUserProfile } from 'client/modules/userProfile/hooks/useSavedUserProfile';
import { PortfolioHeader } from 'client/pages/Portfolio/components/PortfolioHeader';
import { EditProfileAvatarIcon } from 'client/pages/Portfolio/subpages/Overview/components/OverviewWelcomeHeader/EditProfileAvatarIcon';
import { OverviewCollateralButtons } from './OverviewCollateralButtons';

import { useIsEnabledForBrand } from 'client/modules/brand/hooks/useIsEnabledForBrand';

export function OverviewWelcomeHeader() {
  const {
    connectionStatus: { address },
  } = useEVMContext();
  const showEditProfileAvatarIcon = useIsEnabledForBrand(['vertex']);

  const { savedUsername, savedAvatar } = useSavedUserProfile();
  const username = !!savedUsername ? savedUsername : 'Welcome Back!';

  const welcomeMessageContent = address ? (
    <>
      <div className="flex items-center gap-x-3">
        {showEditProfileAvatarIcon ? (
          <EditProfileAvatarIcon avatar={savedAvatar} size={40} />
        ) : (
          <ProfileAvatarIcon avatar={savedAvatar} size={40} />
        )}
        <div className="flex items-center gap-x-1.5">
          <PortfolioHeader className="text-base sm:text-xl">
            {username}
          </PortfolioHeader>
        </div>
      </div>
      <OverviewCollateralButtons className="w-full sm:w-64" />
    </>
  ) : (
    <PortfolioHeader>Welcome</PortfolioHeader>
  );

  return (
    <div className="flex flex-col gap-y-5 sm:flex-row sm:items-end sm:justify-between">
      {welcomeMessageContent}
    </div>
  );
}
