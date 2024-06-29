import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ClaimStakingRewardsDialog } from 'client/modules/rewards/dialogs/staking/ClaimStakingRewardsDialog/ClaimStakingRewardsDialog';
import { ClaimTradingRewardsDialog } from 'client/modules/rewards/dialogs/staking/ClaimTradingRewardsDialog/ClaimTradingRewardsDialog';
import { StakeVrtxDialog } from 'client/modules/rewards/dialogs/staking/StakeVrtxDialog/StakeVrtxDialog';
import { UnstakeVrtxDialog } from 'client/modules/rewards/dialogs/staking/UnstakeVrtxDialog/UnstakeVrtxDialog';
import { WithdrawLbaLiquidityDialog } from 'client/modules/rewards/dialogs/WithdrawLbaLiquidityDialog/WithdrawLbaLiquidityDialog';

export function VrtxTokenDialogs() {
  const { currentDialog } = useDialog();

  return (
    <>
      {currentDialog?.type === 'withdraw_lba_liquidity' && (
        <WithdrawLbaLiquidityDialog />
      )}
      {currentDialog?.type === 'stake_vrtx' && <StakeVrtxDialog />}
      {currentDialog?.type === 'unstake_vrtx' && <UnstakeVrtxDialog />}
      {currentDialog?.type === 'claim_vrtx_staking_rewards' && (
        <ClaimStakingRewardsDialog />
      )}
      {currentDialog?.type === 'claim_vrtx_trading_rewards' && (
        <ClaimTradingRewardsDialog {...currentDialog.params} />
      )}
    </>
  );
}
