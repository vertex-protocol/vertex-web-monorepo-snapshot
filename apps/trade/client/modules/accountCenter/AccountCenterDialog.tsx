import { useUserStateError } from 'client/hooks/subaccount/useUserStateError';
import { AccountCenterCollateralHistory } from 'client/modules/accountCenter/components/AccountCenterCollateralHistory';
import { AccountCenterHeader } from 'client/modules/accountCenter/components/AccountCenterHeader/AccountCenterHeader';
import { AccountCenterPortfolioCard } from 'client/modules/accountCenter/components/AccountCenterPortfolioCard';
import { AccountCenterUserCTA } from 'client/modules/accountCenter/components/AccountCenterUserCTA';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function AccountCenterDialog() {
  const { hide } = useDialog();
  const userStateError = useUserStateError();

  return (
    <BaseAppDialog.Container onClose={hide}>
      {/* Necessary for a11y. */}
      <BaseAppDialog.Title className="sr-only">
        Account Center
      </BaseAppDialog.Title>
      {/*Specific px/py required to override padding specifiers in BaseAppDialog.Body*/}
      {/*Fixed height to prevent layout changes when more history items appear*/}
      <BaseAppDialog.Body className="h-[700px] px-4 py-4">
        <div className="flex flex-col gap-y-5">
          <AccountCenterHeader userStateError={userStateError} />
          <AccountCenterUserCTA />
          <AccountCenterPortfolioCard />
          <AccountCenterCollateralHistory />
        </div>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
