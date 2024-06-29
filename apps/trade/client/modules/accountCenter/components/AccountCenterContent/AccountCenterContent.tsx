import { useUserStateError } from 'client/hooks/subaccount/useUserStateError';
import { AccountCenterCollateralHistory } from 'client/modules/accountCenter/components/AccountCenterContent/AccountCenterCollateralHistory';
import { AccountCenterHeader } from 'client/modules/accountCenter/components/AccountCenterContent/AccountCenterHeader/AccountCenterHeader';
import { AccountCenterPortfolioCard } from 'client/modules/accountCenter/components/AccountCenterContent/AccountCenterPortfolioCard';
import { AccountCenterUserCTA } from 'client/modules/accountCenter/components/AccountCenterContent/AccountCenterUserCTA';

interface Props {
  onShowSettingsClick: () => void;
}

export function AccountCenterContent({ onShowSettingsClick }: Props) {
  const userStateError = useUserStateError();

  return (
    <div className="flex flex-col gap-y-5">
      <AccountCenterHeader
        userStateError={userStateError}
        onShowSettingsClick={onShowSettingsClick}
      />
      <AccountCenterUserCTA userStateError={userStateError} />
      <AccountCenterPortfolioCard />
      <AccountCenterCollateralHistory />
    </div>
  );
}
