import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ClaimStakingRewardsDialog } from 'client/modules/rewards/dialogs/staking/ClaimStakingRewardsDialog/ClaimStakingRewardsDialog';
import { ClaimTradingRewardsDialog } from 'client/modules/rewards/dialogs/staking/ClaimTradingRewardsDialog/ClaimTradingRewardsDialog';
import { StakeVrtxDialog } from 'client/modules/rewards/dialogs/staking/StakeVrtxDialog/StakeVrtxDialog';
import { UnstakeVrtxDialog } from 'client/modules/rewards/dialogs/staking/UnstakeVrtxDialog/UnstakeVrtxDialog';
import { WithdrawLbaLiquidityDialog } from 'client/modules/rewards/dialogs/WithdrawLbaLiquidityDialog/WithdrawLbaLiquidityDialog';
import { MigrateStakingDialog } from 'client/modules/staking/dialogs/MigrateStakingDialog/MigrateStakingDialog';
import { StakeV2VrtxDialog } from 'client/modules/staking/dialogs/StakeV2VrtxDialog/StakeV2VrtxDialog';
import { UnstakeV1VrtxDialog } from 'client/modules/staking/dialogs/UnstakeV1VrtxDialog/UnstakeV1VrtxDialog';
import { UnstakeV2VrtxDialog } from 'client/modules/staking/dialogs/UnstakeV2VrtxDialog/UnstakeV2VrtxDialog';

export function VrtxTokenDialogs() {
  const { currentDialog } = useDialog();

  return (
    <>
      {currentDialog?.type === 'withdraw_lba_liquidity' && (
        <WithdrawLbaLiquidityDialog />
      )}
      {currentDialog?.type === 'stake_vrtx' && <StakeVrtxDialog />}
      {currentDialog?.type === 'unstake_vrtx' && <UnstakeVrtxDialog />}
      {currentDialog?.type === 'migrate_vrtx' && <MigrateStakingDialog />}
      {currentDialog?.type === 'stake_v2_vrtx' && <StakeV2VrtxDialog />}
      {currentDialog?.type === 'unstake_v1_vrtx' && <UnstakeV1VrtxDialog />}
      {currentDialog?.type === 'unstake_v2_vrtx' && <UnstakeV2VrtxDialog />}
      {currentDialog?.type === 'claim_vrtx_staking_rewards' && (
        <ClaimStakingRewardsDialog />
      )}
      {currentDialog?.type === 'claim_vrtx_trading_rewards' && (
        <ClaimTradingRewardsDialog {...currentDialog.params} />
      )}
    </>
  );
}
