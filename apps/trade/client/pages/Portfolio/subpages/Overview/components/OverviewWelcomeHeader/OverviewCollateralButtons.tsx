import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DepositOptionsPopover } from './DepositOptionsPopover';
import { useIsEnabledForChainIds } from 'client/modules/chainSpecificContent/hooks/useIsEnabledForChainIds';
import { ARB_CHAIN_IDS } from 'client/modules/chainSpecificContent/consts/chainIds';

export function OverviewCollateralButtons({ className }: WithClassnames) {
  const { show } = useDialog();
  const userActionState = useUserActionState();
  const showDepositsOptionsPopover = useIsEnabledForChainIds(ARB_CHAIN_IDS);

  return (
    <div className={joinClassNames('flex items-center gap-x-2.5', className)}>
      {showDepositsOptionsPopover ? (
        <DepositOptionsPopover
          userActionState={userActionState}
          triggerClassName="flex-1"
          onShowDialog={show}
        />
      ) : (
        <SecondaryButton
          size="lg"
          className="flex-1"
          disabled={userActionState === 'block_all'}
          onClick={() => show({ type: 'deposit', params: {} })}
        >
          Deposit
        </SecondaryButton>
      )}
      <SecondaryButton
        size="lg"
        className="flex-1"
        disabled={userActionState !== 'allow_all'}
        onClick={() => show({ type: 'withdraw', params: {} })}
      >
        Withdraw
      </SecondaryButton>
    </div>
  );
}
