import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ClaimTradingRewardsDialog } from 'client/modules/rewards/dialogs/ClaimTradingRewardsDialog/ClaimTradingRewardsDialog';
import { WithdrawLbaLiquidityDialog } from 'client/modules/rewards/dialogs/WithdrawLbaLiquidityDialog/WithdrawLbaLiquidityDialog';
import { MigrateStakingDialog } from 'client/modules/staking/dialogs/MigrateStakingDialog/MigrateStakingDialog';
import { StakeV2VrtxDialog } from 'client/modules/staking/dialogs/StakeV2VrtxDialog/StakeV2VrtxDialog';
import { StakingSetTradingWalletDialog } from 'client/modules/staking/dialogs/StakingSetTradingWalletDialog/StakingSetTradingWalletDialog';
import { UnstakeV1VrtxDialog } from 'client/modules/staking/dialogs/UnstakeV1VrtxDialog/UnstakeV1VrtxDialog';
import { UnstakeV2VrtxDialog } from 'client/modules/staking/dialogs/UnstakeV2VrtxDialog/UnstakeV2VrtxDialog';

export function VrtxTokenDialogs() {
  const { currentDialog } = useDialog();

  return (
    <>
      {currentDialog?.type === 'withdraw_lba_liquidity' && (
        <WithdrawLbaLiquidityDialog />
      )}
      {currentDialog?.type === 'migrate_vrtx' && <MigrateStakingDialog />}
      {currentDialog?.type === 'stake_v2_vrtx' && <StakeV2VrtxDialog />}
      {currentDialog?.type === 'unstake_v1_vrtx' && <UnstakeV1VrtxDialog />}
      {currentDialog?.type === 'unstake_v2_vrtx' && <UnstakeV2VrtxDialog />}
      {currentDialog?.type === 'claim_vrtx_trading_rewards' && (
        <ClaimTradingRewardsDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'staking_set_trading_wallet' && (
        <StakingSetTradingWalletDialog />
      )}
    </>
  );
}
